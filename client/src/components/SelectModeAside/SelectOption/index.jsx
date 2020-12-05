import React from 'react';
import classNames from 'classnames';
import styles from './SelectOption.module.scss';

const SelectOption = (props) => {

  const {text, filter, id, onSelect, currentOption} = props;
  const isCurrent = currentOption === id;

  const handleClick = () => {
    onSelect(id, filter);
  };

  return (
      <button
          onClick={handleClick}
          className={classNames(styles.optionButton, {
            [styles.currentOption]: isCurrent,
          })}>
        {text}
      </button>);

};

export default SelectOption;