import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";

import {
    IconSettings,
    SplitView,
} from '@salesforce/design-system-react';

import {
    getWalletTransactions,
} from '../../redux/actions';

import Header from "../components/app/appHeader";
import WalletMasterView from "../components/walletDetails/stable/walletMasterView";
import WalletDetailView from "../components/walletDetails/stable/walletDetailView";

const WalletDetails = (props) => {
    const { wallet } = useParams();
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (wallet !== undefined) {
            props.getWalletTransactions(wallet)
        }
    }, [wallet]);

    return (
        <IconSettings iconPath="/icons">
            <Header />
            <div style={{ marginTop: '0px', height: '93vh' }}>
                <SplitView
                    events={{
                        onClose: () => setIsOpen(false),
                        onOpen: () => setIsOpen(true),
                    }}
                    id="base-example"
                    isOpen={isOpen}
                    master={<WalletMasterView />}
                    detail={<WalletDetailView />}
                />
            </div>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    getWalletTransactions : (wallet) =>
        dispatch(getWalletTransactions(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetails);
