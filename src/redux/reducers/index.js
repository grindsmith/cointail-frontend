import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

import groupReducer from './group.reducer';
import walletReducer from './wallet.reducer';

const reducer = combineReducers({
  wallet: walletReducer,
  group: groupReducer
});

const rootReducer = (state, action) => {
  // when a PURGE action is dispatched it will reset redux state
  switch (action.type) {
    case actionTypes.PURGE:
      return reducer(undefined, action);
    default:
      return reducer(state, action);
  }
};

export default rootReducer;