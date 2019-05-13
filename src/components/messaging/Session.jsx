import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { firebase, auth } from '../../firebase';
import Message from './Message';
import MessageInput from './MessageInput';
import Navigation from '../Navigation';

const db = firebase.firestore();

const getSnapshotDataWithId = doc => ({ ...doc.data(), id: doc.id });

const StyledContainer = styled.div`
  margin: 1rem auto;
  /* font-size: 1.1rem; */
  max-width: 60rem;
  color: #eee;
  @media (min-width: 30rem) {
    font-size: 1.1rem;
  }
  @media (min-width: 60rem) {
    font-size: 1.25rem;
  }
  & > div {
    background: #1c242f;
    margin: 0 1rem;
    border-radius: 1.5rem;
    padding: 2rem 1.5rem;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  h2 {
    font-size: 1em;
    margin: 0 0 1.5rem;
    text-align: center;
  }
  .message-stream {
    max-height: calc(100vh - 20rem);
    overflow-y: auto;
    overflow-x: hidden;
  }
  .welcome-message {
    img {
      display: inline-block;
      margin-bottom: 1rem;
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      border-radius: 50%;
    }
    text-align: center;
    padding: 5rem 0;
  }
`;

const Session = ({ match }) => {
  const { chatId } = match.params;
  const messagesCollectionPath = `chatrooms/${chatId}/messages`;
  const user = auth.getCurrentUser();
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState(null);
  const initialView = useRef(true);
  const messageStreamContainer = useRef(null);
  const shouldScroll = useRef(false);

  // CDM
  useEffect(() => {
    const getProfile = async userId => {
      const snapshot = await db
        .collection('profiles')
        .doc(userId)
        .get();
      return snapshot.data();
    };

    const getSessionData = async () => {
      const ownProfile = await getProfile(user.uid);
      const matchId = ownProfile.matches.find(m => m.chat_id === chatId)
        .match_id;
      const matchProfile = await getProfile(matchId);
      setParticipants({
        ownProfile: { ...ownProfile, uid: user.uid },
        matchProfile: { ...matchProfile, uid: matchId }
      });
    };

    if (user) {
      getSessionData();
    }
  }, [user, chatId]);

  // useEffect(() => {
  //   console.log(participants);
  // }, [participants]);

  // live-stream new messages
  useEffect(() => {
    const listenForMessages = () => {
      return db
        .collection(messagesCollectionPath)
        .orderBy('timestamp', 'asc')
        .limit(100)
        .onSnapshot(querySnapshot => {
          const messagesArray = querySnapshot.docs.map(getSnapshotDataWithId);
          setMessages(messagesArray);
        });
    };
    const unsubscribe = listenForMessages();
    // clean up on unmount
    return unsubscribe;
  }, [messagesCollectionPath]);

  // useEffect(() => {
  //   console.log(user.uid);
  // }, [user]);

  // fancy stuff to keep the chat window scrolled to the bottom
  useEffect(() => {
    const container = messageStreamContainer.current;
    let firstView = initialView.current;

    if (container && participants) {
      shouldScroll.current =
        container.scrollTop + container.clientHeight === container.scrollHeight;
      if (firstView) {
        container.scrollTop = container.scrollHeight;
        firstView = false;
      } else if (shouldScroll) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages, participants]);

  const sendMessage = msg => {
    db.collection(messagesCollectionPath).add({
      msg,
      sender_id: user.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  return participants ? (
        <>
      <Navigation />
    <StyledContainer>
      <div>
        <h2>Chat with {participants.matchProfile.first_name}</h2>
        {messages.length ? (
          <div className="message-stream" ref={messageStreamContainer}>
            {messages.map(msg => {
              const { ownProfile, matchProfile } = participants;
              const ownUserId = user.uid;
              const ownMessage = msg.sender_id === ownUserId;
              const sender = ownMessage ? ownProfile : matchProfile;
              return (
                <Message
                  key={msg.id}
                  messageData={msg}
                  senderProfile={sender}
                  ownMessage={ownMessage}
                />
              );
            })}
          </div>
        ) : (
          <div className="welcome-message">
            <img
              src={participants.matchProfile.profile_picture}
              alt={participants.matchProfile.first_name}
            />
            <div>
              Strike up a conversation with {participants.matchProfile.first_name}. <br /> Don't be
              shy!
            </div>
          </div>
        )}
        <MessageInput send={sendMessage} />
      </div>
    </StyledContainer>
      </>
  ) : (
    <StyledContainer>Loading...</StyledContainer>
  );
};

export default Session;
