/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from '../actions/types';

const initialState = {
  appWallets: [],
  walletTokens: [],
  walletTransactions: [],
  tokenPairs: [],
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_APP_WALLETS:
      return {
        ...state,
        appWallets: [...action.appWallets],
      };
    case actionTypes.SET_WALLET_TOKENS:
      return {
        ...state,
        walletTokens: [...action.walletTokens],
      };
    case actionTypes.SET_WALLET_TRANSACTIONS:
      return {
        ...state,
        walletTransactions: [...action.walletTransactions],
      };
    case actionTypes.SET_TOKEN_PAIRS:
      return {
        ...state,
        tokenPairs: [...action.tokenPairs],
      };
      /*
        case actionTypes.SET_WALLET_TRANSACTIONS:
            return {
                ...state,
                walletTransactions: {
                    ...state["walletTransactions"],
                    [action.hash]: [...action.transactions]
                }
            };
        */
    default:
      return state;
  }
};
