/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useAddress } from '@thirdweb-dev/react';
import {
  Button,
  PageHeaderControl,
  PageHeader,
  ButtonGroup,
  Input,
  Modal,
} from '@salesforce/design-system-react';
import { useParams } from 'react-router-dom';
import { putAppWallets } from '../../../../../redux/actions';

function WalletHeader(props) {
  const { appWallets, walletTokens } = props;

  const address = useAddress();
  const { wallet } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  const headerActions = () => {
    if (address === wallet) {
      return (
        <PageHeaderControl>
          <ButtonGroup>
            <Button
              label="Edit Wallet"
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </ButtonGroup>
        </PageHeaderControl>
      );
    }
    return null;
  };

  return (
    <div>
      <PageHeader
        details={[
          {
            label: '# of Tokens',
            // eslint-disable-next-line react/prop-types
            content: walletTokens?.filter((tx) => tx.walletBalance > 0).length || 0,
          },
        ]}
        label={`0x${wallet.substr(wallet.length - 6)}`}
        // eslint-disable-next-line react/prop-types
        title={appWallets?.find((el) => el.address === wallet)?.name}
        variant="record-home"
        style={{
          backgroundColor: '#fff !important',
        }}
        onRenderActions={headerActions}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        heading="Edit Wallet Details"
        footer={[
          <Button
            key={1}
            label="Cancel"
            onClick={() => setIsOpen(false)}
          />,
          <Button
            key={2}
            label="Save"
            variant="brand"
            onClick={async () => {
              await putAppWallets(wallet, name);
              await setIsOpen(false);
            }}
          />,
        ]}
      >
        <div className="slds-p-around_small">
          <Input
            label="Wallet Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}

WalletHeader.defaultProps = {
  appWallets: [],
  walletTokens: [],
};

WalletHeader.propTypes = {
  appWallets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    address: PropTypes.string,
    name: PropTypes.string,
    chain: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    key: PropTypes.string,
    label: PropTypes.string,
    bottomLeftText: PropTypes.string,
    topRightText: PropTypes.string,
  })),
  walletTokens: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    contractAddress: PropTypes.string,
    walletBalance: PropTypes.number,
    decimals: PropTypes.number,
    logo: PropTypes.string,
    name: PropTypes.string,
    symbol: PropTypes.string,
    priceUSD: PropTypes.number,
    priceChange1hr: PropTypes.string,
    priceChange24hr: PropTypes.string,
    url: PropTypes.string,
  })),
};

const mapStateToProps = (state) => ({
  walletTokens: state.app.walletTokens,
  appWallets: state.app.appWallets,
});

const mapDispatchToProps = (dispatch) => ({
  putAppWallets: (wallet, name) => dispatch(putAppWallets(wallet, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletHeader);
