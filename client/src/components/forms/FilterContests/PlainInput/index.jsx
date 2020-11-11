import React from 'react';
import {useField} from 'formik';
import styles from '../../../CreatorDashboard/CreatorDashboard.module.sass';

const PlainInput = ({label, options, ...props}) => {
  const [field] = useField(props);

  return (
      <div className={styles.inputContainer}>
        <label htmlFor={field.name}
               className={styles.inputLabel}>
          {label}
        </label>
        <input {...field} {...props} className={styles.input}/>
      </div>
  );
};

export default PlainInput;
