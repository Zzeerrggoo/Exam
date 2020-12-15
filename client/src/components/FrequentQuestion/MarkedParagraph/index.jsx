import React from 'react';

function MarkedParagraph({info}) {

  const [{title}, {text}] = info;

  return (
      <p>
        <strong style={{fontWeight: '700'}}>{title}</strong>{text}
      </p>
  );
}

export default MarkedParagraph;