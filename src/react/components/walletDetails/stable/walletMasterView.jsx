import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { getAppWallets } from '../../../../redux/actions';
import { useNavigate } from "react-router-dom";
import {
    SplitViewListbox,
    SplitViewHeader,
} from '@salesforce/design-system-react';

const WalletMasterView = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        props.getAppWallets();
    }, [])

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
    getAppWallets: () => 
        dispatch(getAppWallets())
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletMasterView);
