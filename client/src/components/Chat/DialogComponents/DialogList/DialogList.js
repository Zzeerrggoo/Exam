import React from 'react';
import {connect} from 'react-redux';
import CONSTANTS from '../../../../constants';
import {
  goToExpandedDialog,
  setChatFavorite,
  setChatBlocked,
  changeShowAddChatToCatalog,
} from '../../../../actions/chatsActionCreators';
import moment from 'moment';
import DialogBox from '../DialogBox/DialogBox';
import styles from './DialogList.module.sass';

const DialogList = (props) => {
  const changeFavorite = (data, event) => {
    props.changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    props.changeChatBlock(data);
    event.stopPropagation();
  };

  const changeShowCatalogCreation = (event, chatId) => {
    props.changeShowAddChatToCatalogMenu(chatId);
    event.stopPropagation();
  };

  const onlyFavoriteDialogs = (chatPreview) => {
    return chatPreview.isFavorite;
  };

  const onlyBlockDialogs = (chatPreview) => {
    return chatPreview.isInBlackList;
  };

  const getTimeStr = (time) => {
    const currentTime = moment();
    if (currentTime.isSame(time, 'day')) return moment(time).format('HH:mm');
    else if (currentTime.isSame(time, 'week'))
      return moment(time).format('dddd');
    else if (currentTime.isSame(time, 'year'))
      return moment(time).format('MM DD');
    else return moment(time).format('MMMM DD, YYYY');
  };

  const renderPreview = (filterFunc) => {
    const arrayList = [];
    const {
      userId,
      preview,
      goToExpandedDialog,
      chatMode,
      removeChat,
    } = props;
    preview.forEach((chatPreview, index) => {
      const dialogNode = (
          <DialogBox
              chatPreview={chatPreview}
              userId={userId}
              key={index}
              getTimeStr={getTimeStr}
              changeFavorite={changeFavorite}
              changeBlackList={changeBlackList}
              chatMode={chatMode}
              catalogOperation={
                chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE
                    ? removeChat
                    : changeShowCatalogCreation
              }
              goToExpandedDialog={goToExpandedDialog}
          />
      );
      if (filterFunc && filterFunc(chatPreview, userId)) {
        arrayList.push(dialogNode);
      } else if (!filterFunc) {
        arrayList.push(dialogNode);
      }
    });
    return arrayList.length ? (
        arrayList
    ) : (
        <span className={styles.notFound}>Not found</span>
    );
  };

  const renderChatPreview = () => {
    const {chatMode} = props;
    if (chatMode === CONSTANTS.FAVORITE_PREVIEW_CHAT_MODE)
      return renderPreview(onlyFavoriteDialogs);
    else if (chatMode === CONSTANTS.BLOCKED_PREVIEW_CHAT_MODE)
      return renderPreview(onlyBlockDialogs);
    else return renderPreview();
  };

  return <div className={styles.previewContainer}>{renderChatPreview()}</div>;
};

const mapStateToProps = (state) => {
  return state.chatStore;
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
    changeChatFavorite: (data) => dispatch(setChatFavorite(data)),
    changeChatBlock: (data) => dispatch(setChatBlocked(data)),
    changeShowAddChatToCatalogMenu: (data) =>
        dispatch(changeShowAddChatToCatalog(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogList);
