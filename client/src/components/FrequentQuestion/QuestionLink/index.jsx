import React from 'react';

function QuestionLink({href, text}) {
  return (
      <a style={{color: '#28d2d0'}}
         href={href}
         target="_blank"
         rel="noopener noreferrer">{text}</a>
  );
}

export default QuestionLink;