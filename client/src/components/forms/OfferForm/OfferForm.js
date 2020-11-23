import React from 'react';
import CONTANTS from '../../../constants';
import {connect} from 'react-redux';
import {clearError} from '../../../actions/offerActionCreators';
import {addNewOffer} from '../../../actions/offerActionCreators';
import styles from './OfferForm.module.sass';
import {reduxForm, Field} from 'redux-form';
import ImageUpload from '../../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../../FormInput/FormInput';
import customValidator from '../../../validators/validator';
import Schems from '../../../validators/validationSchems';
import Error from '../../Error/Error';

let contestType;

const OfferForm = (props) => {
  const renderOfferInput = () => {
    if (props.contestType === CONTANTS.LOGO_CONTEST) {
      return (
          <Field
              name="offerData"
              component={ImageUpload}
              classes={{
                uploadContainer: styles.imageUploadContainer,
                inputContainer: styles.uploadInputContainer,
                imgStyle: styles.imgStyle,
              }}
          />
      );
    } else {
      return (
          <Field
              name="offerData"
              classes={{
                container: styles.inputContainer,
                input: styles.input,
                warning: styles.fieldWarning,
                notValid: styles.notValid,
              }}
              component={FormInput}
              type="text"
              label="your suggestion"
          />
      );
    }
  };

  const setOffer = (values) => {
    props.clearOfferError();
    const data = new FormData();
    const {contestId, contestType, customerId, reset} = props;
    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);
    props.setNewOffer(data);
    reset();
  };

  contestType = props.contestType;
  const {handleSubmit, valid, error, clearOfferError} = props;
  return (
      <div className={styles.offerContainer}>
        {error && (
            <Error
                data={error.data}
                status={error.status}
                clearError={clearOfferError}
            />
        )}
        <form onSubmit={handleSubmit(setOffer)}
              className={styles.form}>
          {renderOfferInput()}
          {valid && (
              <button type="submit"
                      className={styles.btnOffer}>
                Send Offer
              </button>
          )}
        </form>
      </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewOffer: (data) => dispatch(addNewOffer(data)),
    clearOfferError: () => dispatch(clearError()),
  };
};

const mapStateToProps = (state) => {
  const {error} = state.offers;
  return {error};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    reduxForm({
      form: 'offerForm',
      validate: customValidator(
          contestType === CONTANTS.LOGO_CONTEST
              ? Schems.LogoOfferSchema
              : Schems.TextOfferSchema,
      ),
    })(OfferForm),
);
