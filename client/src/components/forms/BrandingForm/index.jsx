import React, {useContext, useState} from 'react';
import {Formik, Form, Field} from 'formik';
import {CurrentTime} from '../../GeneralCounter';
import * as date from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
      <Formik initialValues={initialValues}
              onSubmit={handleSubmit}>
        <Form>
          <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="MM/dd/yyyy -- HH:mm"
              minDate={new Date()}
              filterTime={filterPassedTime}
          />
          <Field name='description'/>
          <button type='submit'>SUBMIT</button>
        </Form>

      </Formik>
  );

};

export default BrandingForm;
