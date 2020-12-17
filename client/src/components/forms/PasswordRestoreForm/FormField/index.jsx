import React from 'react';
import {useField} from 'formik';
import classNames from 'classnames';
import styles from './FormField.module.scss';

function FormField(props) {
  const [field, meta] = useField(props);
  const {error, touched} = meta;
  const isError = Boolean(error && touched);
  const inputClassName = classNames(styles.input, {[styles.inputError]: isError});

  return (
      <div className={styles.container}>
        <input
            {...field}
            {...props}
            className={inputClassName}
            title={props.placeholder ?? ''}
        />
        {isError && <div className={styles.errorMessage}>{error}</div>}
      </div>
  );
}

export default FormField;
