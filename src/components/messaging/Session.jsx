import React, { useState, useEffect } from 'react';
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

  // get chat room data from profile
  // selfId and matchId
  // profile pics for both
  // first name for both

  useEffect(() => {
    const listenForMessages = () => {
      return (
        firebase
          .firestore()
          .collection(`chatrooms/${chatId}/messages`)
          // .doc(chatId)
          .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setMessages(data);
          })
      );
    };
    const unsubscribe = listenForMessages();
    // clean up on unmount
    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  // just for logging
  useEffect(() => {
    console.log(messages);
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
