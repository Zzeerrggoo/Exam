import React, {useEffect} from 'react';
import {
  setOfferStatus,
  clearSetOfferStatusError,
  goToExpandedDialog,
} from '../../actions/actionCreator';
import {connect, useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import styles from './ContestPage.module.sass';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/forms/OfferForm/OfferForm';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-image-lightbox';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-image-lightbox/style.css';
import Error from '../../components/Error/Error';
import {
  authUserSelector,
  offersSelector,
  singleContestSelector,
} from '../../selectors';
import {
  getContestById,
  changeContestViewMode,
  changeShowImage,
  changeEditContest,
} from '../../actions/singleContestActionCreators';
import {getOffersForContest} from '../../actions/offerActionCreators';

const ContestPage = (props) => {

  const {id: authUserId, role} = useSelector(authUserSelector);
  const {
    isFetching,
    error,
    contestData,
    isShowOnFull,
    imagePath,
    isBrief,
  } = useSelector(singleContestSelector);
  const {offers} = useSelector(offersSelector);
  const dispatch = useDispatch();
  
  const {
    contestByIdStore,
    changeShowImage,
    changeContestViewMode,
    clearSetOfferStatusError,
  } = props;
  const {
    setOfferStatusError,
  } = contestByIdStore;

  const getData = () => {
    const {params} = props.match;
    dispatch(getContestById({contestId: params.id}));
    dispatch(getOffersForContest({contestId: params.id}));
  };

  const needButtons = (offerStatus) => {
    const contestCreatorId = contestData.User.id;
    const contestStatus = contestData.status;
    return (
        contestCreatorId === authUserId &&
        contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
        offerStatus === CONSTANTS.OFFER_STATUS_PENDING
    );
  };

  const setOffersList = () => {
    const array = [];
    for (let i = 0; i < offers.length; i++) {
      array.push(
          <OfferBox
              data={offers[i]}
              key={offers[i].id}
              needButtons={needButtons}
              setOfferStatus={setOfferStatus}
              contestType={contestData.contestType}
              date={new Date()}
          />,
      );
    }
    return array.length !== 0 ? (
        array
    ) : (
        <div className={styles.notFound}>
          There is no suggestion at this moment
        </div>
    );
  };

  const setOfferStatus = (creatorId, offerId, command) => {
    props.clearSetOfferStatusError();
    const {id, orderId, priority} = contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    props.setOfferStatus(obj);
  };

  const findConversationInfo = (interlocutorId) => {
    const {messagesPreview} = props.chatStore;
    const participants = [authUserId, interlocutorId];
    participants.sort(
        (participant1, participant2) => participant1 - participant2,
    );
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  const goChat = () => {
    const {User} = contestData;
    props.goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(User.id),
    });
  };

  useEffect(() => {
    getData();
    return () => props.changeEditContest(false);
  }, []);

  return (
      <div>
        {/*<Chat/>*/}
        {isShowOnFull && (
            <LightBox
                mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
                onCloseRequest={() =>
                    changeShowImage({isShowOnFull: false, imagePath: null})
                }
            />
        )}
        <Header/>
        {error ? (
            <div className={styles.tryContainer}>
              <TryAgain getData={getData}/>
            </div>
        ) : isFetching ? (
            <div className={styles.containerSpinner}>
              <Spinner/>
            </div>
        ) : (
            <div className={styles.mainInfoContainer}>
              <div className={styles.infoContainer}>
                <div className={styles.buttonsContainer}>
                <span
                    onClick={() => changeContestViewMode(true)}
                    className={classNames(styles.btn, {
                      [styles.activeBtn]: isBrief,
                    })}
                >
                  Brief
                </span>
                  <span
                      onClick={() => changeContestViewMode(false)}
                      className={classNames(styles.btn, {
                        [styles.activeBtn]: !isBrief,
                      })}
                  >
                  Offer
                </span>
                </div>
                {isBrief ? (
                    <Brief
                        contestData={contestData}
                        role={role}
                        goChat={goChat}
                    />
                ) : (
                    <div className={styles.offersContainer}>
                      {role === CONSTANTS.CREATOR &&
                      contestData.status ===
                      CONSTANTS.CONTEST_STATUS_ACTIVE && (
                          <OfferForm
                              contestType={contestData.contestType}
                              contestId={contestData.id}
                              customerId={contestData.User.id}
                          />
                      )}
                      {setOfferStatusError && (
                          <Error
                              data={setOfferStatusError.data}
                              status={setOfferStatusError.status}
                              clearError={clearSetOfferStatusError}
                          />
                      )}
                      <div className={styles.offers}>{setOffersList()}</div>
                    </div>
                )}
              </div>
              <ContestSideBar
                  contestData={contestData}
                  totalEntries={offers.length}
              />
            </div>
        )}
      </div>
  );
};

const mapStateToProps = (state) => {
  const {contestByIdStore, chatStore} = state;
  return {contestByIdStore, chatStore};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOfferStatus: (data) => dispatch(setOfferStatus(data)),
    clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
    goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
    changeEditContest: (data) => dispatch(changeEditContest(data)),
    changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
    changeShowImage: (data) => dispatch(changeShowImage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);

