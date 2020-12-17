import React from 'react';
import styles from './HeaderLinksStrip.module.scss';
import CONSTANTS from '../../constants';
import {Link} from 'react-router-dom';

const HeaderLinksStrip = (props) => {

  const links = props.links.map((item, index) =>
      <Link to="/login"
            style={{textDecoration: 'none'}}
            key={index}>
        <span>{item}</span>
      </Link>,
  );

  return (
      <div className={styles.headerSignUpPage}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`}
             alt="logo"/>
        <div className={styles.linkLoginContainer}>
          {links}
        </div>
      </div>);
};

export default HeaderLinksStrip;