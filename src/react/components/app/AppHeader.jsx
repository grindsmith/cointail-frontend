import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import {
    AppLauncher,
    AppLauncherExpandableSection,
    AppLauncherTile,
    GlobalNavigationBar,
    GlobalNavigationBarLink,
    GlobalNavigationBarRegion,
    
} from '@salesforce/design-system-react';

const Header = () => {
    return (
        <GlobalNavigationBar 
            cloud="marketing"
            theme="light"
            className="header-bar"
        >
            <GlobalNavigationBarRegion region="primary">
                <div className="slds-p-vertical_xx-small slds-p-right_small">
                    <ConnectWallet 
                    accentColor="#fff"
                    colorMode="dark"
                    />
                </div>
            </GlobalNavigationBarRegion>
            <GlobalNavigationBarRegion region="secondary">
                <GlobalNavigationBarLink label="Home" href="/" />
                <GlobalNavigationBarLink label="Wallet" />
            </GlobalNavigationBarRegion>
        </GlobalNavigationBar>
    )
};

export default Header;