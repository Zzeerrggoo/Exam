import React, {useEffect} from 'react';
import {authUserSelector, contestsSelector} from '../../selectors';
import {useSelector, useDispatch} from 'react-redux';
import {getContestsData} from '../../actions/contestActionCreators';
import CONSTANTS from '../../constants';
import ContestsContainer
  from '../../components/ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import TryAgain from '../../components/TryAgain/TryAgain';
import ContestsFilter from '../CreatorDashboard/ContestsFilter';
import styles from './CustomerDashboard.module.sass';

const CustomerDashboard = (props) => {

  const contestsList = useSelector(contestsSelector);
  const dispatch = useDispatch();

  const {id} = useSelector(authUserSelector);
  const {isFetching, error, haveMore, customerFilter} = contestsList;

  const getContestsDashboard = (values) => {
    dispatch(getContestsData({
      id,
      limit: 8,
      contestStatus: customerFilter,
      ...values,
    }));
  };

  const loadMore = (startFrom) => {
    getContestsDashboard({offset: startFrom});
  };

  const goToExtended = (contest_id) => {
    props.history.push('/contest/' + contest_id);
  };

  const setContestList = () => {
    const {contests} = contestsList;
    return contests.map((item) =>
        <ContestBox
            data={item}
            key={item.id}
            goToExtended={goToExtended}
        />,
    );
  };

  const tryToGetContest = () => {
    getContestsDashboard();
  };

  useEffect(() => {
    getContestsDashboard();
  }, [customerFilter]);

  return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>

          <ContestsFilter status={CONSTANTS.CONTEST_STATUS_ACTIVE}
                          title={'Active Contests'}
                          currentFilter={customerFilter}/>
          <ContestsFilter status={CONSTANTS.CONTEST_STATUS_FINISHED}
                          title={'Completed contests'}
                          currentFilter={customerFilter}/>
          <ContestsFilter status={CONSTANTS.CONTEST_STATUS_PENDING}
                          title={'Inactive contests'}
                          currentFilter={customerFilter}/>

        </div>
        <div className={styles.contestsContainer}>
          {error ? (
              <TryAgain getData={tryToGetContest()}/>
          ) : (
              <ContestsContainer
                  isFetching={isFetching}
                  loadMore={loadMore}
                  history={props.history}
                  haveMore={haveMore}
              >
                {setContestList()}
              </ContestsContainer>
          )}
        </div>
      </div>
  );
};

export default CustomerDashboard;
