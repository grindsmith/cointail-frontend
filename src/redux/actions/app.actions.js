import * as actionTypes from './types';
import Axios from 'axios';

const BACKEND_URL = "http://localhost:8080";

export const purge = () => ({
  type: actionTypes.PURGE,
});

export const getAppWallets = () => {  
  return (dispatch) => {
    Axios.get(BACKEND_URL + '/api/wallet')
    .then((res) => {
      dispatch(setAppWallets(res.data.wallets))
    })
    .catch((error) => {
        console.log(error);
    });
  };
};

export const postAppWallets = (address) => {
  return () => {
    Axios.post(BACKEND_URL + '/api/wallet', {
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
    Axios.put(BACKEND_URL + '/api/wallet', {
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
export const getTokenPairs = (symbol) => {  
  return (dispatch) => {
        Axios.get(BACKEND_URL + '/api/token/pairs/' + symbol)
        .then((res) => {
            console.log(res.data.tokenPairs);
            dispatch(setTokenPairs(res.data.tokenPairs))
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
export const getWalletTokens = (wallet) => {  
  return (dispatch) => {
      Axios.get(BACKEND_URL + '/api/wallet/' + wallet + '/tokens')
      .then((res) => {
          dispatch(setWalletTokens(res.data.walletTokens));
      })
      .catch((error) => {
          console.log(error);
      });
  };
};

export const setWalletTokens = (walletTokens) => ({
  type: actionTypes.SET_WALLET_TOKENS,
  walletTokens: walletTokens,
});

export const getWalletEthereumTransactions = (wallet) => {  
  return (dispatch) => {
      Axios.get(BACKEND_URL + '/api/wallet/' + wallet + '/transactions/ethereum')
      .then((res) => {
          dispatch(setWalletEthereumTransactions(res.data.ethereumTransactions))
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

export const getWalletArbitrumTransactions = (wallet) => {  
  return (dispatch) => {
      Axios.get(BACKEND_URL + '/api/wallet/' + wallet + '/transactions/arbitrum')
      .then((res) => {
          dispatch(setWalletArbitrumTransactions(res.data.arbitrumTransactions))
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