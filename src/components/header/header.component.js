import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CardDropdown from '../cart-dropdown/cart-dopdown.component';
import CartIcon from '../cart-icon/cart-icon.component';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo"></Logo>
    </Link>
    <div className="options">
      <Link className="option" to="/">home</Link>
      <Link className="option" to="/shop">shop</Link>
      {
        // From mapStateToProps, so we are not using this.state.currentUser anymore
        currentUser ?
        <div className="option" onClick={(() => auth.signOut())}>sign out</div>
        :
        <Link className="option" to="signin">sign in</Link>
      }
      <CartIcon />
    </div>
    {
      hidden ? null : <CardDropdown />
    }
    
  </div>
);

// connecting to the state. this instance state - rootReducer
// Here we are using the currentUser piece of data
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  hidden: state.cart.hidden
})

// connect is a higher order function
export default connect(mapStateToProps)(Header);