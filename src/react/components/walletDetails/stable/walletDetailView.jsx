import React, { useState } from "react";
import { connect } from 'react-redux';
import WalletTransactions from "../in-progress/walletTransactions";
import WalletHeader from "../in-progress/walletHeader";
import WalletHoldings from "../in-progress/walletHoldings";
import TokenChart from "../in-progress/tokenChart";
import { 
    Tabs, 
    TabsPanel 
} from "@salesforce/design-system-react";
import TokenPairs from "../in-progress/tokenPairs";
import {
    getTokenPairs
} from "../../../../redux/actions";
import TokenStats from "../in-progress/tokenStats";

const WalletDetailView = (props) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [symbol, setSymbol] = useState('uniswap3eth:wethusdt')

    const setTokenPair = async (type, event) => {
        console.log(type);
        if (type === 'pair') {
            setSymbol('uniswap3eth:' + event.target.dataset.currentAsset + event.target.dataset.quoteAsset);

            await props.getTokenPairs(event.target.dataset.currentAsset + '-' + event.target.dataset.quoteAsset);
    
            setSelectedTab(1);
        } else if (type === 'address') {
            await props.getTokenPairs(event.target.dataset.contractAddress);

            setSelectedTab(1);
        }
        
    }

    return (
        <div className="slds-m-around_small">
            <WalletHeader />
            <WalletHoldings 
                setTokenPair={(e) => setTokenPair('address', e)}
            />
            <div className="slds-grid slds-wrap slds-p-top_small">
                <div className="slds-size_2-of-3">
                    <Tabs variant="scoped" selectedIndex={selectedTab}>
                        <TabsPanel label="Token Pairs">
                            <TokenChart
                                symbol={symbol}
                            />
                            
                        </TabsPanel>
                    </Tabs>
                </div>
                <div className="slds-size_1-of-3 slds-p-horizontal_small">
                    <TokenStats />
                    <TokenPairs 
                        setSymbol={setSymbol}
                    />
                    <Tabs variant="scoped">
                        <TabsPanel label="ERC20 Transactions">
                            <WalletTransactions 
                                filter={'erc20'}
                                setTokenPair={(e) => setTokenPair('pair', e)}
                            />
                        </TabsPanel>
                        {/**  
                        <TabsPanel label="ERC721">
                            <WalletTransactions 
                                filter={'erc721'}
                            />
                        </TabsPanel>
                        */}
                    </Tabs>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    getTokenPairs: (pair) => 
        dispatch(getTokenPairs(pair))
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetailView);