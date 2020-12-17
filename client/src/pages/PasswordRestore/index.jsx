import React from 'react';
import styles from './style.module.scss';
import {restorePassword} from '../../actions/authActionCreators';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '../../selectors';
import Spinner from '../../components/Spinner/Spinner';
import PasswordRestoreForm from '../../components/forms/PasswordRestoreForm';
import HeaderLinksStrip from '../../components/HeaderLinksStrip';

const PasswordRestore = () => {

  const dispatch = useDispatch();
  const {isFetching, restoreActionSuccess, error} = useSelector(authSelector);

  const handleSubmit = (values) => {
    dispatch(restorePassword(values));
  };

  const errorMessage = error?.response?.status === 403
      ? error?.response?.data?.errors[0].message : null;

  return (
      <div className={styles.bodyContainer}>
        <div className={styles.loginContainer}>
          <HeaderLinksStrip links={['Login']}/>
          <div className={styles.infoContainer}>
            <h1 className={styles.header}>Restoration</h1>
            {errorMessage &&
            <p className={styles.error}>{errorMessage}</p>}
            {!errorMessage && isFetching ? <Spinner/> :
                !restoreActionSuccess ?
                    <PasswordRestoreForm handleSubmit={handleSubmit}/>
                    : <p>Check your email</p>
            }
          </div>
        </div>
      </div>
  );
};

export default PasswordRestore;