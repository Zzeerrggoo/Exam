import React from 'react';
import styles from './PasswordVerification.module.scss';
import {passwordVerification} from '../../actions/authActionCreators';
import {useDispatch, useSelector} from 'react-redux';
import PasswordVerificationForm
  from '../../components/forms/PasswordVerificationForm';
import {authSelector} from '../../selectors';
import Spinner from '../../components/Spinner/Spinner';

const PasswordVerification = () => {

  const dispatch = useDispatch();
  const {isFetching, restoreActionSuccess, error} = useSelector(authSelector);

  const handleSubmit = (values) => {
    dispatch(passwordVerification(values));
  };

  const errorMessage = error?.response?.status === 403
      ? error?.response?.data?.errors[0].message : null;

  return (
      <div className={styles.bodyContainer}>
        <h1 className={styles.header}>Verification</h1>

        <div className={styles.infoContainer}>
          {errorMessage &&
          <p className={styles.error}>{errorMessage}</p>}

          {!errorMessage && isFetching ? <Spinner/> :
              !restoreActionSuccess ?
                  <PasswordVerificationForm handleSubmit={handleSubmit}/> :
                  <p>Your password was successfully changed !</p>}
        </div>
      </div>
  );
};

export default PasswordVerification;