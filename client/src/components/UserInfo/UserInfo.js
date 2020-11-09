import React, {useState} from 'react';
import UpdateUserInfoForm
  from '../../components/UpdateUserInfoForm/UpdateUserInfoForm';
import {userUpdate} from '../../actions/userActionCreators';
import CONSTANTS from '../../constants';
import styles from './UserInfo.module.sass';
import {useDispatch, useSelector} from 'react-redux';
import {authUserSelector} from '../../selectors';

const UserInfo = () => {

  const user = useSelector(authUserSelector);
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const {avatar, firstName, lastName, displayName, email, role, balance, id} = user;

  const updateUserData = (values) => {
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('displayName', values.displayName);
    dispatch(userUpdate(({id, formData})));
  };

  return (
      <div className={styles.mainContainer}>
        {isEdit ? <UpdateUserInfoForm onSubmit={updateUserData}/>
            :
            <div className={styles.infoContainer}>
              <img src={avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${avatar}`}
                   className={styles.avatar}
                   alt='user'/>
              <div className={styles.infoContainer}>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>First Name</span>
                  <span className={styles.info}>{firstName}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Last Name</span>
                  <span className={styles.info}>{lastName}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Display Name</span>
                  <span className={styles.info}>{displayName}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Email</span>
                  <span className={styles.info}>{email}</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Role</span>
                  <span className={styles.info}>{role}</span>
                </div>
                {role === CONSTANTS.CREATOR &&
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Balance</span>
                  <span className={styles.info}>{`${balance}$`}</span>
                </div>}
              </div>
            </div>
        }
        <div onClick={() => setIsEdit(!isEdit)}
             className={styles.buttonEdit}>{isEdit ? 'Cancel' : 'Edit'}</div>
      </div>
  );
};

export default UserInfo;
