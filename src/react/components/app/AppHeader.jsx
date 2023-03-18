/* eslint-disable react/prop-types */
import React from 'react';
import { ConnectWallet } from '@thirdweb-dev/react';
import {
  GlobalNavigationBar,
  GlobalNavigationBarLink,
  GlobalNavigationBarRegion,
} from '@salesforce/design-system-react';

function AppHeader() {
  return (
    <div>
      <GlobalNavigationBar
        cloud="marketing"
        theme="light"
        className="header-bar"
      >

        <GlobalNavigationBarRegion region="secondary">
          <GlobalNavigationBarLink label="Home" href="/" />
        </GlobalNavigationBarRegion>
        <GlobalNavigationBarRegion region="tertiary">
          <div className="slds-p-vertical_xx-small slds-p-right_small">
            <ConnectWallet
              accentColor="#fff"
              colorMode="dark"
            />
          </div>
        </GlobalNavigationBarRegion>
      </GlobalNavigationBar>
    </div>
  );
}

export default AppHeader;
