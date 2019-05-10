import { firebase } from './firebase';

const db = firebase.firestore();

// TODO functions for un-like, un-skip, and un-match

const recordSwipe = async (userId, swipedUserId, isLike) => {
  const userProfileRef = db.collection('profiles').doc(userId);
  const userProfileSnapshot = await userProfileRef.get();
  const userProfile = userProfileSnapshot.data();

  const skip = () => {
    const userSkips = userProfile.skipped_users || [];
    if (!userSkips.includes(swipedUserId)) {
      userProfileRef.update({
        skipped_users: [...userSkips, swipedUserId]
      });
    }
  };

  const like = () => {
    const userLikes = userProfile.liked_users || [];
    if (!userLikes.includes(swipedUserId)) {
      userProfileRef.update({
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
            match_name: swipedUserProfile.first_name
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
            match_name: userProfile.first_name
          }
        ]
      });
      // TODO indicate to user that match was recorded
      console.log(`It's a MATCH! users:`, userId, swipedUserId);
    }
  }
};

export default recordSwipe;
