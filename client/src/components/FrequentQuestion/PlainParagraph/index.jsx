import React from 'react';
import QuestionLink from '../QuestionLink';

function PlainParagraph({info}) {
  return (
      <p>
        {info.map((item, index) => {
          const {type} = item;
          if (type) {
            return <QuestionLink key={index} {...item}/>;
          }
          return item?.text;
        })}
      </p>
  );
}

export default PlainParagraph;