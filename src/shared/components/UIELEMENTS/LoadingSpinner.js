import React from 'react';

import './LoadingSpinner.css';

//This is the loading spinner showing when a page is loading.
const LoadingSpinner = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
