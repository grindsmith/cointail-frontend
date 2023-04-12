import * as actionTypes from './types';
import Axios from 'axios';

export const getGroup = (groupId) => {  
  return (dispatch) => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/group/${groupId}`)
    .then((res) => {
      console.log(res.data);
      dispatch(setGroup(res.data.info, res.data.wallets))
    })
    .catch((err) => console.log(err));
  };
};

export const setGroup = (info, wallets) => ({
  type: actionTypes.SET_GROUP,
  info: info,
  wallets: wallets,
});