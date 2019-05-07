import React, { useState, useEffect } from 'react';
import { firebase } from '../../firebase';

const Session = ({ match }) => {
  const { chatId } = match.params;
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const snapshot = await firebase
      .firestore()
      .collection('chatrooms')
      .doc(chatId)
      .get();
    setMessages(snapshot.data().chat);
  };

  //  CDM
  useEffect(() => {
    getMessages();
  }, []);

  // just for logging
  useEffect(() => {
    console.log(messages);
  }, [messages]);

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
