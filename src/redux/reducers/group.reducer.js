/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from '../actions/types';

const initialState = {
  info: {},
  wallets: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GROUP:
      return {
        ...state,
        info: {
          name: action.info.name,
          description: action.info.description,
          ownerId: action.info.ownerId
        },
        wallets: [...action.wallets],
      };
    default:
      return state;
  }
}