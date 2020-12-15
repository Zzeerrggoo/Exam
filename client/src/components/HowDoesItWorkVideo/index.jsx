import React from 'react';
import classNames from 'classnames';
import CONSTANTS from '../../constants';
import gridStyles from '../../common/styles/grid.module.scss';
import styles from './HowDoesItWorkVideo.module.scss';

function HowDoesItWorkVideo() {

  const infoClassName = classNames(gridStyles.colMd12, gridStyles.colLg6,
      styles.infoContainer);
  const gridClassName = classNames(gridStyles.row, styles.sectionContainer);

  return (
      <section className={gridClassName}>
        <div className={infoClassName}>
          <div className={styles.aspectRatio}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorksThumbnail.webp`}
                 alt="Presentational video"
                 className={styles.videoThumbnail}/>
          </div>
        </div>
        <div className={infoClassName}>
          <h2 className={styles.header}>How Does Squadhelp Work?</h2>
          <p className={styles.info}>
            Squadhelp allows you to host branding competitions to
            engage with the most creative people across the globe and
            get high-quality results, fast. Thousands of creatives
            compete with each other, suggesting great name ideas. At
            the end of the collaborative contest, you select one
            winner. The winner gets paid, and you get a strong brand
            name that will help you succeed! It's quick, simple, and
            costs a fraction of an agency.
          </p>
        </div>
      </section>
  );
}

export default HowDoesItWorkVideo;

