import React, {useContext} from 'react';
import {Formik, Form, Field} from 'formik';
import {CurrentTime} from '../../GeneralCounter';
import {differenceInMilliseconds, format, addDays} from 'date-fns';

const initialValues = {
  description: '',
  end: '',
};

const BrandingForm = () => {

  const {expiredTimers, tickingTimers} = useContext(CurrentTime);
  const handleSubmit = ({description, end}) => {
    const timer = {start: new Date(), end: new Date(end), description};
    tickingTimers.push(timer);
    tickingTimers.sort(
        (a, b) => differenceInMilliseconds(new Date(a.end), new Date(b.end)));
    window.localStorage.setItem('counters',
        JSON.stringify({expiredTimers, tickingTimers}));
  };

  return (
      <Formik initialValues={initialValues}
              onSubmit={handleSubmit}>
        <Form>
          <Field type='date'
                 name='end'
                 min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}/>
          <Field name='description'/>
          <button type='submit'>SUBMIT</button>
        </Form>
      </Formik>
  );

};

export default BrandingForm;