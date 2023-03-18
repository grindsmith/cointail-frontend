import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import {
  Button,
  Card,
  IconSettings,
} from '@salesforce/design-system-react';
import {
  purge,
  postAppWallets,
} from '../../redux/actions';
import TokenCategories from '../components/home/tokenCategories';

function Home(props) {
  const address = useAddress();
  const navigate = useNavigate();

  const launchApp = async () => {
    if (address !== undefined) {
      await postAppWallets(address);

      navigate(`/wallet/${address}`);
    }
  };

  useEffect(() => {
    purge();
  }, [props]);

  return (
    <IconSettings iconPath="/icons">
      <div className="slds-grid">
        <div
          style={{ minHeight: '94vh', backgroundColor: 'white' }}
          className="slds-size_1-of-2 slds-align_absolute-center"
        >
          <Card
            hasNoHeader
            className="slds-grid"
            bodyClassName="slds-p-horizontal_small slds-p-top_small"
          >
            <ConnectWallet
              accentColor="#fff"
              colorMode="dark"
              className="slds-size_1-of-1"
            />
            <Button
              label="Launch App"
              variant="brand"
              className="slds-size_1-of-1 slds-m-top_small"
              onClick={launchApp}
            />
          </Card>
        </div>

        <div
          className="slds-size_1-of-2 slds-align_absolute-center"
        >
          <Card
            heading="CoinMarketCap Categories"
            className="slds-m-horizontal_xx-large"
            bodyClassName="token-category-card"
          >
            <TokenCategories />
          </Card>
        </div>
      </div>
    </IconSettings>
  );
}

const mapDispatchToProps = (dispatch) => ({
  purge: () => dispatch(purge()),
  postAppWallets: (wallet) => dispatch(postAppWallets(wallet)),
});

export default connect(null, mapDispatchToProps)(Home);
