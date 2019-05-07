import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firebase } from '../../firebase';

const StyledDiv = styled.div`
  color: #eee;
`;

const Session = ({ match }) => {
  const { chatId } = match.params;
  const [messages, setMessages] = useState([]);

  //  CDM
  useEffect(() => {
    const listenForMessages = () => {
      return firebase
        .firestore()
        .collection('chatrooms')
        .doc(chatId)
        .onSnapshot(doc => {
          const data = doc.data().chat || [];
          setMessages(data);
        });
    };
    const unsubscribe = listenForMessages();
    // clean up on unmount
    return unsubscribe;
  }, [chatId]);

  // just for logging
  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  return messages.length ? (
    <StyledDiv>
      <ul>
        {messages.map(m => {
          return (
            <div key={`${m.sender}${m.timestamp.toDate()}`}>
              <p>{m.sender}</p>
              <p>{m.msg}</p>
              <p>{`${m.timestamp.toDate()}`}</p>
            </div>
          );
        })}
      </ul>
    </StyledDiv>
  ) : (
    <div>This is the beginning of your chat...</div>
  );
};

export default Session;
