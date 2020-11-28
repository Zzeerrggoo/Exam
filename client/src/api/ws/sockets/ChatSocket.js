import WebSocket from './WebSocket';
import CONTANTS from '../../../constants';
import {
  addMessage,
  changeBlockStatusInStore,
} from '../../../actions/actionCreator';
import {isEqual} from 'lodash';

class ChatSocket extends WebSocket {
  constructor(dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onNewMessage();
    this.onChangeBlockStatus();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CONTANTS.CHANGE_BLOCK_STATUS, data => {
      const {message} = data;
      const {messagesPreview} = this.getState().chatStore;
      messagesPreview.forEach(preview => {
        if (isEqual(preview.participants, message.participants))
          preview.blackList = message.blackList;
      });
      this.dispatch(
          changeBlockStatusInStore({chatData: message, messagesPreview}),
      );
    });
  };

  onNewMessage = () => {
    this.socket.on('newMessage', data => {
      const {message, interlocutor, chatData} = data.message;
      const {messagesPreview} = this.getState().chatStore;
      const preview = {...chatData, interlocutor, text: message.body};

      let isNew = true;
      messagesPreview.forEach(preview => {
        if (preview.chatId === message.chatId) {
          preview.text = message.body;
          preview.sender = message.userId;
          preview.createAt = message.createdAt;
          isNew = false;
        }
      });
      if (isNew) {
        messagesPreview.push(preview);
      }

      this.dispatch(addMessage({message, chatData, messagesPreview}));
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
