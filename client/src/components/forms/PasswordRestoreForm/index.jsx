import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import styles from './PasswordRestoreForm.module.scss';
import schema from '../../../validators/validationSchems';

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
              <Field name="email"
                     placeholder='email'
                     className={styles.field}/>
              <ErrorMessage name='email'/>
              <Field name="newPass"
                     type="password"
                     placeholder='new password'
                     className={styles.field}/>
              <ErrorMessage name='newPass'/>
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