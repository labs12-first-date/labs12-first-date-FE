import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const MessageStyles = styled.div`
  margin-bottom: 1.5rem;
  text-align: ${props => (props.ownMessage ? 'right' : 'left')};
  .content-container {
    position: relative;
    right: 0;
    /* position: absolute; */
    max-width: 70%;
    margin: 0 0 auto 0;
    margin: ${props => (props.ownMessage ? '0 0 0 auto' : '0 auto 0 0')};
  }
  .sender,
  .time {
    font-size: 0.8em;
    color: #4f5f6f;
  }
  .sender {
    margin-bottom: 0.25rem;
  }
  .time {
    margin-top: 0.25rem;
  }
  .content {
    background: ${props => (props.ownMessage ? '#273342' : '#4f5f6f')};
    padding: 0.8rem 1rem;
    border-radius: ${props =>
      props.ownMessage ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0;'};
    display: inline-block;
    text-align: left;
  }
  .sender-photo {
    img {
      margin: ${props => (props.ownMessage ? '0 0 0 auto' : '0 auto 0 0')};
      display: block;
      width: 4rem;
      height: 4rem;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;

const Message = ({ messageData, senderProfile, ownMessage }) => {
  const { timestamp } = messageData;

  const relativeTime = timestamp
    ? moment(timestamp.toDate()).fromNow()
    : moment(Date.now()).fromNow();

  return (
    <MessageStyles ownMessage={ownMessage}>
      <div className='content-container'>
        <div className='sender-photo'>
          <img
            src={senderProfile.profile_picture}
            alt={senderProfile.first_name}
          />
        </div>
        <div className='sender'>{senderProfile.first_name}</div>
        <div className='content'>{messageData.msg}</div>
        <div className='time'>{relativeTime}</div>
      </div>
    </MessageStyles>
  );
};

export default Message;
