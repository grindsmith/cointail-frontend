import Axios from 'axios';
import * as actionTypes from './types';

export const purge = () => ({
  type: actionTypes.PURGE,
});

export const setAppWallets = (appWallets) => ({
  type: actionTypes.SET_APP_WALLETS,
  appWallets,
});

export const getAppWallets = () => (dispatch) => {
  console.log(`${process.env.REACT_APP_BACKEND_URL}/api/wallet`);
  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/wallet`).then((res) => {
    dispatch(setAppWallets(res.data.wallets));
  });
};

export const postAppWallets = (address) => () => {
  Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/wallet`, { address });
};

export const putAppWallets = (address, name) => () => {
  Axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/wallet`, { wallet: address, name });
};

/**
 *
 *
 *  TOKEN FUNCTIONS
 *
 *
 */

export const setTokenPairs = (tokenPairs) => ({
  type: actionTypes.SET_TOKEN_PAIRS,
  tokenPairs,
});

export const getTokenPairs = (symbol) => (dispatch) => {
  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/token/pairs/${symbol}`)
    .then((res) => {
      dispatch(setTokenPairs(res.data.tokenPairs));
    });
};

/**
 *
 *
 *  WALLET FUNCTIONS
 *
 *
 */

export const setWalletTokens = (walletTokens) => ({
  type: actionTypes.SET_WALLET_TOKENS,
  walletTokens,
});

export const getWalletTokens = (wallet) => (dispatch) => {
  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/wallet/${wallet}/tokens`).then((res) => {
    dispatch(setWalletTokens(res.data.walletTokens));
  });
};

export const setWalletTransactions = (walletTransactions) => ({
  type: actionTypes.SET_WALLET_TRANSACTIONS,
  walletTransactions,
});

export const getWalletTransactions = (wallet) => (dispatch) => {
  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/wallet/${wallet}/transactions`).then((res) => {
    dispatch(setWalletTransactions(res.data.walletTransactions));
  });
};
