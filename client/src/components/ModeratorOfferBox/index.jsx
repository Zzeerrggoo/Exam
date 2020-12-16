import React, {useCallback, useState} from 'react';
import classNames from 'classnames';
import styles from '../OfferBox/OfferBox.module.sass';
import CONSTANTS from '../../constants';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../OfferBox/confirmStyle.css';
import LightBox from 'react-image-lightbox';

const ModeratorOfferBox = props => {

  const {offer} = props;
  const {Contest: {contestType, title}, isAllowed, fileName} = offer;
  const {avatar, firstName, lastName, email, id: userId} = props.offer.User;
  const isOfferAllowed = useCallback((isAllowed) => {
    return () => {
      confirmAlert({
        title: 'Confirm',
        message: 'Are you sure?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              props.setOfferStatus(
                  {offerId: offer.id, contestName: title, userId, isAllowed});
            },
          },
          {
            label: 'No',
          },
        ],
      });
    };
  }, [props.setOfferStatus]);
  const offerStatus = () => {
    //Because it can be null
    if (isAllowed === false) {
      return (
          <i
              className={classNames('fas fa-times-circle reject',
                  styles.reject)}
          />
      );
    } else if (isAllowed) {
      return (
          <i
              className={classNames('fas fa-check-circle resolve',
                  styles.resolve)}
          />
      );
    }
    return null;
  };

  const [showOnFull, setShowOnFull] = useState(false);

  return (
      <>
        {showOnFull && (
            <LightBox
                mainSrc={`${CONSTANTS.publicURL}${fileName}`}
                onCloseRequest={() => setShowOnFull(false)
                }
            />
        )}

        <div className={styles.offerContainer}>
          {offerStatus()}
          <div className={styles.mainInfoContainer}>
            <div className={styles.userInfo}>
              <div className={styles.creativeInfoContainer}>
                <img
                    src={
                      avatar === 'anon.png'
                          ? CONSTANTS.ANONYM_IMAGE_PATH
                          : `${CONSTANTS.publicURL}${avatar}`
                    }
                    alt="user"
                />
                <div className={styles.nameAndEmail}>
                  <span>{firstName + ' ' + lastName}</span>
                  <span>{email}</span>
                </div>
              </div>
              <div className={styles.creativeRating}>
                <span className={styles.userScoreLabel}>Creative Rating </span>
              </div>
            </div>
            <div className={styles.responseConainer}>
              {contestType === CONSTANTS.LOGO_CONTEST ? (
                  <img onClick={() => setShowOnFull(true)}
                       className={styles.responseLogo}
                       src={`${CONSTANTS.publicURL}${offer.fileName}`}
                       alt="logo"
                  />
              ) : (
                  <span className={styles.response}>{offer.text}</span>
              )}
            </div>
          </div>
          <div className={styles.btnsContainer}>
            <button onClick={isOfferAllowed(true)}
                    className={styles.resolveBtn}>
              Resolve
            </button>
            <button onClick={isOfferAllowed(false)}
                    className={styles.rejectBtn}>
              Reject
            </button>
          </div>
        </div>
      </>
  );
};

export default ModeratorOfferBox;
