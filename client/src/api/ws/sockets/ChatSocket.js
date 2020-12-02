import WebSocket from './WebSocket';
import CONTANTS from '../../../constants';
import {
  postMessage,
  setChatBlocked,
} from '../../../actions/chatsActionCreators';

class ChatSocket extends WebSocket {

  anotherSubscribes = () => {
    this.onNewMessage();
    this.onChangeBlockStatus();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CONTANTS.CHANGE_BLOCK_STATUS, data => {
      const {message} = data;
      const {messagesPreview} = this.getState().chatStore;
      messagesPreview.forEach(preview => {
        if (preview.chatId === message.chatId) {
          preview.isBlocked = message.isBlocked;
          preview.isInBlackList = message.isInBlackList;
        }
      });
      this.dispatch(
          setChatBlocked({chatData: message, messagesPreview}),
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

      let isNew = true;
      messagesPreview.forEach(preview => {
        if (preview.chatId === message.chatId) {
          preview.message.body = message.body;
          preview.message.sender = message.userId;
          preview.message.createAt = message.createdAt;
          isNew = false;
        }
      });
      if (isNew) {
        messagesPreview.push(preview);
      }
      this.dispatch(postMessage({message, chatData, messagesPreview}));
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
