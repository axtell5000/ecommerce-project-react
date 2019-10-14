import { createSelector } from 'reselect';

/* In Redux, whenever an action is called anywhere in the application, all mounted & connected components call their 
mapStateToProps function. This is why we use Reselect. It will just return the memoized result if nothing has changed.

In our code when we copy the state in our reducers and even though the values havent changed it is still considered new*/

const selectCart = state => state.cart; // grabbing a piece of the state

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
  [selectCartItems], //can drill down using previous selectors
  cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
)