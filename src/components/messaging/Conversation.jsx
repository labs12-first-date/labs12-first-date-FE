import React, { useState, useEffect } from 'react';
import { firebase, auth } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';

const Conversation = () => {
  const messages = firebase
    .firestore()
    .collection('chatrooms')
    .doc(props.chatRoom);
};

export default Conversation;
