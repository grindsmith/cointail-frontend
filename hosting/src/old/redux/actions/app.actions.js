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
    .catch((err) => console.log(err));
  }
}

export const setAllGroups = (allGroups) => ({
  type: actionTypes.SET_ALL_GROUPS,
  allGroups: allGroups,
});

/**
 * GET ALL WALLETS
 * @returns array of groups
 */
export const getAllWallets = () => {
  return (dispatch) => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/wallet`)
    .then((res) => {
      dispatch(setAllWallets(res.data.allWallets))
    })
    .catch((err) => console.log(err));
  }
}

export const setAllWallets = (allWallets) => ({
  type: actionTypes.SET_ALL_WALLETS,
  allWallets: allWallets,
});

/**
 * POST GROUP WALLET 
 * @returns array of groups
 */
export const postGroupWallet = (walletId, groupId) => {
  return (dispatch) => {
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/group-wallet`, {
      'walletId': walletId,
      'groupId': groupId
    })
    .catch((err) => console.log(err));
  }
}