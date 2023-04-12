import * as actionTypes from './types';
import Axios from 'axios';

// Had to put it somewhere
export const purge = () => ({
  type: actionTypes.PURGE,
});

/**
 * GET ALL GROUPS
 * @returns array of groups
 */
export const getAllGroups = () => {
  return (dispatch) => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/group`)
    .then((res) => {
      dispatch(setAllGroups(res.data.allGroups))
    })
  }
}

export const setAllGroups = (allGroups) => ({
  type: actionTypes.SET_ALL_GROUPS,
  allGroups: allGroups,
});
