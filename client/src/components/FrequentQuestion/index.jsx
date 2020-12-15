import React from 'react';
import {COMPONENT_TYPES} from './frequentQuestionsConstants';
import PlainParagraph from './PlainParagraph';
import MarkedParagraph from './MarkedParagraph';
import QuestionLink from './QuestionLink';
import QuestionLinkList from './QuestionLinkList';
import styles from './FrequentQuestions.module.scss';

export const components = {
  [COMPONENT_TYPES.PlainParagraph]: PlainParagraph,
  [COMPONENT_TYPES.MarkedParagraph]: MarkedParagraph,
  [COMPONENT_TYPES.QuestionLink]: QuestionLink,
  [COMPONENT_TYPES.QuestionLinkList]: QuestionLinkList,
};

function FrequentQuestion(props) {

  const {title, description} = props;

  return (
      <li className={styles.questionContainer}>
        <article>
          <h3 className={styles.title}>{title}</h3>

          {description.map(({type, info}, index) => {
            const Component = components[type];
            return <Component key={index}
                              info={info}/>;
          })}

        </article>
      </li>
  );
}

export default FrequentQuestion;