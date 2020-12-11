import React from 'react';
import BrandLi from './BrandLi';
import {useContext} from 'react';
import {CurrentTime} from '../GeneralCounter';

const BrandingList = () => {

  const timers = useContext(CurrentTime);
  const {expiredTimers, tickingTimers} = timers;

  return (
      <ul>
        {
          [...expiredTimers].map(
              (item) => <BrandLi key={item.start}
                                 isExpired={true} {...item}/>)
        }
        {
          [...tickingTimers].map(
              (item) => <BrandLi key={item.start}
                                 isExpired={false}{...item}/>)
        }

      </ul>
  );
};

export default BrandingList;
