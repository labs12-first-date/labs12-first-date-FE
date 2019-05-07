import React, { useState, useEffect } from 'react';
import { firebase } from '../../firebase';

const Session = ({ match }) => {
  const { chatId } = match.params;
  const [messages, setMessages] = useState([]);

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

  //  CDM
  useEffect(() => {
    const unsubscribe = listenForMessages();
    // clean up on unmount
    return unsubscribe;
  }, []);

  // just for logging
  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  return messages.length ? (
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
  ) : (
    <div>This is the beginning of your chat...</div>
  );
};

export default Session;
