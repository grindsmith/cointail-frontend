import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { 
    Card,
    Tabs,
    TabsPanel
} from '@salesforce/design-system-react';
import { useParams } from "react-router-dom";

import TokenChart from "./detailView/tokens/tokenChart";
import TokenPairs from "./detailView/tokens/tokenPairs";
import TokenStats from "./detailView/tokens/tokenStats";
import WalletTransactions from "./detailView/transactions/walletTransactions";
import WalletHeader from "./detailView/transactions/walletHeader";

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
                    <div className="slds-size_1-of-4 slds-p-right_small">
                        <Tabs variant="scoped">
                            <TabsPanel label="Holdings">
                                <WalletHoldings />
                            </TabsPanel>
                            <TabsPanel label="Transactions">
                                <WalletTransactions />
                            </TabsPanel>
                        </Tabs>
                    </div>
                    <Card hasNoHeader className="slds-size_2-of-4 slds-p-around_xx-small">
                        <TokenChart symbol={symbol} />
                    </Card>
                    <div className="slds-size_1-of-4 slds-p-left_small">
                        <TokenStats />
                        <TokenPairs symbol={symbol} setSymbol={setSymbol} />
                    </div>
                </div>
            ): (
                <div className="slds-grid slds-wrap">
                    
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