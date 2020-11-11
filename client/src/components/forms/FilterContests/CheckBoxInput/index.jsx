import React from 'react';
import {useField} from 'formik';
import styles from '../../../CreatorDashboard/CreatorDashboard.module.sass';
import classNames from 'classnames';

const CheckBoxInput = ({label, options, ...props}) => {
  const [field] = useField(props);

  return (
      <div className={styles.inputContainer}>
        <div
            className={classNames(styles.myEntries, {
              [styles.activeMyEntries]: field.value,
            })}>
          <label style={{display: 'block'}}>
            {label}
            <input {...field} {...props} type="checkbox"
                   style={{display: 'none'}}/>
          </label>
        </div>
      </div>
  );
};

export default CheckBoxInput;
