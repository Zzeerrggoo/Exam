import React from 'react';
import classNames from 'classnames';
import gridStyles from '../../common/styles/grid.module.scss';
import styles from './StepCard.module.scss';

function StepCard(props) {

  const {stepNumber, title, description} = props;

  const className = classNames(gridStyles.colSm12,
      gridStyles.colMd12, gridStyles.colLg5,
      gridStyles.colXl5, gridStyles.col2, styles.stepLiItem);

  return (
      <li className={className}>
        <div className={styles.stepNumber}>{stepNumber}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>
          {description}
        </p>
      </li>
  );
}

export default StepCard;