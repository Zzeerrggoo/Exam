import React from 'react';
import {useDispatch} from 'react-redux';
import * as ContestActionCreators from '../../../actions/contestsActionCreators';
import styles from '../../CustomerDashboard/CustomerDashboard.module.sass';

const ContestsFilter = (props) => {

  const dispatch = useDispatch();
  const {status, title, currentFilter} = props;

  return (
      <div
          onClick={() =>
              dispatch(ContestActionCreators.setNewCustomerFilter(status))
          }

          className={
            status === currentFilter
                ? styles.activeFilter
                : styles.filter}
      >
        {title}
      </div>);
};

export default ContestsFilter;