import React, { useState, useEffect, useContext } from 'react';
import { firebase } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const SessionsList = () => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState(null);

  const listenForSessions = () => {
    return firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid)
      .onSnapshot(doc => {
        const matches = doc.data().matches || null;
        setSessions(matches);
      });
  };

  // CMD
  useEffect(() => {
    const unsubscribe = listenForSessions();
    // clean up on unmount
    return unsubscribe;
  }, []);

  // just for logging
  // useEffect(() => {
  //   console.dir(sessions);
  // }, [sessions]);

  return sessions ? (
    <div>
      <h2>Chats</h2>
      <ul>
        {sessions.map(({ chat_id, match_name }) => (
          <li key={chat_id}>
            Chat with <Link to={`/chats/${chat_id}`}>{match_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default SessionsList;
