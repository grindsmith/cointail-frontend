import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const reducer = combineReducers({});

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
