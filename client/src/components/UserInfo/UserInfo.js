import React from 'react';
import UpdateUserInfoForm
  from '../../components/forms/UpdateUserInfoForm';

/*Import it from custom class later !!!*/
import * as UserActionCreators from '../../actions/actionCreator';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector} from '../../selectors';
import CONSTANTS from '../../constants';
import styles from './UserInfo.module.sass';

const UserInfo = () => {

  const dispatch = useDispatch();
  const {
    changeEditModeOnUserProfile,
    updateUserData,
  } = bindActionCreators(UserActionCreators, dispatch);

  const {isEdit} = useSelector(state => state.userProfile);
  const user = useSelector(userSelector);

  const {
    avatar,
    firstName,
    lastName,
    displayName,
    email,
    role,
    balance,
  } = user;

  const initialValues = {
    firstName,
    lastName,
    displayName,
    avatar,
  };

  return (
      <div className={styles.mainContainer}>
        {isEdit ? (
            <UpdateUserInfoForm onSubmit={updateUserData}
                                initialValues={initialValues}/>
        ) : (
            <div className={styles.infoContainer}>
              <img
                  src={
                    avatar === 'anon.png'
                        ? CONSTANTS.ANONYM_IMAGE_PATH
                        : `${CONSTANTS.publicURL}${avatar}`
                  }
                  className={styles.avatar}
                  alt="user"
              />
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
                {role === CONSTANTS.CREATOR && (
                    <div className={styles.infoBlock}>
                      <span className={styles.label}>Balance</span>
                      <span className={styles.info}>{`${balance}$`}</span>
                    </div>
                )}
              </div>
            </div>
        )}
        <div
            onClick={() => changeEditModeOnUserProfile(!isEdit)}
            className={styles.buttonEdit}
        >
          {isEdit ? 'Cancel' : 'Edit'}
        </div>
      </div>
  );
};

export default UserInfo;
