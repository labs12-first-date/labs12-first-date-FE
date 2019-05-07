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
  .content {
    background: ${props => (props.ownMessage ? '#273342' : '#4f5f6f')};
    padding: 0.8rem 1rem;
    border-radius: ${props => (props.ownMessage ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0;')};
    display: inline-block;
    text-align: left;
  }
`;

const Message = ({ message, selfId }) => {
  const { timestamp } = message;

  const relativeTime = timestamp
    ? moment(timestamp.toDate()).fromNow()
    : moment(Date.now()).fromNow();

  const ownMessage = message.sender_id === selfId;
  return (
    <MessageStyles ownMessage={ownMessage}>
      <div className="content-container">
        <div className="sender">UID {message.sender_id}</div>
        <div className="content">{message.msg}</div>
        <div className="time">{relativeTime}</div>
      </div>
    </MessageStyles>
  );
};

export default Message;
