import { UserActionTypes } from './cart.types';

export const toggleCartHidden = () => ({
  type: UserActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: UserActionTypes.ADD_ITEM,
  payload: item
})