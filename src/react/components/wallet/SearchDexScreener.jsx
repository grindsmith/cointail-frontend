import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Input,
  Button,
} from '@salesforce/design-system-react';


const SearchDexScreener = (props) => {
  return (
    <Card heading="Search Dex Screener" bodyClassName="slds-p-around_small">
        <div className="slds-grid slds-wrap">
            <Input className="slds-size_3-of-4" value={props.contract} onChange={(e) => props.setContract(e.target.value)} />
            <div className="slds-size_1-of-5 slds-align_absolute-center">
                <Button className=""  label="Search" onClick={props.searchToken} variant="brand" />
            </div>
            <div className="slds-size_1-of-1">Only using uniswap, sushiswap</div>
        </div>
    </Card>
  );
}

SearchDexScreener.propTypes = {
    contract: PropTypes.string.isRequired,
    setContract: PropTypes.func.isRequired,
    searchToken: PropTypes.func.isRequired
};

export default SearchDexScreener;