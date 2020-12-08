import React from 'react';
import {useField} from 'formik';
import styles from './FormField.module.scss';

function FormField(props) {
  const [field, meta] = useField(props);
  const {error, touched} = meta;
  const isError = Boolean(error && touched);

  return (
      <div className={styles.container}>
        <input
            {...field}
            {...props}
            className={styles.input}
            title={props.placeholder ?? ''}
        />
        {isError && <div className={styles.errorMessage}>{error}</div>}
      </div>
  );
}

export default FormField;
