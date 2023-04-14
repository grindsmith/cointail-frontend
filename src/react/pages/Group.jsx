import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import {
    IconSettings,
    SplitView,
} from '@salesforce/design-system-react';

import AppHeader from "../components/headers/appHeader";
import GroupSplitView from "../components/split-view/groupSplitView";
import WalletLayout from "../components/page-layout/walletLayout";

import { getGroup } from "../../redux/actions";

const Group = (props) => {
    const { wallet, groupId } = useParams();

    const [isOpen, setIsOpen] = useState(true);
    const [activeWallet, setActiveWallet] = useState('');

    useEffect(() => {
        setActiveWallet(wallet);
        props.getGroup(groupId);
    }, []);

    return (
        <IconSettings iconPath="/assets/icons">
            <AppHeader />
            <div style={{ marginTop: '0px', height: '100vh' }}>
                <SplitView
                    events={{
                        onClose: () => setIsOpen(false),
                        onOpen: () => setIsOpen(true),
                    }}
                    id="base-example"
                    isOpen={isOpen}
                    master={
                        <GroupSplitView 
                            activeWallet={activeWallet}
                            setActiveWallet={setActiveWallet}
                        />
                    }
                    detail={
                        <WalletLayout 
                            wallet={activeWallet}
                            setIsOpen={setIsOpen}
                        />
                    }
                />
            </div>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    getGroup: (groupId) => 
        dispatch(getGroup(groupId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
