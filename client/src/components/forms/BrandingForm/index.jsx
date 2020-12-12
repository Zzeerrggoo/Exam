import React, {useContext, useState} from 'react';
import {Formik, Form, Field} from 'formik';
import {CurrentTime} from '../../GeneralCounter';
import * as date from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BrandingForm.module.scss';

const initialValues = {
  description: '',
};

const BrandingForm = () => {
  const [endDate, setEndDate] = useState(
      date.addHours(new Date(), 1));

  const {expiredTimers, tickingTimers} = useContext(CurrentTime);
  const handleSubmit = ({description}, e) => {
    e.resetForm();
    const timer = {start: new Date(), end: new Date(endDate), description};
    tickingTimers.push(timer);
    tickingTimers.sort(
        (a, b) => date.differenceInMilliseconds(new Date(a.end),
            new Date(b.end)));
    window.localStorage.setItem('counters',
        JSON.stringify({expiredTimers, tickingTimers}));
  };

  const filterPassedTime = time => {
    return (new Date().getTime() < new Date(time).getTime());
  };

  return (
      <div className={styles.mainContainer}>
        <Formik initialValues={initialValues}
                onSubmit={handleSubmit}>
          <Form className={styles.container}>

            <div className={styles.inputContainer}>
              <label htmlFor="brandingTimePicker"
                     className={styles.label}>Ending time</label>
              <DatePicker
                  id='brandingTimePicker'
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={1}
                  dateFormat="MM/dd/yyyy -- HH:mm"
                  minDate={new Date()}
                  filterTime={filterPassedTime}
                  className={styles.info}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="brandingDescription"
                     className={styles.label}>Description</label>
              <Field id='brandingDescription'
                     className={styles.info}
                     name='description'
                     placeholder='Description'
                     required/>
            </div>
            <button type='submit'
                    className={styles.submitButton}>SUBMIT
            </button>

          </Form>
        </Formik>
      </div>
  );

};

export default BrandingForm;
