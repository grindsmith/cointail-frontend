import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { 
    Card,
    DataTable,
    DataTableColumn,
    Tabs,
    TabsPanel
} from '@salesforce/design-system-react';

import WalletTransactions from "./walletTransactions";
import WalletHeader from "./walletHeader";
import WalletHoldings from "./walletHoldings";
import WalletLinkCell from "./walletLinkCell";

import {
    getWallet,
    getWalletTokens,
    getWalletTransactions,
} from '../../../redux/actions';
import WalletGroups from "./walletGroups";

const WalletDetailView = (props) => {
    const { wallet } = props;

    useEffect(() => {
        if (wallet !== undefined) {
            props.getWallet(wallet);
            props.getWalletTransactions('ethereum', 'mainnet', wallet);
            props.getWalletTransactions('arbitrum', 'mainnet', wallet);
            props.getWalletTokens('ethereum', 'mainnet', wallet);
            props.getWalletTokens('arbitrum', 'mainnet', wallet);
        }
    }, [wallet]);

    return (
        <div className="slds-m-horizontal_small">
            <div className="slds-grid slds-wrap slds-p-top_small">
                <div className="slds-size_1-of-1 slds-m-bottom_small">
                    <WalletHeader 
                        setIsOpen={props.setIsOpen}
                    />
                </div>
                <div className="slds-size_2-of-3 slds-p-right_small">
                    <Card hasNoHeader>
                        <Tabs className="slds-truncate">
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
                            <TabsPanel label="Arbitrum Holdings">
                                <WalletHoldings 
                                    tokens={props.walletArbitrumTokens}
                                />
                            </TabsPanel>
                            <TabsPanel label="Ethereum Holdings" >
                                <WalletHoldings 
                                    tokens={props.walletEthereumTokens}
                                />
                            </TabsPanel>
                        </Tabs>
                    </Card>
                </div>
                <div className="slds-size_1-of-3">
                    <Card heading="Groups">
                        <WalletGroups
                            wallet={wallet}
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    walletGroups: state.wallet.groups,
    walletEthereumTokens: state.wallet.ethereumTokens,
    walletArbitrumTokens: state.wallet.arbitrumTokens,
    walletEthereumTransactions: state.wallet.ethereumTransactions,
    walletArbitrumTransactions: state.wallet.arbitrumTransactions
});
const mapDispatchToProps = (dispatch) => ({
    getWallet: (address) => 
        dispatch(getWallet(address)),
    getWalletTokens : (chain, network, wallet) =>
        dispatch(getWalletTokens(chain, network, wallet)),
    getWalletTransactions : (chain, network, wallet) =>
        dispatch(getWalletTransactions(chain, network, wallet))
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetailView);