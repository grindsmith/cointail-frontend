import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {
    IconSettings,
    SplitView,
} from '@salesforce/design-system-react';

import Header from "../components/app/appHeader";
import WalletMasterView from "../components/wallet/walletMasterView";
import WalletDetailView from "../components/wallet/walletDetailView";

const WalletDetails = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState([]);

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
                    master={<WalletMasterView selected={selected} setSelected={setSelected} />}
                    detail={<WalletDetailView selected={selected} setSelected={setSelected} />}
                />
            </div>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetails);
