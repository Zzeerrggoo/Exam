import React, {useState} from 'react';
import SelectOption from './SelectOption';
import styles from './SelectModeAside.module.scss';

const SelectModeAside = (props) => {

  const {options, changeFilter} = props;
  const [currentOption, setCurrentOption] = useState(0);

  const changeOption = (newOption, newFilter) => {
    setCurrentOption(newOption);
    changeFilter(newFilter);
  };

  return (
      <aside className={styles.aside}>
        {options.map((item, index) => <SelectOption key={index}
                                                    id={index}
                                                    currentOption={currentOption}
                                                    onSelect={changeOption}
                                                    {...item}/>)}
      </aside>);
};

export default SelectModeAside;