import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { firebase } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const db = firebase.firestore();

const SessionsListStyles = styled.div`
  color: #eee;
  max-width: 44rem;
  margin: 0 auto;
  padding: 2rem;
  font-size: 1.5em;
`;

const SessionsList = () => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState(null);
  const [loading, setLoading] = useState(false);

  // CMD
  useEffect(() => {
    const listenForSessions = () => {
      setLoading(true);
      return db
        .collection('profiles')
        .doc(user.uid)
        .onSnapshot(doc => {
          const matches = doc.data().matches || null;
          setSessions(matches);
          setLoading(false);
        });
    };
    const unsubscribe = listenForSessions();
    console.log(user.uid);
    // clean up on unmount
    return unsubscribe;
  }, [user.uid]);

  // just for logging
  useEffect(() => {
    console.dir(sessions);
  }, [sessions]);
  useEffect(() => {
    console.dir(loading);
  }, [loading]);

  if (loading) return <SessionsListStyles>Loading...</SessionsListStyles>;

  return (
    <SessionsListStyles>
      {sessions ? (
        <>
          <h2>Chats</h2>
          <ul>
            {sessions.map(({ chat_id, match_name }) => (
              <li key={chat_id}>
                Chat with <Link to={`/chats/${chat_id}`}>{match_name}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2>Chats</h2>
          <p>
            You have no matches yet! <Link to="/thunderdome">Get swiping</Link> to make a
            connection.
          </p>
        </>
      )}
    </SessionsListStyles>
  );
};

export default SessionsList;
