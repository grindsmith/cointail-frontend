import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
} from '@salesforce/design-system-react';

const TokenStats = (props) => {  
  return (
    <Card 
      heading="Token Stats"
      headerActions={<div className="slds-text-title_caps slds-p-top_xx-small">Stats from <a href="https://dexscreener.com/">Dexscreener</a></div>}
      style={{ maxHeight: '250px', overflowY: 'scroll'}}
    >
    </Card>
  );
}

const mapStateToProps = (state) => ({
  tokenPairs: state.app.tokenPairs
});

export default connect(mapStateToProps, null)(TokenStats);