import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { 
    Button,
    Card,
    MediaObject
} from '@salesforce/design-system-react';
import { getWalletTokens } from "../../../../redux/actions";
import { useParams } from "react-router";

const WalletHoldings = (props) => {
    const { wallet } = useParams();

    useEffect(() => {
        if (wallet !== undefined) {
            props.getWalletTokens(wallet);
        }
    }, []);

    const filterTokens = (tokens) => {
        console.log(tokens);

        return true;
    }

    return (
        <div className="slds-grid slds-wrap slds-p-top_small">
            {props.walletTokens
            .filter((token) => filterTokens(token))
            .map((token, i) => {
                console.log(token);
                return (
                    <MediaObject 
                        key={i} 
                        className="slds-size_1-of-4 slds-m-right_small"
                        verticalCenter
                        style={{
                            backgroundColor: 'white !important'
                        }}
                        body={
                            <div className="slds-grid slds-wrap slds-p-vertical_x-small" style={{ borderTop: '1px solid #ddd'}}>
                                <div className="slds-size_1-of-5">

                                </div>
                                <div className="slds-size_2-of-5">
                                    <div><strong>{token.name}</strong></div>
                                    <div className="slds-text-title_caps">{token.symbol}</div>
                                </div>
                                <div className="slds-size_2-of-5">{token.walletBalance}</div>
                            </div>
                        }
                    />
                )
            })}
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    getWalletTokens: (wallet) => 
        dispatch(getWalletTokens(wallet))
});
const mapStateToProps = (state) => ({
    walletTokens: state.app.walletTokens,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletHoldings);
