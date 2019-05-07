import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { firebase, auth } from '../../firebase';
import Message from './Message';
import MessageInput from './MessageInput';

const db = firebase.firestore();

const getSnapshotData = doc => ({ ...doc.data(), id: doc.id });

const StyledContainer = styled.div`
  margin: 1rem auto;
  font-size: 1.25rem;
  max-width: 60rem;
  & > div {
    color: #eee;
    background: #1c242f;
    margin: 0 1rem;
    border-radius: 1.5rem;
    padding: 2rem 1.5rem;
    overflow: scroll;
  }
  h2 {
    font-size: 1em;
    margin: 0 0 1.5rem;
    text-align: center;
  }
  .message-stream {
    max-height: 40rem;
    overflow-y: auto;
  }
`;

const Session = ({ match }) => {
  const { chatId } = match.params;
  const messagesCollectionPath = `chatrooms/${chatId}/messages`;
  const user = auth.getCurrentUser();
  const [messages, setMessages] = useState([]);
  const initialView = useRef(true);
  const messageStreamContainer = useRef(null);
  const shouldScroll = useRef(false);

  // get chat room data from profile
  // selfId and matchId
  // profile pics for both
  // first name for both

  // CDM
  // useEffect(() => {}, []);

  useEffect(() => {
    const listenForMessages = () => {
      return db
        .collection(messagesCollectionPath)
        .orderBy('timestamp', 'asc')
        .limit(100)
        .onSnapshot(querySnapshot => {
          const messagesArray = querySnapshot.docs.map(getSnapshotData);
          setMessages(messagesArray);
        });
    };
    const unsubscribe = listenForMessages();
    // clean up on unmount
    return unsubscribe;
  }, [messagesCollectionPath]);

  useEffect(() => {
    console.log(user.uid);
  }, [user]);

  // fancy stuff to keep the chat window scrolled to the bottom
  useEffect(() => {
    const container = messageStreamContainer.current;
    let firstView = initialView.current;

    if (container) {
      shouldScroll.current =
        container.scrollTop + container.clientHeight === container.scrollHeight;
      if (firstView) {
        container.scrollTop = container.scrollHeight;
        firstView = false;
      } else if (shouldScroll) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages]);

  const sendMessage = msg => {
    db.collection(messagesCollectionPath).add({
      msg,
      sender_id: user.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  const okToRender = messages.length && user;

  return okToRender ? (
    <StyledContainer>
      <div>
        <h2>Chat with ...</h2>
        <div className="message-stream" ref={messageStreamContainer}>
          {messages.map(m => {
            return <Message key={m.id} message={m} selfId={user.uid} />;
          })}
        </div>
        <MessageInput send={sendMessage} />
      </div>
    </StyledContainer>
  ) : (
    <div>Don't be shy! Start a conversation with ...</div>
  );
};

export default Session;
