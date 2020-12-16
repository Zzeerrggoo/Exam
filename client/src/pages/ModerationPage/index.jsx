import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';
import ModeratorOfferBox from '../../components/ModeratorOfferBox';
import SelectModeAside from '../../components/SelectModeAside';
import MaterialUiPagination from '../../components/MaterialUiPagination';
import {useDispatch, useSelector} from 'react-redux';
import {offersSelector} from '../../selectors';
import {
  getModeratingOffers,
  moderateOffer,
} from '../../actions/offerActionCreators';
import styles from '../ContestPage/ContestPage.module.sass';

const ModerationPage = (props) => {

  const dispatch = useDispatch();
  const {offers, paginationCount} = useSelector(offersSelector);
  const {isFetching} = props;
  const [filter, setFilter] = useState({});
  const limit = 10;
  const pageNumber = Math.ceil(paginationCount / limit);

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const setStatus = ({userId, offerId, isAllowed, contestName}) => {
    dispatch(moderateOffer({userId, offerId, isAllowed, contestName}));
  };

  useEffect(() => {
    dispatch(getModeratingOffers({limit, offset: 0, filter}));
  }, [filter]);

  const loadMore = (pageNumber) => {
    const offset = (pageNumber - 1) * limit;
    dispatch(getModeratingOffers({limit, offset, filter}));
  };

  const offersList = offers.map(offer =>
      <ModeratorOfferBox
          offer={offer}
          key={offer.id}
          setOfferStatus={setStatus}/>,
  );

  return (
      <>
        <Header/>
        {isFetching ? <Spinner/> : (
            <>
              <div className={styles.mainInfoContainer}>
                <SelectModeAside
                    changeFilter={changeFilter}
                    options={[
                      {text: 'All offers', filter: false},
                      {text: 'Pending', filter: true}]}/>
                <div className={styles.infoContainer}>
                  {offersList}
                  <MaterialUiPagination pagesNumber={pageNumber}
                                        onPageChange={loadMore}/>
                </div>
              </div>
            </>
        )}
      </>
  );
};

export default ModerationPage;

