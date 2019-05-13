import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { firebase } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';

const db = firebase.firestore();

const SessionsListStyles = styled.div`
  color: #eee;
  max-width: 44rem;
  margin: 0 auto;
  padding: 2rem;
  font-size: 1.5em;
`;

const SessionStyles = styled(Link)`
  display: flex;
  background: #1c242f;
  margin-bottom: 1.5rem;
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  align-items: center;
  color: inherit;
  .name {
    font-size: 1.25em;
    margin-left: 1.5rem;
  }
  img {
    display: block;
    height: 4rem;
    width: 4rem;
    object-fit: cover;
    border-radius: 50%;
  }
  &:hover {
    text-decoration: none;
    background: #273342;
    color: inherit;
  }
`;

const Session = ({ chat_id, match_name, match_picture }) => {
  console.log(match_picture);
  return (
    <SessionStyles to={`/chats/${chat_id}`}>
      <div className="photo">
        <img src={match_picture} alt="{match_name}" />
      </div>
      <div className="name">{match_name}</div>
    </SessionStyles>
  );
};

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
              <Navigation />
          <h2>Chats</h2>
          {sessions.map(({ chat_id, match_name, match_picture }) => (
            <Session
              key={chat_id}
              chat_id={chat_id}
              match_name={match_name}
              match_picture={match_picture}
            />
          ))}
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
