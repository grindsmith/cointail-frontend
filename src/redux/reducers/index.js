import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';
import appReducer from './app.reducer';

const reducer = combineReducers({
  app: appReducer,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.PURGE:
      return reducer(undefined, action);
    default:
      return reducer(state, action);
  }
};

export default rootReducer;
