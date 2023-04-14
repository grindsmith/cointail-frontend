import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { 
  IconSettings 
} from '@salesforce/design-system-react';

import { useParams } from "react-router-dom";
import { getWallet } from "../../redux/actions";
import WalletLayout from "../components/page-layout/walletLayout";
import AppHeader from "../components/headers/appHeader";

const Wallet = (props) => {
  const { wallet } = useParams();

  useEffect(() => {
    props.getWallet(wallet);
  },[])

  return (
    <IconSettings iconPath="/icons">
      <AppHeader />
      <div style={{ marginTop: '0px', height: '87vh' }}>
        <WalletLayout 
          wallet={wallet}
        />
      </div>
    </IconSettings>
  )
};

const mapDispatchToProps = (dispatch) => ({
  getWallet: (wallet) => 
    dispatch(getWallet(wallet))
});

export default connect(null, mapDispatchToProps)(Wallet);
