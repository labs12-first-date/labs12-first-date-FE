import React, { useState, useEffect, useContext } from 'react';
import { firebase } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const SessionsList = () => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState(null);

  const fetchSessions = async () => {
    const snapshot = await firebase
      .firestore()
      .collection('profiles')
      .doc(user.uid)
      .get();
    const matches = snapshot.data().matches || null;
    setSessions(matches);
  };

  // CDM
  useEffect(() => {
    // wait until Firebase loads our user
    if (user) {
      fetchSessions();
    }
  }, [user]);

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
