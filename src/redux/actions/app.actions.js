import * as actionTypes from './types';
import Axios from 'axios';

const BACKEND_URL = "http://localhost:8080";

export const purge = () => ({
  type: actionTypes.PURGE,
});

export const getAppWallets = (symbol) => {  
  return (dispatch) => {
        Axios.get(BACKEND_URL + '/api/app/wallets')
        .then((res) => {
          console.log(res.data)
          dispatch(setAppWallets(res.data.wallets))
        })
        .catch((error) => {
            console.log(error);
        });
  };
};

export const setAppWallets = (appWallets) => ({
    type: actionTypes.SET_APP_WALLETS,
    appWallets: appWallets,
});