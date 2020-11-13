import React, {useEffect} from 'react';
import CONSTANTS from '../../../constants';
import {connect, useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import * as SingleContestActionCreators
  from '../../../actions/singleContestActionCreators';
import styles from './ContestForm.module.sass';
import Spinner from '../../Spinner/Spinner';
import {Field, reduxForm} from 'redux-form';
import FormInput from '../../FormInput/FormInput';
import SelectInput from '../../SelectInput/SelectInput';
import customValidator from '../../../validators/validator';
import Schems from '../../../validators/validationSchems';
import FieldFileInput
  from '../../InputComponents/FieldFileInput/FieldFileInput';
import FormTextArea from '../../InputComponents/FormTextArea/FormTextArea';
import TryAgain from '../../TryAgain/TryAgain';
import {contestsSelector, singleContestSelector} from '../../../selectors';
import {bindActionCreators} from 'redux';
import {getIndustryForContest} from '../../../actions/contestsActionCreators';

let submitFunc;

const ContestForm = (props) => {

  const descriptionForContest = useSelector(singleContestSelector);
  const contestsList = useSelector(contestsSelector);
  const dispatch = useDispatch();
  const {getDescriptionForContest} = bindActionCreators(
      SingleContestActionCreators, dispatch);

  const {defaultData, contestType, handleSubmit} = props;
  const {isFetching, error} = descriptionForContest;
  submitFunc = props.submitData;

  const getPreference = () => {
    switch (contestType) {
      case CONSTANTS.NAME_CONTEST: {
        getDescriptionForContest({
          characteristic1: 'nameStyle',
          characteristic2: 'typeOfName',
        });
        break;
      }
      case CONSTANTS.TAGLINE_CONTEST: {
        getDescriptionForContest({characteristic1: 'typeOfTagline'});
        break;
      }
      case CONSTANTS.LOGO_CONTEST: {
        getDescriptionForContest({characteristic1: 'brandStyle'});
        break;
      }
    }
  };

  const renderSpecialInputs = () => {

    const {
      nameStyle,
      typeOfName,
      brandStyle,
      typeOfTagline,
    } = descriptionForContest.description;

    switch (contestType) {
      case CONSTANTS.NAME_CONTEST: {
        return (
            <>
              <Field
                  name="styleName"
                  component={SelectInput}
                  header="Style name"
                  classes={{
                    inputContainer: styles.selectInputContainer,
                    inputHeader: styles.selectHeader,
                    selectInput: styles.select,
                  }}
                  optionsArray={nameStyle}
              />
              <Field
                  name="typeOfName"
                  component={SelectInput}
                  classes={{
                    inputContainer: styles.selectInputContainer,
                    inputHeader: styles.selectHeader,
                    selectInput: styles.select,
                  }}
                  header="type of company"
                  optionsArray={typeOfName}
              />
            </>
        );
      }
      case CONSTANTS.LOGO_CONTEST: {
        return (
            <>
              <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>
                What name of your venture?
              </span>
                <Field
                    name="nameVenture"
                    component={FormInput}
                    type="text"
                    label="name of venture"
                    classes={{
                      container: styles.componentInputContainer,
                      input: styles.input,
                      warning: styles.warning,
                    }}
                />
              </div>
              <Field
                  name="brandStyle"
                  component={SelectInput}
                  classes={{
                    inputContainer: styles.selectInputContainer,
                    inputHeader: styles.selectHeader,
                    selectInput: styles.select,
                  }}
                  header="Brand Style"
                  optionsArray={brandStyle}
              />
            </>
        );
      }
      case CONSTANTS.TAGLINE_CONTEST: {
        return (
            <>
              <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>
                What name of your venture?
              </span>
                <Field
                    name="nameVenture"
                    component={FormInput}
                    type="text"
                    label="name of venture"
                    classes={{
                      container: styles.componentInputContainer,
                      input: styles.input,
                      warning: styles.warning,
                    }}
                />
              </div>
              <Field
                  name="typeOfTagline"
                  component={SelectInput}
                  classes={{
                    inputContainer: styles.selectInputContainer,
                    inputHeader: styles.selectHeader,
                    selectInput: styles.select,
                  }}
                  header="Type tagline"
                  optionsArray={typeOfTagline}
              />
            </>
        );
      }
    }
  };

  useEffect(() => {
    dispatch(getIndustryForContest());
  }, []);

  useEffect(() => {
    getPreference(contestType);
    props.initialize(defaultData);
  }, [contestType]);

  if (error) return <TryAgain getData={getPreference}/>;
  else
    return (
        <>
          {isFetching ? (
              <Spinner/>
          ) : (
              <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                  <div className={styles.inputContainer}>
                    <span className={styles.inputHeader}>Title of contest</span>
                    <Field
                        name="title"
                        component={FormInput}
                        type="text"
                        label="Title"
                        classes={{
                          container: styles.componentInputContainer,
                          input: styles.input,
                          warning: styles.warning,
                        }}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Field
                        name="industry"
                        component={SelectInput}
                        classes={{
                          inputContainer: styles.selectInputContainer,
                          inputHeader: styles.selectHeader,
                          selectInput: styles.select,
                        }}
                        header="Describe industry associated with your venture"
                        optionsArray={contestsList.industryTypes}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>
                    What does your company / business do?
                  </span>
                    <Field
                        name="focusOfWork"
                        component={FormTextArea}
                        type="text"
                        label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
                        classes={{
                          container: styles.componentInputContainer,
                          inputStyle: styles.textArea,
                          warning: styles.warning,
                        }}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>
                    Tell us about your customers
                  </span>
                    <Field
                        name="targetCustomer"
                        component={FormTextArea}
                        type="text"
                        label="customers"
                        classes={{
                          container: styles.componentInputContainer,
                          inputStyle: styles.textArea,
                          warning: styles.warning,
                        }}
                    />
                  </div>
                  {renderSpecialInputs()}
                  <Field
                      name="file"
                      component={FieldFileInput}
                      classes={{
                        fileUploadContainer: styles.fileUploadContainer,
                        labelClass: styles.label,
                        fileNameClass: styles.fileName,
                        fileInput: styles.fileInput,
                      }}
                      type="file"
                  />
                </form>
              </div>
          )}
        </>
    );
};

const submit = (values) => {
  submitFunc(values);
};

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: ownProps.defaultData,
  };
};

export default connect(
    mapStateToProps,
)(
    reduxForm({
      form: 'contestForm',
      validate: customValidator(Schems.ContestSchem),
      onSubmit: submit,
    })(ContestForm),
);
