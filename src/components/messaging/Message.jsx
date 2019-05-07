import React from 'react';
import moment from 'moment';

const Message = ({ message, selfId }) => {
  const relativeTime = moment(message.timestamp.toDate()).fromNow();
  return (
    <div>
      <p>{message.sender_id}</p>
      <p>{message.msg}</p>
      <p>{relativeTime}</p>
    </div>
  );
};

export default Message;
