import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { firebase } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
  color: #eee;
`;

const SessionsList = () => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState(null);

  // CMD
  useEffect(() => {
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
    const unsubscribe = listenForSessions();
    // clean up on unmount
    return unsubscribe;
  }, [user.uid]);

  // just for logging
  // useEffect(() => {
  //   console.dir(sessions);
  // }, [sessions]);

  return sessions ? (
    <StyledDiv>
      <h2>Chats</h2>
      <ul>
        {sessions.map(({ chat_id, match_name }) => (
          <li key={chat_id}>
            Chat with <Link to={`/chats/${chat_id}`}>{match_name}</Link>
          </li>
        ))}
      </ul>
    </StyledDiv>
  ) : (
    <StyledDiv>Loading...</StyledDiv>
  );
};

export default SessionsList;
