import React from 'react';
import classNames from 'classnames';
import gridStyles from '../../common/styles/_grid.module.scss';
import styles from './GetInTouch.module.scss';

function GetInTouchContacts() {

  const gridClassName = classNames(gridStyles.container, gridStyles.row);

  const infoClassName = classNames(gridStyles.colSm12, gridStyles.colMd12,
      gridStyles.colXl12,
      gridStyles.col9, styles.infoContainer);

  const linkClassName = classNames(gridStyles.colSm12, gridStyles.colMd12,
      gridStyles.colXl12, gridStyles.col3, styles.buttonWrapper);

  return (
      <section className={styles.sectionContainer}>
        <div className={gridClassName}>
          <div className={infoClassName}>
            <div className={styles.envelope}>
              <svg viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z"/>
              </svg>
            </div>
            <div className={styles.description}>
              <h1 className={styles.descriptionHeader}>Questions?</h1>
              <p className={styles.descriptionParagraph}>
                Check out our <a href="https://www.google.com/">FAQs</a> or send
                us a <a href="https://www.google.com/">message</a>.
                For assistance with launching a contest, you can also call us at
                (877) 355-3585 or schedule
                a <a href="https://www.google.com/">Branding Consultation</a>
              </p>
            </div>
          </div>

          <div className={linkClassName}>
            <a href="https://www.squadhelp.com/howitworks.php"
               className={styles.getInTouchButton}>get in touch</a>
          </div>
        </div>
      </section>
  );
}

export default GetInTouchContacts;
