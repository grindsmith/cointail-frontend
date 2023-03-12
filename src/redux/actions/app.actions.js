import * as actionTypes from './types';
import Axios from 'axios';

const BACKEND_URL = "http://localhost:8080";

export const purge = () => ({
  type: actionTypes.PURGE,
});

/*
 * FUNCTIONS WITHOUT REDUX REDUCERS
 */
export const postAppWallet = (info) => {  
  return (dispatch) => {
    Axios.post(BACKEND_URL + '/api/app/wallet', info).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error);
    });
  };
};

export const putAppWallet = (info) => {  
  return (dispatch) => {
    Axios.put(BACKEND_URL + '/api/app/wallet', info).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error);
    });
  };
};

/*
 * FUNCTIONS WITH REDUX REDUCERS
 */
export const getAppWallets = (symbol) => {  
  return (dispatch) => {
    Axios.get(BACKEND_URL + '/api/app/wallets').then((res) => {
      dispatch(setAppWallets(res.data.wallets))
    }).catch((error) => {
      console.log(error);
    });
  };
};

export const setAppWallets = (appWallets) => ({
    type: actionTypes.SET_APP_WALLETS,
    appWallets: appWallets,
});