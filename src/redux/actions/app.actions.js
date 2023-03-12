import * as actionTypes from './types';
import Axios from 'axios';

const BACKEND_URL = "http://localhost:8080";

export const purge = () => ({
  type: actionTypes.PURGE,
});

export const getAppWallets = () => {  
  return (dispatch) => {
    Axios.get(BACKEND_URL + '/api/app/wallets')
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
    Axios.post(BACKEND_URL + '/api/app/wallets', {
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

export const setAppWallets = (appWallets) => ({
    type: actionTypes.SET_APP_WALLETS,
    appWallets: appWallets,
});