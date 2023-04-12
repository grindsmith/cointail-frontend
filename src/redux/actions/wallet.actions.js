import * as actionTypes from './types';
import Axios from 'axios';

// Had to put it somewhere
export const purge = () => ({
  type: actionTypes.PURGE,
});

/**
 * WALLET DATABASE ACTIONS
 * GET GROUPS BY ACCOUNT
 * @param {*} account: wallet address
 * @returns array of groups
 */
export const getWallet = (wallet) => {
  return (dispatch) => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/wallet/${wallet}`)
    .then((res) => {
      console.log(res.data, res.data)
      dispatch(setWallet(res.data.info, res.data.groups))
    })
  }
}

export const setWallet = (info, groups) => ({
  type: actionTypes.SET_WALLET,
  info: info,
  groups: groups,
});

export const postWallet = (address) => {
  return () => {
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/wallet`, {
      'address': address
    }).catch((error) => console.log(error));
  };
}

export const putWallet = (address, name) => {
  return () => {
    Axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/wallet`, {
      'wallet': address,
      'name': name
    }).catch((error) => console.log(error));
  };
}

/**
 * GET WALLET TOKENS
 * @param {*} chain : ethereum, arbitrum
 * @param {*} network : mainnet
 * @param {*} wallet : wallet address
 * @returns : tokens held by the wallet on that chain and network
 */
export const getWalletTokens = (chain, network, wallet) => {  
  return (dispatch) => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/eth/${chain}/${network}/wallet/${wallet}/tokens`)
    .then((res) => {
      if (chain === 'ethereum' && network === 'mainnet')
        dispatch(setWalletEthereumTokens(res.data.tokens));
      else if (chain === 'arbitrum' && network === 'mainnet')
        dispatch(setWalletArbitrumTokens(res.data.tokens));
    })
    .catch((error) => console.log(error));
  }
};

export const setWalletEthereumTokens = (tokens) => ({
  type: actionTypes.SET_WALLET_ETHEREUM_TOKENS,
  ethereumTokens: tokens,
});

export const setWalletArbitrumTokens = (tokens) => ({
  type: actionTypes.SET_WALLET_ARBITRUM_TOKENS,
  arbitrumTokens: tokens,
});

/**
 * GET WALLET TRANSACTIONS
 * @param {*} chain : ethereum, arbitrum
 * @param {*} network : mainnet
 * @param {*} wallet : wallet address
 * @returns : returns transactions done by the wallet on that chain and network
 */
export const getWalletTransactions = (chain, network, wallet) => {  
  return (dispatch) => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/eth/${chain}/${network}/wallet/${wallet}/transactions`)
    .then((res) => {
      console.log(res.data.transactions);
      if (chain === 'ethereum' && network === 'mainnet')
        dispatch(setWalletEthereumTransactions(res.data.transactions));
      else if (chain === 'arbitrum' && network === 'mainnet')
        dispatch(setWalletArbitrumTransactions(res.data.transactions));
      })
    .catch((error) => console.log(error.message));
  };
};

export const setWalletEthereumTransactions = (transactions) => ({
  type: actionTypes.SET_WALLET_ETHEREUM_TRANSACTIONS,
  ethereumTransactions: transactions
});

export const setWalletArbitrumTransactions = (transactions) => ({
  type: actionTypes.SET_WALLET_ARBITRUM_TRANSACTIONS,
  arbitrumTransactions: transactions
});
