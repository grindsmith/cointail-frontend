import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {
    Card,
} from '@salesforce/design-system-react';
import {
    getWalletTokens,
    getTokenPairs
} from '../../../../../redux/actions';
import { useParams } from "react-router-dom";

const WalletMasterView = (props) => {
    const { wallet } = useParams();

    useEffect(() => {
        if (wallet) {
            props.getWalletTokens(wallet)
        }
    }, []);

    return (
        <div>
            <Card heading="Wallet Holdings" />
            {props.walletTokens.map((token) => {
                return (
                    <Card hasNoHeader>
                        <div key={token.symbol}>{token.name} ({token.symbol}) - {token.walletBalance}</div>
                    </Card>
                )
            })}
        </div>
    )
};

const mapStateToProps = (state) => ({
    walletTokens: state.app.walletTokens,
});
const mapDispatchToProps = (dispatch) => ({
    getWalletTokens: (wallet) =>
        dispatch(getWalletTokens(wallet)),
    getTokenPairs : (symbol) =>
        dispatch(getTokenPairs(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletMasterView);
