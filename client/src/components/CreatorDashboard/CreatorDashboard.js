import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {authUserSelector, contestsSelector} from '../../selectors';
import {
  getActiveContestsData,
  getIndustryForContest,
  setNewCreatorFilter,
} from '../../actions/contestsActionCreators';
import ContestsContainer
  from '../../components/ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import TryAgain from '../../components/TryAgain/TryAgain';
import FilterContests from '../forms/FilterContests';
import styles from './CreatorDashboard.module.sass';

const CreatorDashboard = () => {

  const history = useHistory();
  const contestsList = useSelector(contestsSelector);
  const dispatch = useDispatch();

  const {id} = useSelector(authUserSelector);
  const {error, haveMore, creatorFilter, isFetching} = contestsList;

  const getContestsDashboard = (values) => {
    dispatch(getActiveContestsData({
      id,
      limit: 8,
      ...creatorFilter,
      ...values,
    }));
  };

  const loadMore = (startFrom) => {
    getContestsDashboard({offset: startFrom});
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

  const goToExtended = contestId => {
    history.push('/contest/' + contestId);
  };

  const tryLoadAgain = () => {
    getContestsDashboard();
  };

  const setNewFilter = (values) => {
    dispatch(setNewCreatorFilter(values));
  };

  useEffect(() => {
    getContestsDashboard();
  }, [creatorFilter]);

  useEffect(() => {
    dispatch(getIndustryForContest());
  }, []);

  return (
      <div className={styles.mainContainer}>

        <FilterContests onSubmit={setNewFilter}
                        isIndustryLoading={contestsList.isIndustryLoading}
                        industry={contestsList.industryTypes}/>

        {error ? (
            <div className={styles.messageContainer}>
              <TryAgain getData={tryLoadAgain}/>
            </div>
        ) : (
            <ContestsContainer
                isFetching={isFetching}
                loadMore={loadMore}
                history={history}
                haveMore={haveMore}
            >
              {setContestList()}
            </ContestsContainer>
        )}
      </div>
  );
};

export default CreatorDashboard;
