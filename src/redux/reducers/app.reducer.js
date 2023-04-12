/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from '../actions/types';

const initialState = {
  allGroups: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALL_GROUPS:
      return {
        ...state,
        allGroups: [...action.allGroups],
      };
    default:
      return state;
  }
}