import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CardDropdown from '../cart-dropdown/cart-dopdown.component';
import CartIcon from '../cart-icon/cart-icon.component';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart} from '../../redux/user/user.actions';

import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo"></Logo>
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/">home</OptionLink>
      <OptionLink to="/shop">shop</OptionLink>
      {
        // From mapStateToProps, so we are not using this.state.currentUser anymore
        currentUser ?
        <OptionLink as='div' onClick={signOutStart}>sign out</OptionLink>
        :
        <OptionLink to="signin">sign in</OptionLink>
      }
      <CartIcon />
    </OptionsContainer>
    {
      hidden ? null : <CardDropdown />
    }
    
  </HeaderContainer>
);

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

// connecting to the state. this instance state - rootReducer
// Here we are using the currentUser piece of data
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

// connect is a higher order function
export default connect(mapStateToProps, mapDispatchToProps)(Header);