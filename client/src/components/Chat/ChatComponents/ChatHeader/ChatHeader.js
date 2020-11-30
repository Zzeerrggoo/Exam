import React from 'react';
import {connect} from 'react-redux';
import {
  backToDialogList,
  changeChatFavorite,
  changeChatBlock,
} from '../../../../actions/actionCreator';
import styles from './ChatHeader.module.sass';
import CONSTANTS from '../../../../constants';
import classNames from 'classnames';

const ChatHeader = (props) => {
  const changeFavorite = (data, event) => {
    props.changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    props.changeChatBlock(data);
    event.stopPropagation();
  };

  const {avatar, firstName} = props.interlocutor;
  const {backToDialogList, chatData} = props;

  return (
      <div className={styles.chatHeader}>
        <div
            className={styles.buttonContainer}
            onClick={() => backToDialogList()}
        >
          <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}arrow-left-thick.png`}
              alt="back"
          />
        </div>
        <div className={styles.infoContainer}>
          <div>
            <img
                src={
                  avatar === 'anon.png'
                      ? CONSTANTS.ANONYM_IMAGE_PATH
                      : `${CONSTANTS.publicURL}${avatar}`
                }
                alt="user"
            />
            <span>{firstName}</span>
          </div>
          {chatData && (
              <div>
                <i
                    onClick={(event) =>
                        changeFavorite(
                            {
                              favoriteFlag: !chatData?.isFavorite,
                              chatId: chatData.chatId,
                            },
                            event,
                        )
                    }
                    className={classNames({
                      'far fa-heart': !chatData?.isFavorite,
                      'fas fa-heart': chatData?.isFavorite,
                    })}
                />
                <i
                    onClick={(event) =>
                        changeBlackList(
                            {
                              blackListFlag: !chatData?.isInBlackList,
                              chatId: chatData.chatId,
                              interlocutorId: props.interlocutor.id,
                            },
                            event,
                        )
                    }
                    className={classNames({
                      'fas fa-user-lock': !chatData?.isInBlackList,
                      'fas fa-unlock': chatData?.isInBlackList,
                    })}
                />
              </div>
          )}
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  const {interlocutor, chatData} = state.chatStore;
  return {interlocutor, chatData};
};

const mapDispatchToProps = (dispatch) => {
  return {
    backToDialogList: () => dispatch(backToDialogList()),
    changeChatFavorite: (data) => dispatch(changeChatFavorite(data)),
    changeChatBlock: (data) => dispatch(changeChatBlock(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
