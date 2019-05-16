import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Confetti from 'react-dom-confetti';

const config = {
  angle: 90,
  spread: '90',
  startVelocity: 45,
  elementCount: 50,
  dragFriction: 0.1,
  duration: '5290',
  delay: 0,
  width: '15px',
  height: '15px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
};

const MatchNotifyStyles = styled.div`
  overflow: visible;
  text-align: center;
  .heading {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  .match {
    img {
      display: block;
      margin: 1rem auto;
      height: 4rem;
      width: 4rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

const ToastContainer = ({ matchProfile }) => {
  const [pop, setPop] = useState(false);

  useEffect(() => {
    console.log('pop run');
    const timeout = setTimeout(() => {
      setPop(true);
    }, 5);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <MatchNotifyStyles>
      <Confetti active={pop} config={config} />
      <div className="heading">It's a match!</div>
      <div className="match">
        {matchProfile.first_name}
        <img src={matchProfile.profile_picture} alt="{matchProfile.first_name}" />
      </div>
      <div className="chat">
        <Link to="/chats">Say hello now!</Link>
      </div>
    </MatchNotifyStyles>
  );
};

export default function matchNotify(matchProfile) {
  toast(({ closeToast }) => <ToastContainer matchProfile={matchProfile} />);
}
