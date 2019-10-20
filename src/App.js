import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import './App.css';

// We are converting this to a class based component because we are using state based on user logged in
class App extends React.Component {

  // this is to be used to subscribe and unsubscribe to an Observer. Stage 3 level of setting a variable
  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser, collectionsArray } = this.props; // destructuring off props, the dispatch to be used here
    // unsubscribeFromAuth - is an Observer "listening" to firebase. The whole thing is subscribing to firebase, so everytime
    // there is a change in auth the code will run and changing our local state
    // userAuth is the user state of the auth in firebase project
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // onSnapshot gives us a snapshot of our database at the beginning
        userRef.onSnapshot(snapShot => {
          // Now we are using the dispatch/action with its payload to change the state which will be put through the reducer
          setCurrentUser({              
            id: snapShot.id,
            ...snapShot.data() // have to use data() to get data from snapshot            
          });          
        });
        
      }
      // here if no user we are seeting the currentUser to null as it was right at the beginning
      setCurrentUser(userAuth);
      addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items}))); // put here do run only once
    });
  }

  // need to do this to prevent memory leaks
  componentWillUnmount() {
    // Built into function so that when we call it , it closes the subscription
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>      
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : ( <SignInAndSignUp />)} />
        </Switch>
      </div>
    );
  }

}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

// seeting up our dispatch to be used when we want to change state
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
