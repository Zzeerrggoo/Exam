import WebSocket from './WebSocket';
import CONTANTS from '../../../constants';
import {
  postMessageSuccess,
  setChatBlockedSuccess,
} from '../../../actions/chatsActionCreators';
import {produce} from 'immer';

class ChatSocket extends WebSocket {

  anotherSubscribes = () => {
    this.onNewMessage();
    this.onChangeBlockStatus();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CONTANTS.CHANGE_BLOCK_STATUS, data => {

      const {message} = data;
      const {messagesPreview} = this.getState().chatStore;

      const updatedMessagesPreview = produce(messagesPreview, draft => {
        const index = draft.findIndex(item => item.chatId === message.chatId);
        if (index !== -1) {
          draft[index].isBlocked = message.isBlocked;
          draft[index].isInBlackList = message.isInBlackList;
        }
      });

      this.dispatch(
          setChatBlockedSuccess(
              {chatData: message, messagesPreview: updatedMessagesPreview}),
      );
    });
  };

  onNewMessage = () => {
    this.socket.on('newMessage', data => {
      const {message, interlocutor, chatData} = data.message;
      const {messagesPreview} = this.getState().chatStore;
      const preview = {
        ...chatData,
        Interlocutor: {User: interlocutor},
        message,
      };

      const updatedMessagesPreview = produce(messagesPreview, draft => {
        const index = draft.findIndex(item => item.chatId === message.chatId);
        if (index !== -1) {
          draft[index].message.body = message.body;
          draft[index].message.sender = message.userId;
          draft[index].message.createAt = message.createdAt;
        } else {
          draft.push(preview);
        }
      });

      this.dispatch(postMessageSuccess(
          {message, chatData, messagesPreview: updatedMessagesPreview}));
    });
  };

  subscribeChat = id => {
    this.socket.emit('subscribeChat', id);
  };

  unsubscribeChat = id => {
    this.socket.emit('unsubscribeChat', id);
  };
}

export default ChatSocket;
