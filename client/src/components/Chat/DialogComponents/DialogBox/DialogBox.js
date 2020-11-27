import React from 'react';
import styles from './DialogBox.module.sass';
import CONSTANTS from '../../../../constants';
import classNames from 'classnames';

const DialogBox = (props) => {

  const {
    chatPreview,
    getTimeStr,
    changeFavorite,
    changeBlackList,
    catalogOperation,
    goToExpandedDialog,
    chatMode,
  } = props;
  const {
    isBlocked,
    isFavorite,
    isInBlackList,
    chatId,
    text,
    createdAt,
  } = chatPreview;

  const interlocutor = chatPreview.Interlocutor.User;

  return (
      <div
          className={styles.previewChatBox}
          onClick={() =>
              goToExpandedDialog({
                interlocutor,
                conversationData: {
                  chatId,
                  isBlocked,
                  isFavorite,
                  isInBlackList,
                },
              })
          }
      >
        <img
            src={
              interlocutor.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${interlocutor.avatar}`
            }
            alt="user"
        />
        <div className={styles.infoContainer}>
          <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>
            {interlocutor.firstName}
          </span>
            <span className={styles.interlocutorMessage}>{text}</span>
          </div>
          <div className={styles.buttonsContainer}>
            <span className={styles.time}>{getTimeStr(createdAt)}</span>
            <i
                onClick={(event) =>
                    changeFavorite(
                        {
                          favoriteFlag: !isFavorite,
                        },
                        event,
                    )
                }
                className={classNames({
                  'far fa-heart': !isFavorite,
                  'fas fa-heart': isFavorite,
                })}
            />
            <i
                onClick={(event) =>
                    changeBlackList(
                        {
                          blackListFlag: !isBlocked,
                        },
                        event,
                    )
                }
                className={classNames({
                  'fas fa-user-lock': !isBlocked,
                  'fas fa-unlock': isBlocked,
                })}
            />
            <i
                onClick={(event) => catalogOperation(event, chatId)}
                className={classNames({
                  'far fa-plus-square':
                      chatMode !== CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
                  'fas fa-minus-circle':
                      chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
                })}
            />
          </div>
        </div>
      </div>
  );
};

export default DialogBox;
