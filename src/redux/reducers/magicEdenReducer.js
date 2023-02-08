/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from '../actions/types';

const initialState = {
  collections: {},
  activeCollectionId: '',
  collectionActivities: [],
  collectionListings: [],
  wallet: {},
  solanaInfo: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COLLECTIONS:
      return {
        ...state,
        collections: action.collections,
      };
    case actionTypes.SET_ACTIVE_COLLECTION_ID:
      return {
        ...state,
        activeCollectionId: action.collectionId,
      };
    case actionTypes.SET_COLLECTION_ACTIVITIES:
      return {
        ...state,
        collectionActivities: [...action.collectionActivities],
      };
    case actionTypes.SET_COLLECTION_LISTINGS:
      return {
        ...state,
        collectionListings: [...action.collectionListings],
      };
    case actionTypes.SET_WALLET:
      return {
          ...state,
          wallet: action.wallet,
      };    
    case actionTypes.SET_SOLANA_INFO:
      return {
          ...state,
          solanaInfo: action.solanaInfo,
      };      
    default:
      return state;
  }
};
