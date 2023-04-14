import Axios from 'axios';
import moment from 'moment';
import * as actionTypes from './types';

export const purge = () => ({
  type: actionTypes.PURGE,
});

export const getSolanaInfo = () => {  
  return (dispatch) => {
    Axios.get('http://localhost:8080/api/solana').then((res) => {
      console.log(res.data)
      dispatch(setSolanaInfo(res.data));
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const getCollections = () => {
  return (dispatch) => {
    Axios.get('http://localhost:8080/api/magic-eden').then((res) => {
      dispatch(setCollections(res.data.collections));
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const getCollection = (symbol) => {
  return (dispatch) => {
    Axios.get('http://localhost:8080/api/magic-eden/collection/' + symbol).then((result) => {
      console.log(result.data)

      setCollectionListings(result.data.listings)

      let tmp = [];
      for (const i in result.data.activities) {
          let tmp2 = result.data.activities[i];
          tmp2['date'] = moment(result.data.activities[i].blockTime * 1000).format('L');
          tmp.push(tmp2);
      }

      dispatch(setCollectionActivities(tmp));
    }).catch((err) => {
        console.error(err.message);
    })
  }
}

export const getWallet = (wallet) => {
  return (dispatch) => {
      try {
          Axios.get('http://localhost:8080/api/magic-eden/wallet/' + wallet).then((res) => {
              dispatch(setWallet(res.data));
          });
      } catch (err) {
          console.error(err);
      }
  }
}

export const setSolanaInfo = (solanaInfo) => ({
  type: actionTypes.SET_SOLANA_INFO,
  solanaInfo: solanaInfo,
});

export const setCollections = (collections) => ({
  type: actionTypes.SET_COLLECTIONS,
  collections: collections,
});

export const setActiveCollectionId = (collectionId) => ({
  type: actionTypes.SET_ACTIVE_COLLECTION_ID,
  collectionId: collectionId,
});

export const setCollectionListings = (collectionListings) => ({
  type: actionTypes.SET_COLLECTION_LISTINGS,
  collectionListings: collectionListings,
});

export const setCollectionActivities = (collectionActivities) => ({
  type: actionTypes.SET_COLLECTION_ACTIVITIES,
  collectionActivities: collectionActivities,
});

export const setWallet = (wallet) => ({
  type: actionTypes.SET_WALLET,
  wallet: wallet,
});