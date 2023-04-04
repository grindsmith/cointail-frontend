import * as actionTypes from './types';
import Axios from 'axios';

export const purge = () => ({
  type: actionTypes.PURGE,
});

export const getAppWallets = () => {  
  return (dispatch) => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/user')
    .then((res) => {
      console.log(res.data)
      dispatch(setAppWallets(res.data.users))
    })
    .catch((error) => {
        console.log(error);
    });
  };
};

export const postAppWallets = (address) => {
  return () => {
    Axios.post(process.env.REACT_APP_BACKEND_URL + '/api/user', {
      'address': address
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    });
  };
}

export const putAppWallets = (address, name) => {
  return () => {
    Axios.put(process.env.REACT_APP_BACKEND_URL + '/api/user', {
      'wallet': address,
      'name': name
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    });
  };
}

export const setAppWallets = (appWallets) => ({
    type: actionTypes.SET_APP_WALLETS,
    appWallets: appWallets,
});

/**
 * 
 *
 *  TOKEN FUNCTIONS 
 * 
 * 
 */
export const getTokenPairs = (contractAddress) => {  
  return (dispatch) => {
        Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/ethereum/token/pairs/' + contractAddress)
        .then((res) => {
            dispatch(setTokenPairs(res.data.pairs))
        })
        .catch((error) => {
            console.log(error);
        });
  };
};

export const setTokenPairs = (tokenPairs) => ({
    type: actionTypes.SET_TOKEN_PAIRS,
    tokenPairs: tokenPairs,
});

/**
 * 
 *
 *  WALLET FUNCTIONS 
 * 
 * 
 */
export const getWalletEthereumTokens = (account) => {  
  return (dispatch) => {
      Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/ethereum/account/' + account + '/tokens')
      .then((res) => {
          dispatch(setWalletEthereumTokens(res.data.tokens));
      })
      .catch((error) => {
          console.log(error);
      });
  };
};

export const setWalletEthereumTokens = (walletEthereumTokens) => ({
  type: actionTypes.SET_WALLET_ETHEREUM_TOKENS,
  walletEthereumTokens: walletEthereumTokens,
});

export const getWalletArbitrumTokens = (account) => {  
  return (dispatch) => {
      Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/arbitrum/account/' + account + '/tokens')
      .then((res) => {
          dispatch(setWalletArbitrumTokens(res.data.tokens));
      })
      .catch((error) => {
          console.log(error);
      });
  };
};

export const setWalletArbitrumTokens = (walletArbitrumTokens) => ({
  type: actionTypes.SET_WALLET_ARBITRUM_TOKENS,
  walletArbitrumTokens: walletArbitrumTokens,
});

export const getWalletEthereumTransactions = (account) => {  
  return (dispatch) => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/ethereum/account/' + account + '/transactions')
    .then((res) => {
          dispatch(setWalletEthereumTransactions(res.data.transactions))
      })
      .catch((error) => {
          console.log(error.message);
      });
  };
};

export const setWalletEthereumTransactions = (walletEthereumTransactions) => ({
  type: actionTypes.SET_WALLET_ETHEREUM_TRANSACTIONS,
  walletEthereumTransactions: walletEthereumTransactions
});

export const getWalletArbitrumTransactions = (account) => {  
  return (dispatch) => {
      Axios.get(process.env.REACT_APP_BACKEND_URL + '/api/arbitrum/account/' + account + '/transactions')
      .then((res) => {
          dispatch(setWalletArbitrumTransactions(res.data.transactions))
      })
      .catch((error) => {
          console.log(error.message);
      });
  };
};

export const setWalletArbitrumTransactions = (walletArbitrumTransactions) => ({
  type: actionTypes.SET_WALLET_ARBITRUM_TRANSACTIONS,
  walletArbitrumTransactions: walletArbitrumTransactions
});