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
        <GlobalNavigationBar>
            <GlobalNavigationBarRegion region="primary">
                <AppLauncher
                    id="app-launcher-trigger"
                    triggerName="Web3 Sandbox"
                    onSearch={(event) => {
                        console.log('Search term:', event.target.value);
                    }}
                >
                    <AppLauncherExpandableSection title="Tile Section">
                        <AppLauncherTile
                            title="Web3 Sanbox"
                            iconText="CC"
                            href="/"
                        />
                    </AppLauncherExpandableSection>
                </AppLauncher>
            </GlobalNavigationBarRegion>
            <GlobalNavigationBarRegion region="secondary">
                <GlobalNavigationBarLink label="Home" href="/" />
                <GlobalNavigationBarLink label="Wallet" />
            </GlobalNavigationBarRegion>
            <GlobalNavigationBarRegion region="tertiary">
                <ConnectWallet 
                  accentColor="#fff"
                  colorMode="dark"
                />
            </GlobalNavigationBarRegion>
        </GlobalNavigationBar>
    )
};

export default Header;