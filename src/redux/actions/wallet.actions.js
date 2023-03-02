import Axios from 'axios';
import * as actionTypes from './types';

const BACKEND_URL = "http://localhost:8080";

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

export const getWalletTransactions = (wallet) => {  
    return (dispatch) => {
        Axios.get(BACKEND_URL + '/api/wallet/' + wallet + '/transactions')
        .then((res) => {
            // console.log(res.data.txMatches);
            Object.keys(res.data.txMatches).forEach((tx) => {
                dispatch(setWalletTransactions(tx, res.data.txMatches[tx]));
            });
            /*
            for (let i = 0; i < 1; i++) {
                dispatch(setWalletTransactions(res.data.walletTransactions[i]))
            }
            */
        })
        .catch((error) => {
            console.log(error.message);
        });
    };
};

export const setWalletTransactions = (hash, transactions) => ({
    type: actionTypes.SET_WALLET_TRANSACTIONS,
    hash: hash,
    transactions: transactions
});
