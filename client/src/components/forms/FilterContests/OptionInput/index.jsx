import React from 'react';
import {useField} from 'formik';
import styles from '../../../CreatorDashboard/CreatorDashboard.module.sass';

const OptionInput = ({label, options, ...props}) => {
  const [field] = useField(props);

  const optionCreator = (item, index) => {
    if (typeof item === 'object') {
      const [[objKey, objValue]] = Object.entries(item);
      return <option key={index}
                     value={objKey}>{objValue}</option>;
    }
    return <option key={index}
                   value={item}>{item}</option>;
  };

  return (
      <div className={styles.inputContainer}>
        <label htmlFor={field.name}
               className={styles.inputLabel}>
          {label}
        </label>
        <select {...field} {...props} className={styles.input}>
          {options.map(optionCreator)}
        </select>

      </div>
  );
};

export default OptionInput;
