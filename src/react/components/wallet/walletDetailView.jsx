import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { 
    Tabs,
    TabsPanel
} from '@salesforce/design-system-react';
import { useParams } from "react-router-dom";

import WalletTransactions from "./page/walletTransactions";
import WalletHeader from "./page/walletHeader";
import WalletHoldings from "./page/walletHoldings";

import {
    getWalletEthereumTokens,
    getWalletArbitrumTokens,
    getWalletEthereumTransactions,
    getWalletArbitrumTransactions
} from '../../../redux/actions';

const WalletDetailView = (props) => {
    const { wallet } = useParams();

    useEffect(() => {
        if (wallet !== undefined) {
            props.getWalletEthereumTransactions(wallet);
            props.getWalletArbitrumTransactions(wallet);
            props.getWalletEthereumTokens(wallet);
            props.getWalletArbitrumTokens(wallet);
        }
    }, [wallet]);

    return (
        <div className="slds-m-horizontal_small">
            <div className="slds-grid slds-wrap slds-p-top_small">
                <div className="slds-size_2-of-3 slds-p-right_small">
                    <WalletHeader 
                        setIsOpen={props.setIsOpen}
                    />
                    <Tabs variant="scoped" className="slds-m-top_small">
                        <TabsPanel label="Arbitrum Transfers">
                            <WalletTransactions 
                                chain="arbitrum"
                                transactions={props.walletArbitrumTransactions}
                            />
                        </TabsPanel>
                        <TabsPanel label="Ethereum Transfers">
                            <WalletTransactions 
                                chain="ethereum"
                                transactions={props.walletEthereumTransactions}
                            />
                        </TabsPanel>
                    </Tabs>
                </div>
                <div className="slds-size_1-of-3 slds-p-right_small">
                    <Tabs variant="scoped">
                        <TabsPanel label="Arbitrum Holdings">
                            <WalletHoldings 
                                tokens={props.walletArbitrumTokens}
                            />
                        </TabsPanel>
                        <TabsPanel label="Ethereum Holdings">
                            <WalletHoldings 
                                tokens={props.walletEthereumTokens}
                            />
                        </TabsPanel>
                    </Tabs>
                </div>
                
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    walletEthereumTokens: state.app.walletEthereumTokens,
    walletArbitrumTokens: state.app.walletArbitrumTokens,
    walletEthereumTransactions: state.app.walletEthereumTransactions,
    walletArbitrumTransactions: state.app.walletArbitrumTransactions
});
const mapDispatchToProps = (dispatch) => ({
    getWalletEthereumTokens : (wallet) =>
        dispatch(getWalletEthereumTokens(wallet)),
    getWalletArbitrumTokens : (wallet) =>
        dispatch(getWalletArbitrumTokens(wallet)),
    getWalletEthereumTransactions : (wallet) =>
        dispatch(getWalletEthereumTransactions(wallet)),
    getWalletArbitrumTransactions : (wallet) =>
        dispatch(getWalletArbitrumTransactions(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetailView);