import React from 'react';
import styles from './PasswordVerification.module.scss';
import {passwordVerification} from '../../actions/authActionCreators';
import {useDispatch, useSelector} from 'react-redux';
import PasswordVerificationForm
  from '../../components/forms/PasswordVerificationForm';
import {authSelector} from '../../selectors';
import Spinner from '../../components/Spinner/Spinner';
import CONSTANTS from '../../constants';
import {Link} from 'react-router-dom';

const PasswordVerification = () => {

  const dispatch = useDispatch();
  const {isFetching, restoreActionSuccess, error} = useSelector(authSelector);

  const handleSubmit = (values) => {
    dispatch(passwordVerification(values));
  };

  return (
      <div className={styles.bodyContainer}>
        <div className={styles.verifyContainer}>
          <div className={styles.headerSignUpPage}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`}
                 alt="logo"/>
            <div className={styles.linkLoginContainer}>
              <Link to="/login"
                    style={{textDecoration: 'none'}}>
                <span>Login</span>
              </Link>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <h1 className={styles.header}>Verification</h1>
            {error &&
            <p className={styles.error}>Invalid token</p>}
            {!error && isFetching ? <Spinner/> :
                !restoreActionSuccess ?
                    <PasswordVerificationForm handleSubmit={handleSubmit}/> :
                    <p>Your password was successfully changed !</p>}
          </div>
        </div>
      </div>
  );
};

export default PasswordVerification;