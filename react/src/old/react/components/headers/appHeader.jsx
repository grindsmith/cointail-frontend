import React, { useEffect } from "react";
import Axios from 'axios';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import {
    GlobalNavigationBar,
    GlobalNavigationBarLink,
    GlobalNavigationBarRegion,
} from '@salesforce/design-system-react';

const AppHeader = () => {
    return (
        <div>
            <GlobalNavigationBar 
                cloud="marketing"
                theme="light"
                className="header-bar"
            >
                
                <GlobalNavigationBarRegion region="secondary">
                    <GlobalNavigationBarLink label="Home" href="/" />
                    <GlobalNavigationBarLink label="Groups" href="/groups" />
                </GlobalNavigationBarRegion>
                <GlobalNavigationBarRegion region="tertiary">
                    <div className="slds-p-vertical_xx-small slds-p-right_small">
                        <ConnectWallet accentColor="#fff"
                            colorMode="dark"
                        />
                    </div>
                </GlobalNavigationBarRegion>
            </GlobalNavigationBar>
        </div>
    )

};

export default AppHeader;