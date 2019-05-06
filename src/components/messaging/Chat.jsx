import React, { useState, useEffect } from 'react';
import { firebase, auth } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import Conversation from './Conversation';

const Chat = () => {
  const [joined, setJoined] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState({});
  const { user } = useContext(AuthContext);

  const chatId = firebase
    .firestore()
    .collection('profiles')
    .doc(user.uid)
    .get()
    .then(function(doc) {
      const matches = doc.data().matches || null;
      if (matches) {
        matches.map(m => {
          console.log(m.chat_id);
        });
      } else {
        console.log('no matches');
      }
    });

  const chatRoom = firebase
    .firestore()
    .collection('chatrooms')
    .doc(chatId);

  return <Conversation chatRoom={chatRoom} />;
};

export default Chat;
