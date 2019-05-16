import { firebase } from '../firebase';
import appConfig from '../appConfig';
import { toast } from 'react-toastify';

const db = firebase.firestore();

// TODO functions for un-like, un-skip, and un-match

const resetSwipeLimitAfter = async (userId, intervalHours = 24) => {
  const userProfileRef = db.collection('profiles').doc(userId);
  const userProfileSnapshot = await userProfileRef.get();
  const userProfile = userProfileSnapshot.data();
  const lastSwipeTimestamp = userProfile.last_swipe_timestamp;
  const intervalMilliseconds = 60000 * 60 * intervalHours;
  const resetIntervalHasElapsed =
    new Date() - lastSwipeTimestamp > intervalMilliseconds;
  const swipesRemaining = userProfile.swipes_remaining;
  // if user has purchased additional swipes, don't reset to default
  const resetSwipesCount =
    swipesRemaining > 20
      ? swipesRemaining
      : appConfig.profileDefaults.swipes_remaining;
  if (resetIntervalHasElapsed) {
    userProfileRef.update({
      swipes_remaining: resetSwipesCount
    });
  }
};

const recordSwipe = async (userId, swipedUserId, isLike, matchCallback) => {
  const userProfileRef = db.collection('profiles').doc(userId);
  const userProfileSnapshot = await userProfileRef.get();
  const userProfile = userProfileSnapshot.data();
  const remainingSwipes = userProfile.swipes_remaining || 0;
  const decrementedSwipes = remainingSwipes < 1 ? 0 : remainingSwipes - 1;

  const skip = () => {
    const userSkips = userProfile.skipped_users || [];
    if (!userSkips.includes(swipedUserId)) {
      userProfileRef.update({
        last_swipe_timestamp: Date.now(),
        swipes_remaining: decrementedSwipes,
        skipped_users: [...userSkips, swipedUserId]
      });
    }
  };

  const like = () => {
    const userLikes = userProfile.liked_users || [];
    if (!userLikes.includes(swipedUserId)) {
      userProfileRef.update({
        last_swipe_timestamp: Date.now(),
        swipes_remaining: decrementedSwipes,
        liked_users: [...userLikes, swipedUserId]
      });
    }
  };

  if (!isLike) {
    skip();
  } else {
    like();
    // is it a match?
    const swipedUserProfileRef = db.collection('profiles').doc(swipedUserId);
    const swipedUserProfileSnapshot = await swipedUserProfileRef.get();
    const swipedUserProfile = swipedUserProfileSnapshot.data();
    const swipedUserLikes = swipedUserProfile.liked_users || [];
    if (swipedUserLikes.includes(userId)) {
      // brown chicken, brown cow, it's a match!
      matchCallback(swipedUserProfile);
      // create a chat for users to share
      const chatRoomRef = db.collection('chatrooms').doc();
      // update user profile
      const userMatches = userProfile.matches || [];
      userProfileRef.update({
        matches: [
          ...userMatches,
          {
            match_id: swipedUserId,
            chat_id: chatRoomRef.id,
            match_name: swipedUserProfile.first_name,
            match_picture: swipedUserProfile.profile_picture
          }
        ]
      });
      // update match's profile
      const swipedUserMatches = swipedUserProfile.matches || [];
      swipedUserProfileRef.update({
        matches: [
          ...swipedUserMatches,
          {
            match_id: userId,
            chat_id: chatRoomRef.id,
            match_name: userProfile.first_name,
            match_picture: userProfile.profile_picture
          }
        ]
      });
      // TODO indicate to user that match was recorded
      console.log(`It's a MATCH! users:`, userId, swipedUserId);
    }
  }
};

export { recordSwipe, resetSwipeLimitAfter };
