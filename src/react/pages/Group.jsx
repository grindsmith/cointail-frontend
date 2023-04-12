import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import {
    IconSettings,
    SplitView,
} from '@salesforce/design-system-react';

import Header from "../components/app/appHeader";
import GroupSplitView from "../components/group/groupSplitView";
import WalletView from "../components/wallet/walletView";

import { getGroup } from "../../redux/actions";

const Group = (props) => {
    const { wallet, groupId } = useParams();

    const [isOpen, setIsOpen] = useState(true);
    const [activeWallet, setActiveWallet] = useState('');
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setActiveWallet(wallet);
        props.getGroup(groupId);
    }, []);

    return (
        <IconSettings iconPath="/assets/icons">
            <Header />
            <div style={{ marginTop: '0px', height: '87vh' }}>
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
                        <WalletView 
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
        dispatch(getGroup(groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
