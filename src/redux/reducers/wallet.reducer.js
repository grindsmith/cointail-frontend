/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from '../actions/types';

const initialState = {
  info: {},
  groups: [],
  ethereumTokens: [],
  ethereumTransactions: [],
  arbitrumTokens: [],
  arbitrumTransactions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_WALLET:
    return {
      ...state,
      info: {
        name: action.info.name,
        chain: action.info.chain,
        address: action.info.address,
      },
      groups: [...action.groups],
    };
  case actionTypes.SET_WALLET_ETHEREUM_TOKENS:
    return {
      ...state,
      ethereumTokens: [...action.ethereumTokens],
    };
  case actionTypes.SET_WALLET_ARBITRUM_TOKENS:
    return {
      ...state,
      arbitrumTokens: [...action.arbitrumTokens],
    };
  case actionTypes.SET_WALLET_ETHEREUM_TRANSACTIONS:
    return {
      ...state,
      ethereumTransactions: [...action.ethereumTransactions],
    };  
  case actionTypes.SET_WALLET_ARBITRUM_TRANSACTIONS:
    return {
      ...state,
      arbitrumTransactions: [...action.arbitrumTransactions],
    };   
  default:
    return state;
  }
}