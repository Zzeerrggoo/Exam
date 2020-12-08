import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import TokenTextarea from './TokenTextarea';
import styles from './PasswordVerificationForm.module.scss';

const initialValues = {
  token: '',
};

const PasswordVerificationForm = (props) => {

  const {handleSubmit} = props;

  return <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}>
    {formik =>
        (<Form className={styles.formContainer}
               autoComplete="off">
              <h3>Please, enter the token below into the form field</h3>
              <TokenTextarea/>
              <Field name="token"
                     placeholder='Enter token here'
                     className={styles.field}/>
              <ErrorMessage name='token'/>
              <button type='submit'
                      className={styles.formBtn}
                      disabled={!formik.dirty}>SUBMIT
              </button>
            </Form>
        )}

  </Formik>;
};

export default PasswordVerificationForm;