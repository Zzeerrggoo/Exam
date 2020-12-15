import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import FrequentQuestion from '../../components/FrequentQuestion';
import StepCard from '../../components/StepCard';
import GetInTouchContacts from '../../components/GetInTouchContacts';
import HowDoesItWorkVideo from '../../components/HowDoesItWorkVideo';
import STEP_CARDS_TEXT from '../../components/StepCard/stepCardConstants';
import FREQUENT_QUESTIONS_TEXT
  from '../../components/FrequentQuestion/frequentQuestionsConstants';
import gridStyles from '../../common/styles/grid.module.scss';
import styles from './HowItWorks.module.scss';
import classNames from 'classnames';

function HowItWorks() {

  const mainClassName = classNames(gridStyles.container, styles.mainContainer);
  const cardsList = classNames(gridStyles.row, styles.cardsList);

  return (
      <>
        <Header/>

        <main className={mainClassName}>
          <HowDoesItWorkVideo/>
          <article className={styles.stepsContainer}>
            <h2 className={styles.stepsHeader}>5 Simple Steps</h2>
            <ul className={cardsList}>
              {STEP_CARDS_TEXT.map(
                  (item, index) => <StepCard key={index} {...item} />)}
            </ul>
            <div className={styles.startContestButton}>
              <a href="https://www.google.com/"
                 className="startContestButton">Start a Contest</a>
            </div>
          </article>

          <article>
            <div className={styles.frequentQuestionHeader}>
              <div className={styles.questionsSymbol}>?</div>
              <h2 className={styles.questionsHeader}>Frequently Asked
                                                     Questions</h2>
            </div>
            <ul>
              {FREQUENT_QUESTIONS_TEXT.map((item, index) =>
                  <FrequentQuestion key={index} {...item}/>,
              )}
            </ul>
          </article>
        </main>
        <GetInTouchContacts/>
        <Footer/>
      </>);

}

export default HowItWorks;

