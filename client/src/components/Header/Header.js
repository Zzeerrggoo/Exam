import React, {useCallback} from 'react';
import styles from './Header.module.sass';
import {Link} from 'react-router-dom';
import CONSTANTS, {ROLES} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {logoutRequest} from '../../actions/authActionCreators';
import {authSelector, brandingSelector} from '../../selectors';

function Header() {
  const {isFetching, user} = useSelector(authSelector);

  const dispatch = useDispatch();
  const {notificationCounter} = useSelector(brandingSelector);

  const logoutAction = useCallback(() => void dispatch(logoutRequest()), [
    dispatch,
    logoutRequest,
  ]);

  const renderLoginButtons = () => {
    if (user) {
      return (
          <>
            <div className={styles.userInfo}>
              <img
                  src={
                    user.avatar === 'anon.png'
                        ? CONSTANTS.ANONYM_IMAGE_PATH
                        : `${CONSTANTS.publicURL}${user.avatar}`
                  }
                  alt="user"
              />
              <span>{`Hi, ${user.displayName}`}</span>
              <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
              />
              <ul>
                <li>
                  <Link to="/dashboard"
                        style={{textDecoration: 'none'}}>
                    <span>View Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/account"
                        style={{textDecoration: 'none'}}>
                    <span>My Account</span>
                  </Link>
                </li>
                <li>
                  <Link
                      to="http:/www.google.com"
                      style={{textDecoration: 'none'}}
                  >
                    <span>Messages</span>
                  </Link>
                </li>
                {user.role === 'customer' &&
                <li>
                  <Link
                      to="/events"
                      style={{textDecoration: 'none'}}
                  >
                    <span>Events</span>
                  </Link>
                </li>}
                <li>
                  <Link
                      to="http:/www.google.com"
                      style={{textDecoration: 'none'}}
                  >
                    <span>Affiliate Dashboard</span>
                  </Link>
                </li>
                <li>
                  <span onClick={logoutAction}>Logout</span>
                </li>
              </ul>
            </div>
            <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
                className={styles.icon}
                alt="email"
            />
            {user.role === 'customer' &&
            <Link to={'/events'}
                  className={styles.icon}>
              <svg viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z"/>
              </svg>
              <span className={styles.notification}>{notificationCounter}</span>
            </Link>}
          </>
      );
    } else {
      return (
          <>
            <Link to="/login"
                  style={{textDecoration: 'none'}}>
              <span className={styles.btn}>LOGIN</span>
            </Link>
            <Link to="/signup"
                  style={{textDecoration: 'none'}}>
              <span className={styles.btn}>SIGN UP</span>
            </Link>
          </>
      );
    }
  };

  if (isFetching) {
    return null;
  }
  return (
      <div className={styles.headerContainer}>
        <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
          <a href="http://www.google.com">Read Announcement</a>
        </div>
        <div className={styles.loginSignnUpHeaders}>
          <div className={styles.numberContainer}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`}
                 alt="phone"/>
            <span>(877)&nbsp;355-3585</span>
          </div>
          <div className={styles.userButtonsContainer}>
            {renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
              className={styles.logo}
              alt="blue_logo"
          />
          <div className={styles.leftNav}>
            <div className={styles.nav}>
              <ul>
                <li>
                  <span>NAME IDEAS</span>
                  <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                      alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">Beauty</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Consulting</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">E-Commerce</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Fashion & Clothing</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Finance</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Real Estate</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Tech</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">More Categories</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>CONTESTS</span>
                  <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                      alt="menu"
                  />
                  <ul>
                    <li>
                      <Link to="/howitworks">HOW IT WORKS</Link>
                    </li>
                    <li>
                      <a href="http://www.google.com">PRICING</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">AGENCY SERVICE</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">ACTIVE CONTESTS</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">WINNERS</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">LEADERBOARD</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">BECOME A CREATIVE</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Our Work</span>
                  <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                      alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">TAGLINES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">LOGOS</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">TESTIMONIALS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Names For Sale</span>
                  <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                      alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">POPULAR NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">SHORT NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">INTRIGUING NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">NAMES BY CATEGORY</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">VISUAL NAME SEARCH</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">SELL YOUR DOMAINS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Blog</span>
                  <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                      alt="menu"
                  />
                  <ul>
                    <li>
                      <a target="_blank"
                         href="http://www.google.com">
                        ULTIMATE NAMING GUIDE
                      </a>
                    </li>
                    <li>
                      <a href="http://www.google.com">
                        POETIC DEVICES IN BUSINESS NAMING
                      </a>
                    </li>
                    <li>
                      <a href="http://www.google.com">CROWDED BAR THEORY</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">ALL ARTICLES</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {user && user.role === ROLES.CUSTOMER && (
                <Link className={styles.startContestBtn}
                      to="/startContest">
                  START CONTEST
                </Link>
            )}
          </div>
        </div>
      </div>
  );
}

export default Header;
