import React from 'react';
import styles from './ButtonGroupButton.module.scss';
import classNames from 'classnames';

const ButtonGroupButton = (props) => {

  const {value, currentButton, onClick, spanText, description} = props;

  const isCurrent = value === currentButton;
  const containerClassNames = classNames(styles.container,
      {[styles.containerChecked]: isCurrent});

  const handleClick = () => {
    onClick(value);
  };

  return (
      <div className={containerClassNames}
           onClick={handleClick}>
          <span className={styles.pillSpan}>
          {spanText}
          </span>
        <h5 className={styles.description}>{description}</h5>
      </div>
  );
};

export default ButtonGroupButton;