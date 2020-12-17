import React from 'react';
import {Formik, Form} from 'formik';
import TokenTextarea from './TokenTextarea';
import FormField from '../FormField';
import styles from './PasswordVerificationForm.module.scss';

const initialValues = {
  token: '',
};

const PasswordVerificationForm = (props) => {
  const {handleSubmit} = props;
  return (
      <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}>

        <Form className={styles.container}
              autoComplete="off">
          <h3 className={styles.header}>Please, enter the token below into the
                                        form
                                        field</h3>
          <TokenTextarea/>
          <FormField name="token"
                     placeholder='Enter token here'/>

          <button type='submit'
                  className={styles.formBtn}>SUBMIT
          </button>
        </Form>
      </Formik>);
};

export default PasswordVerificationForm;