import React from 'react';
import { useSelector } from 'react-redux';
import { authUserSelector } from '../../../../selectors';
import Chat from '../Chat/Chat';

const ChatContainer = () => {
  const user = useSelector(authUserSelector);
  if (user) {
    return <Chat />;
  }
  return null;
};

export default ChatContainer;
