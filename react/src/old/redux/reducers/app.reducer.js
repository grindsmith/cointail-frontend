/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from '../actions/types';

const initialState = {
  allGroups: [],
  allWallets: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALL_GROUPS:
      return {
        ...state,
        allGroups: [...action.allGroups],
      };
    case actionTypes.SET_ALL_WALLETS:
      return {
        ...state,
        allWallets: [...action.allWallets],
      };
    default:
      return state;
  }
}