import Axios from 'axios';
import * as actionTypes from './types';

const BACKEND_URL = "http://localhost:8080";

export const getTokenPairs = (query) => {  
  return (dispatch) => Axios.get(BACKEND_URL + '/api/token-pairs/' + query).then((res) => dispatch(setTokenPairs(res.data.tokenPairs)));
};

export const setTokenPairs = (tokenPairs) => ({
    type: actionTypes.SET_TOKEN_PAIRS,
    tokenPairs: tokenPairs,
});