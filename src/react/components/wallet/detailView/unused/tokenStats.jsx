import React from 'react';
import WalletTokenStatsBox from './walletTokenStatsBox';

const TokenStats = (props) => {
    console.log(props.token)
    return (
        <div className="slds-grid">
                <div className="slds-size_2-of-6"> 
                    <WalletTokenStatsBox
                        label={'Price'}
                        stat={'$' + (parseFloat(props.token.stats?.priceUsd)).toFixed(2)}
                        unit={''}
                    />
                </div> 
                <div className="slds-size_1-of-6">
                    <WalletTokenStatsBox
                        label={'5M'}
                        stat={props.token.stats?.priceChange.m5}
                        unit={'%'}
                    />
                </div>
                <div className="slds-size_1-of-6">
                    <WalletTokenStatsBox
                        label={'1HR'}
                        stat={props.token.stats?.priceChange.h1}
                        unit={'%'}
                    />
                </div>
                <div className="slds-size_1-of-6">
                    <WalletTokenStatsBox
                        label={'6HR'}
                        stat={props.token.stats?.priceChange.h6}
                        unit={'%'}
                    />
                </div>
                <div className="slds-size_1-of-6">
                    <WalletTokenStatsBox
                        label={'24HR'}
                        stat={props.token.stats?.priceChange.h24}
                        unit={'%'}
                    />
                </div>                       
            </div>
    );
}

export default TokenStats;