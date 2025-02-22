import React from 'react';
import {connect} from 'react-redux';
import DialogListContainer
  from '../../DialogComponents/DialogListContainer/DialogListContainer';
import styles from './Chat.module.sass';
import Dialog from '../../DialogComponents/Dialog/Dialog';
import classNames from 'classnames';
import {
  changeChatShow,
  setChatPreviewMode,
  changeShowModeCatalog,
  getChatPreview,
} from '../../../../actions/chatsActionCreators';
import {chatController} from '../../../../api/ws/socketController';
import CONSTANTS from '../../../../constants';
import CatalogListContainer
  from '../../CatalogComponents/CatalogListContainer/CatalogListContainer';
import CatalogCreation
  from '../../CatalogComponents/CatalogCreation/CatalogCreation';
import CatalogListHeader
  from '../../CatalogComponents/CatalogListHeader/CatalogListHeader';
import ChatError from '../../../ChatError/ChatError';

class Chat extends React.Component {
  componentDidMount() {
    chatController.subscribeChat(this.props.user.id);
    this.props.getPreviewChat();
  }

  componentWillUnmount() {
    chatController.unsubscribeChat(this.props.user.id);
  }

  renderDialogList = () => {
    const {setChatPreviewMode} = this.props;
    const {chatMode, isShowChatsInCatalog} = this.props.chatStore;
    const {id} = this.props.user;
    const {
      NORMAL_PREVIEW_CHAT_MODE,
      FAVORITE_PREVIEW_CHAT_MODE,
      BLOCKED_PREVIEW_CHAT_MODE,
      CATALOG_PREVIEW_CHAT_MODE,
    } = CONSTANTS;
    return (
        <div>
          {isShowChatsInCatalog && <CatalogListHeader/>}
          {!isShowChatsInCatalog && (
              <div className={styles.chatHeader}>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`}
                     alt="logo"/>
              </div>
          )}
          {!isShowChatsInCatalog && (
              <div className={styles.buttonsContainer}>
            <span
                onClick={() => setChatPreviewMode(NORMAL_PREVIEW_CHAT_MODE)}
                className={classNames(styles.button, {
                  [styles.activeButton]: chatMode === NORMAL_PREVIEW_CHAT_MODE,
                })}
            >
              Normal
            </span>
                <span
                    onClick={() => setChatPreviewMode(
                        FAVORITE_PREVIEW_CHAT_MODE)}
                    className={classNames(styles.button, {
                      [styles.activeButton]: chatMode ===
                      FAVORITE_PREVIEW_CHAT_MODE,
                    })}
                >
              Favorite
            </span>
                <span
                    onClick={() => setChatPreviewMode(
                        BLOCKED_PREVIEW_CHAT_MODE)}
                    className={classNames(styles.button, {
                      [styles.activeButton]: chatMode ===
                      BLOCKED_PREVIEW_CHAT_MODE,
                    })}
                >
              Blocked
            </span>
                <span
                    onClick={() => setChatPreviewMode(
                        CATALOG_PREVIEW_CHAT_MODE)}
                    className={classNames(styles.button, {
                      [styles.activeButton]: chatMode ===
                      CATALOG_PREVIEW_CHAT_MODE,
                    })}
                >
              Catalog
            </span>
              </div>
          )}
          {chatMode === CATALOG_PREVIEW_CHAT_MODE ? (
              <CatalogListContainer/>
          ) : (
              <DialogListContainer userId={id}/>
          )}
        </div>
    );
  };

  render() {
    const {
      isExpanded,
      isShow,
      isShowCatalogCreation,
      error,
    } = this.props.chatStore;
    const {id} = this.props.user;
    const {changeShow, getPreviewChat} = this.props;
    return (
        <div
            className={classNames(styles.chatContainer, {
              [styles.showChat]: isShow,
            })}
        >
          {error && <ChatError getData={getPreviewChat}/>}
          {isShowCatalogCreation && <CatalogCreation/>}
          {isExpanded ? <Dialog userId={id}/> : this.renderDialogList()}
          <div className={styles.toggleChat}
               onClick={() => changeShow()}>
            {isShow ? 'Hide Chat' : 'Show Chat'}
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    chatStore,
    auth: {user},
  } = state;
  return {chatStore, user};
};

const mapDispatchToProps = dispatch => {
  return {
    changeShow: () => dispatch(changeChatShow()),
    setChatPreviewMode: mode => dispatch(setChatPreviewMode(mode)),
    changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
    getPreviewChat: () => dispatch(getChatPreview()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
