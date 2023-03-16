import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { 
    Card,
    Tabs,
    TabsPanel
} from '@salesforce/design-system-react';
import { useParams } from "react-router-dom";

import TokenChart from "./detailView/unused/tokenChart";
import TokenPairs from "./detailView/unused/tokenPairs";
import WalletTransactions from "./detailView/wallet/walletTransactions";
import WalletHeader from "./detailView/wallet/walletHeader";

import {
    getWalletTokens,
    getWalletEthereumTransactions,
    getTokenPairs
} from '../../../redux/actions';
import WalletHoldings from "./detailView/wallet/walletHoldings";
import WalletToken from "./detailView/unused/walletToken";
import TokenStats from "./detailView/unused/tokenStats";

const WalletDetailView = (props) => {
    const { wallet } = useParams();
    const [symbol, setSymbol] = useState('');
    const [tokenNumber, setTokenNumber] = useState(0);

    useEffect(() => {
        if (wallet !== undefined) {
            props.getWalletEthereumTransactions(wallet);
            props.getWalletTokens(wallet);
        }
    }, [wallet]);

    return (
        <div className="slds-m-horizontal_small">
            {symbol !== '' ? (
                <div className="slds-grid slds-wrap slds-p-top_small">
                    <div className="slds-size_2-of-3">
                        <WalletHeader 
                            setIsOpen={props.setIsOpen}
                        />
                        <Tabs variant="scoped" className="slds-m-top_small">
                            <TabsPanel label={symbol}>
                                <TokenChart symbol={symbol} />
                                <TokenPairs 
                                    symbol={symbol} 
                                    setSymbol={setSymbol} 
                                />
                            </TabsPanel>
                        </Tabs>
                    </div>
                    <div className="slds-size_1-of-3 slds-p-left_small">
                        <Card hasNoHeader>
                            <WalletToken
                                token={props.walletTokens[tokenNumber]}
                                setSymbol={setSymbol} 
                            />
                        </Card>

                        <Tabs variant="scoped" className="slds-m-top_small">
                            <TabsPanel label={"More Stats"}>
                                <TokenStats
                                    token={props.walletTokens[tokenNumber]}
                                />
                            </TabsPanel>
                            <TabsPanel label="Holdings">
                                <WalletHoldings 
                                    setSymbol={setSymbol}
                                    setTokenNumber={setTokenNumber}
                                />
                            </TabsPanel>
                            <TabsPanel label="Transactions">
                                <WalletTransactions />
                            </TabsPanel>
                        </Tabs>
                    </div>
                    
                </div>
            ) : (
                <div className="slds-grid slds-wrap slds-p-top_small">
                    <div className="slds-size_2-of-3 slds-p-right_small">
                        <WalletHeader 
                            setIsOpen={props.setIsOpen}
                        />
                        <Tabs variant="scoped" className="slds-m-top_small">
                            <TabsPanel label="Ethereum Transactions">
                                <WalletTransactions />
                            </TabsPanel>
                        </Tabs>
                    </div>
                    <div className="slds-size_1-of-3 slds-p-right_small">
                        <Tabs variant="scoped">
                            <TabsPanel label="Ethereum Holdings">
                                <WalletHoldings 
                                    setSymbol={setSymbol}
                                    setTokenNumber={setTokenNumber}
                                />
                            </TabsPanel>
                        </Tabs>
                    </div>
                    
                </div>
            )}
        </div>
    )
};

const mapStateToProps = (state) => ({
    walletTokens: state.app.walletTokens,
});
const mapDispatchToProps = (dispatch) => ({
    getWalletTokens : (wallet) =>
        dispatch(getWalletTokens(wallet)),
    getWalletEthereumTransactions : (wallet) =>
        dispatch(getWalletEthereumTransactions(wallet)),
     getTokenPairs : (symbol) =>
        dispatch(getTokenPairs(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetailView);