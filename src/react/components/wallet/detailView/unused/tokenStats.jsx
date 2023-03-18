import React from 'react';
import PropTypes from 'prop-types';
import WalletTokenStatsBox from './walletTokenStatsBox';

function TokenStats(props) {
  const { token } = props;

  return (
    <div className="slds-grid">
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
    </div>
  );
}

TokenStats.propTypes = {
  token: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default TokenStats;
