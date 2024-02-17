import * as actionTypes from '../../../../src/redux/actions/types';
import Axios from 'axios';

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
    .then((res) => dispatch(setTokenPairs(res.data.pairs)))
    .catch((error) => console.log(error));
  };
};

export const setTokenPairs = (tokenPairs) => ({
    type: actionTypes.SET_TOKEN_PAIRS,
    tokenPairs: tokenPairs,
});