import React, {useCallback} from 'react';
import {Formik, Form} from 'formik';
import OptionInput from './OptionInput';
import styles from '../../CreatorDashboard/CreatorDashboard.module.sass';
import CheckBoxInput from './CheckBoxInput';
import PlainInput from './PlainInput';

const contestTypes = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

const awardTypes = [
  {asc: 'Ascending'},
  {desc: 'Descending'},
];

const initialValues = {
  typeIndex: 'name,tagline,logo',
  contestId: '',
  awardType: 'asc',
  industry: '',
  ownEntries: false,
};

function FilterContests(props) {

  const {onSubmit, isIndustryLoading, industry} = props;

  const handleSubmit = useCallback((values) => {
    onSubmit(values);
  }, [onSubmit]);

  return (
      <Formik initialValues={initialValues}
              onSubmit={handleSubmit}>
        <Form className={styles.filterContainer}>
          <span className={styles.headerFilter}>Filter Results</span>

          <div className={styles.inputsContainer}>

            <CheckBoxInput name="ownEntries"
                           label="My Entries"/>

            <OptionInput name='typeIndex'
                         label="By contest type"
                         options={contestTypes}/>

            <PlainInput name='contestId'
                        label="By contest ID"/>

            {!isIndustryLoading && <OptionInput name='industry'
                                                label="By industry"
                                                options={industry}/>}
            <OptionInput name='awardType'
                         label="By award type"
                         options={awardTypes}/>

            <button type="submit"
                    className={styles.searchButton}>
              Search
            </button>
          </div>
        </Form>
      </Formik>
  );
}

export default FilterContests;
