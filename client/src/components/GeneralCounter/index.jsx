import React, {useState, useEffect} from 'react';
import {addNotifications} from '../../actions/brandingEventsActionCreators';
import {useDispatch} from 'react-redux';

export const CurrentTime = React.createContext(null);

const GeneralCounter = (props) => {

  if (!window.localStorage.getItem('counters')) {
    window.localStorage.setItem('counters', JSON.stringify({
      expiredTimers: [],
      tickingTimers: [],
    }));
  }

  const store = window.localStorage.getItem('counters');
  const {expiredTimers, tickingTimers} = JSON.parse(store);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {dispatch(addNotifications(expiredTimers.length));}, []);

  useEffect(() => {
    const calculateExpiredTimers = () => {
      const earliestTimer = tickingTimers[0];
      if (earliestTimer) {
        if (new Date(earliestTimer.end) <= currentTime) {
          tickingTimers.shift();
          expiredTimers.unshift(earliestTimer);
          window.localStorage.setItem('counters',
              JSON.stringify({expiredTimers, tickingTimers}));
          dispatch(addNotifications(expiredTimers.length));
        }
      }
    };

    const timeoutId = setTimeout(() => {
      calculateExpiredTimers();
      setCurrentTime(new Date());
    }, 1000);

    return () => clearTimeout(timeoutId);

    // eslint-disable-next-line
  }, [currentTime]);

  return <CurrentTime.Provider value={{
    currentTime,
    expiredTimers,
    tickingTimers,
  }}>
    {props.children}
  </CurrentTime.Provider>;
};

export default GeneralCounter;

