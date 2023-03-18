import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion, AccordionPanel, Button, ButtonGroup, Card,
} from '@salesforce/design-system-react';
import WalletTokenStatsBox from './walletTokenStatsBox';

function WalletToken(props) {
  const {
    token, tokenNumber, setSymbol, setTokenNumber,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card hasNoHeader>
      <Accordion id="base-example-accordion">
        <AccordionPanel
          id={token.name}
          key={token.name}
          expanded={isOpen}
          onTogglePanel={() => setIsOpen(!isOpen)}
          summary={token.name}
          panelContentActions={(
            <ButtonGroup>
              <Button
                variant="outline-brand"
                label="Stats"
                onClick={() => setIsOpen(true)}
              />
              <Button
                variant="outline-brand"
                label="Chart"
                data-token-symbol={token.symbol}
                data-token-number={tokenNumber}
                onClick={(e) => {
                  setSymbol(e.target.dataset.tokenSymbol);
                  setTokenNumber(e.target.dataset.tokenNumber);
                }}
              />
            </ButtonGroup>
          )}
        >
          <div className="slds-grid slds-wrap">
            <div className="slds-size_1-of-2">
              <WalletTokenStatsBox
                label="Balance"
                stat={`$${(token.walletBalance * parseFloat(token.stats?.priceUsd)).toFixed(2)}`}
                unit=""
              />
            </div>
            <div className="slds-size_1-of-2" />
            <div className="slds-size_2-of-6">
              <WalletTokenStatsBox
                label="Price"
                stat={`$${(parseFloat(token.stats?.priceUsd)).toFixed(2)}`}
                unit=""
              />
            </div>
            <div className="slds-size_1-of-6">
              <WalletTokenStatsBox
                label="5M"
                stat={token.stats?.priceChange.m5}
                unit="%"
              />
            </div>
            <div className="slds-size_1-of-6">
              <WalletTokenStatsBox
                label="1HR"
                stat={token.stats?.priceChange.h1}
                unit="%"
              />
            </div>
            <div className="slds-size_1-of-6">
              <WalletTokenStatsBox
                label="6HR"
                stat={token.stats?.priceChange.h6}
                unit="%"
              />
            </div>
            <div className="slds-size_1-of-6">
              <WalletTokenStatsBox
                label="24HR"
                stat={token.stats?.priceChange.h24}
                unit="%"
              />
            </div>
            <div className="slds-size_2-of-6">
              <WalletTokenStatsBox
                label="FDV"
                stat={`$${(token.stats?.fdv / 1000000).toFixed(2)}`}
                unit="M"
              />
            </div>
            <div className="slds-size_1-of-6">
              <WalletTokenStatsBox
                label="5M"
                stat={(token.stats?.volume.m5 / 1000).toFixed(2)}
                unit="K"
              />
            </div>
            <div className="slds-size_1-of-6">
              <WalletTokenStatsBox
                label="1HR"
                stat={token.stats?.volume.h1 > 100000
                  ? (token.stats?.volume.h1 / 1000000).toFixed(2)
                  : (token.stats?.volume.h1 / 1000).toFixed(2)}
                unit={token.stats?.volume.h1 > 1000000 ? 'M' : 'K'}
              />
            </div>
            <div className="slds-size_1-of-6">
              <WalletTokenStatsBox
                label="6HR"
                stat={token.stats?.volume.h6 > 100000
                  ? (token.stats?.volume.h6 / 1000000).toFixed(2)
                  : (token.stats?.volume.h6 / 1000).toFixed(2)}
                unit={token.stats?.volume.h6 > 1000000 ? 'M' : 'K'}
              />
            </div>
            <div className="slds-size_1-of-6">
              <WalletTokenStatsBox
                label="24HR"
                stat={token.stats?.volume.h24 > 100000
                  ? (token.stats?.volume.h24 / 1000000).toFixed(2)
                  : (token.stats?.volume.h24 / 1000).toFixed(2)}
                unit={token.stats?.volume.h24 > 1000000 ? 'M' : 'K'}
              />
            </div>
          </div>
        </AccordionPanel>
      </Accordion>
    </Card>
  );
}

WalletToken.propTypes = {
  token: PropTypes.objectOf(PropTypes.string).isRequired,
  tokenNumber: PropTypes.number.isRequired,
  setSymbol: PropTypes.func.isRequired,
  setTokenNumber: PropTypes.func.isRequired,
};

export default WalletToken;
