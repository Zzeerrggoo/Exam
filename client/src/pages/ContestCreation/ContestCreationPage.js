import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {contestsSelector, singleContestSelector} from '../../selectors';
import styles from './ContestCreationPage.module.sass';
import {
  saveCreatingContestsInStore,
  clearCreatingContestsFromStore,
} from '../../actions/contestsActionCreators';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import NextButton from '../../components/NextButton/NextButton';
import ContestForm from '../../components/forms/ContestForm/ContestForm';
import BackButton from '../../components/BackButton/BackButton';

const ContestCreationPage = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const contests = useSelector(contestsSelector);
  const singleContest = useSelector(singleContestSelector);

  const {contestType, title} = props;
  const {bundle} = singleContest;
  const {creatingContests} = contests;

  useEffect(() => {
    dispatch(clearCreatingContestsFromStore());
  }, []);

  const submitDataContest = (values) => {
    dispatch(saveCreatingContestsInStore({type: contestType, info: values}));
    history.push(
        bundle[contestType] === 'payment'
            ? '/payment'
            : bundle[contestType] + 'Contest',
    );
  };

  !bundle && history.replace('/startContest');
  const contestData = creatingContests[contestType]
      ? creatingContests[contestType]
      : {contestType: contestType};

  return (
      <div>
        <Header/>
        <div className={styles.startContestHeader}>
          <div className={styles.startContestInfo}>
            <h2>{title}</h2>
            <span>
            Tell us a bit more about your business as well as your preferences
            so that creatives get a better idea about what you are looking for
          </span>
          </div>
          <ProgressBar currentStep={2}/>
        </div>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <ContestForm
                contestType={contestType}
                submitData={submitDataContest}
                defaultData={contestData}
            />
          </div>
        </div>
        <div className={styles.footerButtonsContainer}>
          <div className={styles.lastContainer}>
            <div className={styles.buttonsContainer}>
              <BackButton/>
              <NextButton/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
  );
};

export default ContestCreationPage;
