import React from 'react';
import {Formik, Form} from 'formik';
import styles from './PasswordRestoreForm.module.scss';
import schema from '../../../validators/validationSchems';
import FormField from './FormField';

const initialValues = {
  email: '',
  newPass: '',
};

const PasswordRestoreForm = (props) => {

  const {handleSubmit} = props;

  return <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema.PasswordRestoreSchema}>
    {formik =>
        (<Form className={styles.container}>
              <h3>Please, enter the email from your Squadhelp
                  account
                  and
                  type new
                  password</h3>
              <FormField name="email"
                         placeholder='email'/>
              <FormField name="newPass"
                         type="password"
                         placeholder='new password'/>
              <button type='submit'
                      className={styles.formBtn}
                      disabled={!(formik.isValid &&
                          formik.dirty)}>SUBMIT
              </button>
            </Form>
        )}
  </Formik>;
};

export default PasswordRestoreForm;