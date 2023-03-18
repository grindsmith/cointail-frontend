import React, { useState } from 'react';
import {
  IconSettings,
  SplitView,
} from '@salesforce/design-system-react';

import Header from '../components/app/AppHeader';
import WalletMasterView from '../components/wallet/walletMasterView';
// import WalletDetailView from '../components/wallet/walletDetailView';

function WalletDetails() {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState([]);

  return (
    <IconSettings iconPath="/asset/icons">
      <Header />
      <div style={{ marginTop: '0px', height: '88vh' }}>
        <SplitView
          events={{
            onClose: () => setIsOpen(false),
            onOpen: () => setIsOpen(true),
          }}
          id="base-example"
          isOpen={isOpen}
          master={<WalletMasterView selected={selected} setSelected={setSelected} />}
          detail={(<div>hey</div>)}
        />
      </div>
    </IconSettings>
  );
}

export default WalletDetails;
