import React from 'react';
import loader from './Loading.gif';

function Loading() {
  return (
    <div className="loader" data-test-id="loader">
      <img className="loader__img" src={loader} alt="loader" />
    </div>
  );
}

export default Loading;