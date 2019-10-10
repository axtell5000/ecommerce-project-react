import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo"></Logo>
    </Link>
    <div className="options">
      <Link className="option" to="/shop">SHOP</Link>
      <Link className="option" to="/contact">contact</Link>
      {
        currentUser ?
        <div className="option" onClick={(() => auth.signOut())}>sign out</div>
        :
        <Link className="option" to="signin">sign in</Link>
      }
    </div>
  </div>
);

// statge - rootReducer
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

// connect is a higher order function
export default connect(mapStateToProps)(Header);