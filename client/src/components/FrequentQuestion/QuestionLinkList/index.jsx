import React from 'react';
import QuestionLink from '../QuestionLink';
import styles from './QuestionLinkList.module.scss';

function QuestionLinkList({info}) {
  return (
      <ul className={styles.linksContainer}>
        {info.map((item, index) =>
            <li key={index}
                className={styles.linkLi}>
              <QuestionLink key={index} {...item}/>
            </li>)}
      </ul>
  );
}

export default QuestionLinkList;