import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';
import validationSchema from '../../../validators/validationSchems';
import FormInput from '../../FormInput/FormInput';
import ImageUpload from '../../InputComponents/ImageUpload/ImageUpload';
import styles from './UpdateUserInfoForm.module.sass';

function UpdateUserInfoForm(props) {

  const {onSubmit, initialValues} = props;

  const handleSubmit = useCallback((values) => {
    onSubmit(values);
  }, [onSubmit]);

  return (
      <Formik initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema.UpdateUserSchema}>

        <Form className={styles.updateContainer}>
          <div className={styles.container}>
            <span className={styles.label}>First Name</span>
            <FormInput name="firstName"
                       type="text"
                       label="First Name"
                       classes={{
                         container: styles.inputContainer,
                         input: styles.input,
                         warning: styles.error,
                         notValid: styles.notValid,
                       }}/>
          </div>

          <div className={styles.container}>
            <span className={styles.label}>Last Name</span>
            <FormInput name="lastName"
                       type="text"
                       label="LastName"
                       classes={{
                         container: styles.inputContainer,
                         input: styles.input,
                         warning: styles.error,
                         notValid: styles.notValid,
                       }}/>
          </div>

          <div className={styles.container}>
            <span className={styles.label}>Display Name</span>
            <FormInput name="displayName"
                       type="text"
                       label="Display Name"
                       classes={{
                         container: styles.inputContainer,
                         input: styles.input,
                         warning: styles.error,
                         notValid: styles.notValid,
                       }}/>
          </div>

          <ImageUpload name="file"
                       classes={{
                         uploadContainer: styles.imageUploadContainer,
                         inputContainer: styles.uploadInputContainer,
                         imgStyle: styles.imgStyle,
                       }}/>

          <button type="submit">Submit</button>
        </Form>

      </Formik>
  );
}

UpdateUserInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,

  initialValues: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    displayName: PropTypes.string,
    file: PropTypes.string,
  }),
};

UpdateUserInfoForm.defaultProps = {
  initialValues: {
    firstName: '',
    lastName: '',
    displayName: '',
    file: '',
  },
};

export default UpdateUserInfoForm;
