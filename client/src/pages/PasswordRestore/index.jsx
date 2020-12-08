import React from 'react';
import styles from './style.module.scss';
import {restorePassword} from '../../actions/authActionCreators';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '../../selectors';
import Spinner from '../../components/Spinner/Spinner';
import PasswordRestoreForm from '../../components/forms/PasswordRestoreForm';

const PasswordRestore = () => {

  const dispatch = useDispatch();
  const {isFetching, restoreActionSuccess, error} = useSelector(authSelector);

  const handleSubmit = (values) => {
    dispatch(restorePassword(values));
  };

  return (
      <div className={styles.bodyContainer}>
        <h1 className={styles.header}>Restoration</h1>
        <div className={styles.infoContainer}>
          {error?.response?.status === 403 &&
          <p className={styles.error}>{error?.response?.data?.errors[0].message}</p>}

          {!error && isFetching ? <Spinner/> :
              !restoreActionSuccess ?
                  <PasswordRestoreForm handleSubmit={handleSubmit}/>
                  : <p>Check your email</p>
          }
        </div>
      </div>
  );
};

export default PasswordRestore;