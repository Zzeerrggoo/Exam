import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styles from './ContestCreationPage.module.sass';
import {
  saveContestToStore,
} from '../../actions/actionCreator';
import NextButton from '../../components/NextButton/NextButton';
import ContestForm from '../../components/forms/ContestForm/ContestForm';
import BackButton from '../../components/BackButton/BackButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const ContestCreationPage = (props) => {

  const history = useHistory();
  const {contestType, title, singleContestStore} = props;
  const {bundle} = singleContestStore;

  const submitDataContest = (values) => {
    props.saveContest({type: contestType, info: values});
    history.push(
        bundle[contestType] === 'payment'
            ? '/payment'
            : bundle[contestType] + 'Contest',
    );
  };

  !bundle && history.replace('/startContest');
  const contestData = props.contestStore.contests[contestType]
      ? props.contestStore.contests[contestType]
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

const mapStateToProps = (state) => {
  const {contestStore, singleContestStore} = state;
  return {contestStore, singleContestStore};
};

const mapDispatchToProps = (dispatch) => ({
  saveContest: (data) => dispatch(saveContestToStore(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContestCreationPage);
