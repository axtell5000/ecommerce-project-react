import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import './App.css';

// We are converting this to a class based component because we are using state based on user logged in
class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    // unsubscribeFromAuth - is an Observer "listening" to firebase. The whole thing is subscribing to firebase, so everytime
    // there is a change in auth the code will run and changing our local state
    // userAuth is the user state of the auth in firebase project
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // onSnapshot gives us a snapshot of our database at the beginning
        userRef.onSnapshot(snapShot => {
          this.setState({
              currentUser: {
              id: snapShot.id,
              ...snapShot.data() // have to use data() to get data from snapshot
            }
          });
          
        });
        
      }
      // here if no user we are seeting the currentUser to null as it was right at the beginning
      this.setState({ currentUser: userAuth });
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
      {/* passing the current user to our header so we can use it to alter links*/}
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }

}

export default App;
