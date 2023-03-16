import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {
    SplitViewListbox,
} from '@salesforce/design-system-react';
import {
    getAppWallets
} from "../../../redux/actions";
import { 
    useNavigate, 
} from "react-router-dom";

const WalletMasterView = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        props.getAppWallets()
    }, []);

    return [
        <SplitViewListbox
            key="2"
            labels={{
                header: props.appWallets.length + ' Wallet(s)',
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
    getAppWallets: () => 
        dispatch(getAppWallets())
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletMasterView);
