import React from 'react';
import * as date from 'date-fns';
import {useContext} from 'react';
import {CurrentTime} from '../../GeneralCounter';

const BrandLi = props => {

  const {currentTime} = useContext(CurrentTime);
  const {start, end, description, isExpired} = props;
  const fullTime = date.differenceInMilliseconds(new Date(end),
      new Date(start));
  const value = isExpired ? fullTime : date.differenceInMilliseconds(
      currentTime,
      new Date(start));

  return (
      <div>
        <label>{description}
          <progress
              max={fullTime}
              value={value}>{value}
          </progress>
        </label>
      </div>
  );

};

export default BrandLi;