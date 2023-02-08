import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    IconSettings,
} from '@salesforce/design-system-react';

import {
    getWallet,
 } from '../../redux/actions';

import Header from "../components/App/Header";
import User from "../components/Wallet/User";
import Tokens from "../components/Wallet/Tokens";
import Activities from "../components/Wallet/Activites";
import OffersMade from "../components/Wallet/OffersMade";
import OffersRecieved from "../components/Wallet/OffersRecieved";
import EscrowBalance from "../components/Wallet/EscrowBalance";

const Wallet = (props) => {
    let { wallet } = useParams();

    useEffect(() => {
        props.getWallet(wallet)
    }, []);

    return (
        <IconSettings iconPath="/icons">
            <Header />

            <div className="slds-grid slds-wrap slds-p-horizontal_small" style={{ marginTop: '30px'}}>
                <div className="slds-size_1-of-5">
                    <User wallet={props.wallet.wallet_info} />
                    <Activities activities={props.wallet.walletActivities?.splice(0, 25) || []} /> 
                </div>
                <div className="slds-size_3-of-5 slds-p-horizontal_x-small">
                    <Tokens tokens={props.wallet.walletTokens || []} />
                </div>
                <div className="slds-size_1-of-5 slds-p-horizontal_x-small">
                    <OffersMade offersMade={props.wallet.walletOffersMade || []} />
                    <OffersRecieved offersRecieved={props.wallet.walletOffersRecieved || []} />
                    <EscrowBalance escrowBalance={props.wallet.walletEscrowBalance || []} />
                </div>
            </div>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({
    wallet: state.magicEden.wallet,
});

const mapDispatchToProps = (dispatch) => ({
    getWallet: (wallet) => dispatch(getWallet(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);