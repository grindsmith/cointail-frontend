import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {
    Button,
    ButtonGroup,
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
            {props.walletTokens.map((token, i) => {
                return (
                    <div 
                        key={i}
                        className="slds-p-top_small"
                    >
                        <Card 
                            key={token.symbol}
                            heading={token.name + " (" + token.symbol + ")"} 
                            bodyClassName="slds-grid slds-truncate"
                            icon={<img src={token.logo ? token.logo : 'https://w7.pngwing.com/pngs/312/613/png-transparent-ethereum-cryptocurrency-blockchain-smart-contract-erc-20-bitcoin-angle-bitcoin-ripple-thumbnail.png'} style={{ height: '25px'}} />}
                            headerActions={
                                <ButtonGroup>
                                    <Button
                                        variant="outline-brand"
                                        label="View"
                                        onClick={(e) => console.log(e)}
                                    />
                                </ButtonGroup>
                            }
                        >
                            <div className="slds-size_1-of-1 slds-p-top_x-small">
                                <div className="slds-align_absolute-center">retrieve token info from dexscreener or another place</div>
                                <div className="slds-align_absolute-center">{token.walletBalance}</div>
                            </div>
                        </Card>
                    </div>
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
