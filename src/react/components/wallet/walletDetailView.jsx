import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Card,
  Tabs,
  TabsPanel,
} from '@salesforce/design-system-react';

import {
  getWalletTokens,
  getWalletTransactions,
} from '../../../redux/actions';

import TokenChart from './detailView/unused/tokenChart';
import TokenPairs from './detailView/unused/tokenPairs';
import WalletTransactions from './detailView/wallet/walletTransactions';
import WalletHeader from './detailView/wallet/walletHeader';
import WalletHoldings from './detailView/wallet/walletHoldings';
import WalletToken from './detailView/unused/walletToken';
import TokenStats from './detailView/unused/tokenStats';

function WalletDetailView(props) {
  const { setIsOpen, walletTokens } = props;
  const { wallet } = useParams();
  const [symbol, setSymbol] = useState('');
  const [tokenNumber, setTokenNumber] = useState(0);

  useEffect(() => {
    if (wallet !== undefined) {
      getWalletTransactions(wallet);
      getWalletTokens(wallet);
    }
  }, [props, wallet]);

  return (
    <div className="slds-m-horizontal_small">
      {symbol !== '' ? (
        <div className="slds-grid slds-wrap slds-p-top_small">
          <div className="slds-size_2-of-3">
            <WalletHeader
              setIsOpen={setIsOpen}
            />
            <Tabs variant="scoped" className="slds-m-top_small">
              <TabsPanel label={symbol}>
                <TokenChart symbol={symbol} />
                <TokenPairs
                  symbol={symbol}
                  setSymbol={setSymbol}
                />
              </TabsPanel>
            </Tabs>
          </div>
          <div className="slds-size_1-of-3 slds-p-left_small">
            <Card hasNoHeader>
              <WalletToken
                token={walletTokens[tokenNumber]}
                setSymbol={setSymbol}
              />
            </Card>

            <Tabs variant="scoped" className="slds-m-top_small">
              <TabsPanel label="More Stats">
                <TokenStats
                  token={walletTokens[tokenNumber]}
                />
              </TabsPanel>
              <TabsPanel label="Holdings">
                <WalletHoldings
                  setSymbol={setSymbol}
                  setTokenNumber={setTokenNumber}
                />
              </TabsPanel>
              <TabsPanel label="Transactions">
                <WalletTransactions />
              </TabsPanel>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="slds-grid slds-wrap slds-p-top_small">
          <div className="slds-size_2-of-3 slds-p-right_small">
            <WalletHeader
              setIsOpen={setIsOpen}
            />
            <Tabs variant="scoped" className="slds-m-top_small">
              <TabsPanel label="Ethereum Transactions">
                <WalletTransactions />
              </TabsPanel>
            </Tabs>
          </div>
          <div className="slds-size_1-of-3 slds-p-right_small">
            <Tabs variant="scoped">
              <TabsPanel label="Ethereum Holdings">
                <WalletHoldings
                  setSymbol={setSymbol}
                  setTokenNumber={setTokenNumber}
                />
              </TabsPanel>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}

WalletDetailView.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  walletTokens: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  walletTokens: state.app.walletTokens,
});

const mapDispatchToProps = (dispatch) => ({
  getWalletTokens: (wallet) => dispatch(getWalletTokens(wallet)),
  getWalletTransactions: (wallet) => dispatch(getWalletTransactions(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetailView);
