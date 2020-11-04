import React from 'react';
import classNames from 'classnames';
import {useField} from 'formik';

const FormInput = (props) => {

  const [field, meta] = useField(props);
  const {touched, error} = meta;

  const {classes} = props;

  return (
      <div className={classes.container}>
        <input

            {...field}

            className={classNames(classes.input, {
              [classes.notValid]: touched && error,
            })}
        />
        {classes.warning && touched && error && (
            <span className={classes.warning}>{error}</span>
        )}
      </div>
  );
};

export default FormInput;
