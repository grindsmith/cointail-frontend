/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from '../actions/types';

const initialState = {
    appWallets: [],
    walletTokens: [],
    walletTransactions: {},
    tokenPairs: [],
};

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
                walletTransactions: {
                    ...state["walletTransactions"],
                    [action.hash]: [...action.transactions]
                }
                
                /*
                [action.hash]: {
                    ...state[action.hash],
                    [action.uniqueId]: {
                        asset: action.asset || '',
                        blockNum: action.blockNum || '',
                        blockTimestamp: action.blockTimestamp || '',
                        hash: action.hash || '',
                        uniqueId: action.uniqueId || '',
                        category: action.category || '',
                        contractAddress: action.contractAddress || '',
                        erc721TokenId: action.erc721TokenId || '',
                        erc1155Metadata: action.erc1155Metadata || '',
                        from: action.from || '',
                        // metadata
                        // rawContract
                        to: action.to || '',
                        tokenId: action.tokenId || '',
                        value: action.value || '',
                    },
                },
                */
            };
        case actionTypes.SET_TOKEN_PAIRS:
            return {
                ...state,
                tokenPairs: [...action.tokenPairs],
            };
        default:
            return state;
    }
}