import React from 'react';
import Error from '../Error/Error';
import {connect} from 'react-redux';
import {authActionRegister, clearAuth} from '../../actions/actionCreator';
import styles from './RegistrationForm.module.sass';
import {Field, reduxForm} from 'redux-form';
import FormInput from '../FormInput/FormInput';
import RoleInput from '../RoleInput/RoleInput';
import AgreeTermOfServiceInput
  from '../AgreeTermOfServiceInput/AgreeTermOfServiceInput';
import {ROLES} from '../../constants';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';
import {signUpRequest} from '../../actions/authActionCreators';
import {Redirect} from 'react-router-dom';

class RegistrationForm extends React.Component {
  componentWillUnmount() {
    this.props.authClear();
  }

  clicked = values => {
    this.props.register({
      firstName: values.firstName,
      lastName: values.lastName,
      displayName: values.displayName,
      email: values.email,
      password: values.password,
      role: values.role,
    });
  };

  render() {
    const {handleSubmit, submitting, auth, authClear} = this.props;
    const {error} = auth;
    const {user} = this.props.auth;
    if (user) {
      return user.role === ROLES.MODERATOR ?
          <Redirect to={'/moderation'}/> :
          <Redirect to={'/'}/>;
    }

    return (
        <div className={styles.signUpFormContainer}>
          {error && (
              <Error
                  data={error.data}
                  status={error.status}
                  clearError={authClear}
              />
          )}
          <div className={styles.headerFormContainer}>
            <h2>CREATE AN ACCOUNT</h2>
            <h4>We always keep your name and email address private.</h4>
          </div>
          <form onSubmit={handleSubmit(this.clicked)}>
            <div className={styles.row}>
              <Field
                  name="firstName"
                  classes={{
                    container: styles.inputContainer,
                    input: styles.input,
                    warning: styles.fieldWarning,
                    notValid: styles.notValid,
                  }}
                  component={FormInput}
                  type="text"
                  label="First name"
              />
              <Field
                  name="lastName"
                  classes={{
                    container: styles.inputContainer,
                    input: styles.input,
                    warning: styles.fieldWarning,
                    notValid: styles.notValid,
                  }}
                  component={FormInput}
                  type="text"
                  label="Last name"
              />
            </div>
            <div className={styles.row}>
              <Field
                  name="displayName"
                  classes={{
                    container: styles.inputContainer,
                    input: styles.input,
                    warning: styles.fieldWarning,
                    notValid: styles.notValid,
                  }}
                  component={FormInput}
                  type="text"
                  label="Display Name"
              />
              <Field
                  name="email"
                  classes={{
                    container: styles.inputContainer,
                    input: styles.input,
                    warning: styles.fieldWarning,
                    notValid: styles.notValid,
                  }}
                  component={FormInput}
                  type="text"
                  label="Email Address"
              />
            </div>
            <div className={styles.row}>
              <Field
                  name="password"
                  classes={{
                    container: styles.inputContainer,
                    input: styles.input,
                    warning: styles.fieldWarning,
                    notValid: styles.notValid,
                  }}
                  component={FormInput}
                  type="password"
                  label="Password"
              />
              <Field
                  name="confirmPassword"
                  classes={{
                    container: styles.inputContainer,
                    input: styles.input,
                    warning: styles.fieldWarning,
                    notValid: styles.notValid,
                  }}
                  component={FormInput}
                  type="password"
                  label="Password confirmation"
              />
            </div>
            <div className={styles.choseRoleContainer}>
              <Field
                  name="role"
                  type="radio"
                  value={ROLES.CUSTOMER}
                  strRole="Join As a Buyer"
                  infoRole="I am looking for a Name, Logo or Tagline for my business, brand or product."
                  component={RoleInput}
                  id={ROLES.CUSTOMER}
              />
              <Field
                  name="role"
                  type="radio"
                  value={ROLES.CREATOR}
                  strRole="Join As a Creative"
                  infoRole="I plan to submit name ideas, Logo designs or sell names in Domain Marketplace."
                  component={RoleInput}
                  id={ROLES.CREATOR}
              />
            </div>
            <div className={styles.termsOfService}>
              <Field
                  name="agreeOfTerms"
                  classes={{
                    container: styles.termsOfService,
                    warning: styles.fieldWarning,
                  }}
                  id="termsOfService"
                  component={AgreeTermOfServiceInput}
                  type="checkbox"
              />
            </div>
            <button
                type="submit"
                disabled={submitting}
                className={styles.submitContainer}
            >
              <span className={styles.inscription}>Create Account</span>
            </button>
          </form>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    initialValues: {
      role: ROLES.CUSTOMER,
    },
  };
};

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(signUpRequest(data)),
  authClear: () => dispatch(clearAuth()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
      form: 'login',
      validate: customValidator(Schems.RegistrationSchem),
    })(RegistrationForm),
);
