import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import BrandingList from '../../components/BrandingList';
import BrandingForm from '../../components/forms/BrandingForm';
import SelectModeAside from '../../components/SelectModeAside';
import styles from './EventsPage.module.scss';

const modes = {
  list: 'list',
  form: 'form',
};

const EventsPage = () => {

  const [mode, setMode] = useState(modes.list);

  const changeFilter = (newFilter) => {
    setMode(newFilter);
  };

  return (
      <>
        <Header/>
        <div className={styles.container}>
          <SelectModeAside changeFilter={changeFilter}
                           options={[
                             {text: 'List', filter: modes.list},
                             {text: 'Add new', filter: modes.form}]}/>
          {mode === modes.list ? <BrandingList/> : <BrandingForm/>}
        </div>
      </>
  );
};

export default EventsPage;
