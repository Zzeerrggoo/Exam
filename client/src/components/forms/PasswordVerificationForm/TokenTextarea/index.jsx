import React, {useRef} from 'react';
import styles from './TokenTexarea.module.scss';

const TokenTextarea = () => {

  const token = (new URLSearchParams(document.location.search)).get('token');
  const tokenData = useRef(null);

  const handleCopy = () => {
    tokenData.current.focus();
    tokenData.current.select();
    document.execCommand('copy');
  };

  return (
      <div className={styles.tokenContainer}>
                      <textarea ref={tokenData}
                                value={token}
                                readOnly
                                className={styles.tokenInput}
                      />
        <svg className={styles.copy}
             onClick={handleCopy}
             style={{width: '24px', height: '24px'}}
             viewBox="0 0 24 24">
          <path fill="black"
                d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
        </svg>
      </div>);
};

export default TokenTextarea;