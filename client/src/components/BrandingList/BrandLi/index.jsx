import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as date from 'date-fns';
import {useContext} from 'react';
import {CurrentTime} from '../../GeneralCounter';
import classNames from 'classnames';
import styles from './BrandLi.module.scss';
import {removeNotification} from '../../../actions/brandingEventsActionCreators';

const BrandLi = props => {

  const {currentTime, expiredTimers, tickingTimers} = useContext(CurrentTime);
  const {start, end, description, isExpired} = props;
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);

  const fullTime = date.differenceInMilliseconds(new Date(end),
      new Date(start));
  const value = isExpired ? fullTime : date.differenceInMilliseconds(
      currentTime,
      new Date(start));
  const timeLeft = isExpired ? '' : date.formatDistanceStrict(fullTime, value);

  const handleDelete = () => {
    setIsDelete(true);
    const searchArray = isExpired ? expiredTimers : tickingTimers;
    const index = searchArray.findIndex(item => item.start === start);
    if (index !== -1) {
      searchArray.splice(index, 1);
      isExpired && dispatch(removeNotification());
    }
    window.localStorage.setItem('counters',
        JSON.stringify({expiredTimers, tickingTimers}));
  };

  const progressId = `${description}${start}`;
  const progressClassName = classNames(styles.brandingProgress,
      {[styles.brandingProgressFinished]: isExpired});

  const liClassName = classNames(styles.container,
      {[styles.deletingLi]: isDelete});

  return (
      <li className={liClassName}>
        <label htmlFor={progressId}
               className={styles.brandingLabel}
               title={description}>{description}</label>
        <progress id={progressId}
                  max={fullTime}
                  value={value}
                  className={progressClassName}/>
        <span className={styles.expiringTime}>{timeLeft}</span>

        <button className={styles.deleteButton}
                onClick={handleDelete}>
          <svg
              viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </button>
      </li>
  );

};

export default BrandLi;