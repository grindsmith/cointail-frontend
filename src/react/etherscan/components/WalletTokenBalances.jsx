import React from 'react';

import {
  Button,
  Card
} from '@salesforce/design-system-react';

const TokenBalances = (props) => {
  return (
    <div>
      <Card heading="Dex Screener Pairs" style={{ overflowX: "scroll"}} />
      {props.tokenBalances.map((token) => {
        return (
          <Card hasNoHeader bodyClassName="slds-p-horizontal_x-small slds-p-top_small">
            <div className="slds-grid">
              <div className="slds-size_1-of-4"><img src={token.logo} style={{ 'height': '35px', 'width': '35px'}} /></div>
              <div className="slds-size_1-of-4">{token.name + ' (' + token.symbol + ')'}</div>
              <div className="slds-size_1-of-4">{parseInt(token.walletBalance)/Math.pow(10, token.decimals)}</div>
              <div className="slds-size_1-of-4"><Button label={'Search'} onClick={() => props.setContract(token.contractAddress)} /></div>
            </div>
          </Card>
        )
      })}
    </div>
  );
}

export default TokenBalances;