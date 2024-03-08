import React from 'react';

import {
  Button,
  Card
} from '@salesforce/design-system-react';

const WalletTokenBalances = (props) => {
  return (
    <div>
      {props.tokenBalances.map((token) => {
        return (
            <div className="slds-grid slds-p-around_x-small" style={{ borderTop: '1px solid #bbb'}}>
              <div className="slds-size_1-of-4"><img src={token.logo} style={{ 'height': '35px', 'width': '35px'}} /></div>
              <div className="slds-size_1-of-4 slds-align_absolute-center">{token.name + ' (' + token.symbol + ')'}</div>
              <div className="slds-size_1-of-4 slds-align_absolute-center">{parseInt(token.walletBalance)/Math.pow(10, token.decimals)}</div>
              <div className="slds-size_1-of-4"><Button label={'Search'} onClick={() => props.setContract(token.contractAddress)} variant="brand" /></div>
            </div>
        )
      })}
    </div>
  );
}

export default WalletTokenBalances;