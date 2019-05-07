import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { firebase, auth } from '../../firebase';
import Message from './Message';

const StyledDiv = styled.div`
  color: #eee;
`;

const Session = ({ match }) => {
  const { chatId } = match.params;
  const { uid: userId } = auth.getCurrentUser();
  const [messages, setMessages] = useState([]);
  const initialView = useRef(true);
  const messageStreamContainer = useRef(null);
  const shouldScroll = useRef(false);

  // get chat room data from profile
  // selfId and matchId
  // profile pics for both
  // first name for both

  useEffect(() => {
    const listenForMessages = () => {
      return db
        .collection(messagesCollectionPath)
        .orderBy('timestamp', 'asc')
          .onSnapshot(querySnapshot => {
          const messagesArray = querySnapshot.docs.map(getSnapshotData);
          setMessages(messagesArray);
        });
    };
    const unsubscribe = listenForMessages();
    // clean up on unmount
    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    console.log(userId);
  }, [userId]);

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

  return messages.length ? (
    <StyledDiv>
      <ul>
        {messages.map(m => {
          return <Message key={m.id} message={m} seflId={userId} />;
        })}
      </ul>
    </StyledDiv>
  ) : (
    <div>This is the beginning of your chat...</div>
  );
};

export default Session;
