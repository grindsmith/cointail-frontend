import * as actionTypes from './types';
import Axios from 'axios';
import { setAllGroups } from './app.actions';

export const getGroup = (groupId) => {  
  return (dispatch) => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/group/${groupId}`)
    .then((res) => {
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

export const postGroup = (name, description, address) => {  

  return (dispatch) => {
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/group`, {
      'name': name,
      'description': description,
      'address': address
    })
    .then((res) => {
      console.log(res.data);
      dispatch(setAllGroups(res.data.groups))
    })
    .catch((err) => console.log(err));
  };
};