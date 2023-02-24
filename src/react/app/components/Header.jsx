import React from "react";
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
                    triggerName="Magic Eden"
                    onSearch={(event) => {
                        console.log('Search term:', event.target.value);
                    }}
                >
                    <AppLauncherExpandableSection title="Tile Section">
                        <AppLauncherTile
                            title="Magic Eden"
                            description="The key to call center and contact center is not to use too many words!"
                            iconText="CC"
                            href="/"
                        />
                    </AppLauncherExpandableSection>
                </AppLauncher>
            </GlobalNavigationBarRegion>
            <GlobalNavigationBarRegion region="secondary">
                <GlobalNavigationBarLink label="Home" href="/" />
                <GlobalNavigationBarLink label="Wallet" />
                <GlobalNavigationBarLink label="Token" />
            </GlobalNavigationBarRegion>
        </GlobalNavigationBar>
    )
};

export default Header;