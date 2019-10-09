import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignIn, ...otherProps}) => (
  // custom rendering, if it needs to be a google button add some extra classes
  <button className={`${isGoogleSignIn ? 'google-sign-in': '' } custom-button`} {...otherProps}>
    {children}
  </button>
);

export default CustomButton;