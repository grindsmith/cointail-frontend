import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {
    SplitViewListbox,
    SplitViewHeader,
} from '@salesforce/design-system-react';
import {
    getWalletTokens,
    getTokenPairs
} from '../../../redux/actions';
import { useNavigate, useParams } from "react-router-dom";

const WalletMasterView = (props) => {
    const { wallet } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (wallet) {
            props.getWalletTokens(wallet)
        }
    }, []);

    return [
        <SplitViewHeader
            key="1"
            info={props.appWallets.length + ' Wallet(s)'}
            title={'All Wallets'}
            truncate
            variant="object-home"
        />,
        <SplitViewListbox
            key="2"
            labels={{
                header: 'Wallets',
            }}
            options={props.appWallets}
            events={{
                onSelect: async (event, { selectedItems, item }) => {
                    navigate('/wallet/' + item.address);
                },
            }}
            selection={props.selected}
            unread={[]}
        />
    ]
};

const mapStateToProps = (state) => ({
    appWallets: state.app.appWallets,
});
const mapDispatchToProps = (dispatch) => ({
    getWalletTokens: (wallet) =>
        dispatch(getWalletTokens(wallet)),
    getTokenPairs : (symbol) =>
        dispatch(getTokenPairs(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletMasterView);
