import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Card } from '@salesforce/design-system-react';
import { useParams } from "react-router-dom";

import TokenChart from "./detailView/tokens/tokenChart";
import TokenPairs from "./detailView/tokens/tokenPairs";
import TokenStats from "./detailView/tokens/tokenStats";
import WalletERC20Transactions from "./detailView/transactions/walletERC20Transactions";
import WalletERC721Transactions from "./detailView/transactions/walletERC721Transactions";
import WalletHeader from "./detailView/transactions/WalletHeader";

import {
    getWalletTransactions,
} from '../../../redux/actions';
import WalletHoldings from "./detailView/transactions/walletHoldings";

const WalletDetailView = (props) => {
    const { wallet } = useParams();
    const [symbol, setSymbol] = useState('');

    useEffect(() => {
        if (wallet !== undefined) {
            props.getWalletTransactions(wallet)
        }
    }, [wallet]);

    useEffect(() => {
        if (wallet !== undefined) {
            props.getWalletTransactions(wallet)
        }
    }, []);

    return (
        <div className="slds-m-around_small">
            <WalletHeader />
            {symbol === '' ? (
                <div className="slds-grid slds-wrap slds-p-top_small">
                    <div className="slds-size_1-of-3">
                        <WalletHoldings />
                    </div>
                    <div className="slds-size_1-of-3 slds-p-horizontal_small">
                        <WalletERC20Transactions />
                    </div>
                    <div className="slds-size_1-of-3">
                        <WalletERC721Transactions />
                    </div>
                </div>
            ): (
                <div className="slds-grid slds-wrap">
                    <Card hasNoHeader className="slds-size_2-of-3 slds-p-around_xx-small">
                        <TokenChart symbol={symbol} />
                    </Card>
                    <div className="slds-size_1-of-3 slds-p-left_small">
                        <TokenPairs symbol={symbol} setSymbol={setSymbol} />
                        <TokenStats />
                    </div>
                </div>
            )}
        </div>
    )
};

const mapStateToProps = (state) => ({
    walletTransactions: state.app.walletTransactions
});
const mapDispatchToProps = (dispatch) => ({
    getWalletTransactions : (wallet) =>
        dispatch(getWalletTransactions(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetailView);