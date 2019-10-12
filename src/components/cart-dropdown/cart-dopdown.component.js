import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './cart-dopdown.styles.scss';

const CartDropdown = () => (
  <div className="cart-dropdown">
    <div className="cart-items"></div>
    <CustomButton>go to checkout</CustomButton>
  </div>
);

export default CartDropdown;