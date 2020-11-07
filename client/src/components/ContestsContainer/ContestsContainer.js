import React, {useEffect} from 'react';
import styles from './ContestContainer.module.sass';
import Spinner from '../../components/Spinner/Spinner';

const ContestsContainer = (props) => {

  const scrollHandler = () => {
    if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
    ) {
      if (props.haveMore) {
        props.loadMore(props.children.length);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {window.removeEventListener('scroll', scrollHandler);};

  }, []);

  const {isFetching} = props;
  if (!isFetching && props.children.length === 0) {
    return <div className={styles.notFound}>Nothing found</div>;
  } else
    return (
        <div>
          {props.children}
          {isFetching && (
              <div className={styles.spinnerContainer}>
                <Spinner/>
              </div>
          )}
        </div>
    );
};

export default ContestsContainer;
