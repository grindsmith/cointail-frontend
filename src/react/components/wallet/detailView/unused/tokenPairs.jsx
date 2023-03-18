import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  DataTable,
  DataTableColumn,
} from '@salesforce/design-system-react';

/**
function CustomDateCell({ children }) {
  return (
    <DataTableCell>
      <Button
        variant={props.symbol === children ? 'outline-brand' : 'brand'}
        label={props.symbol === children ? 'Selected' : 'View'}
        onClick={(e) => {
          console.log(children);
          return props.setSymbol(props.symbol);
        }}
      />
    </DataTableCell>
  );
}
CustomDateCell.displayName = DataTableCell.displayName;

<DataTableColumn key="symbol" label="Select" property="symbol">
  <CustomDateCell />
</DataTableColumn>,
*/

const columns = [
  <DataTableColumn key="baseTokenSymbol" label="Base" property="baseTokenSymbol" />,
  <DataTableColumn key="quoteTokenSymbol" label="Quote" property="quoteTokenSymbol" />,
  <DataTableColumn key="volume24hr" label="24hr Vol" property="volume24hr" />,
  <DataTableColumn key="dexId" label="DEX" property="dexId" />,
];

function TokenPairs(props) {
  const { tokenPairs } = props;

  return (
    <Card
      heading="Top Volume Pairs"
      headerActions={(
        <div className="slds-text-title_caps slds-p-top_xx-small">
          Data from
          <a href="https://dexscreener.com/">Dexscreener</a>
        </div>
)}
      style={{ maxHeight: '350px', overflowY: 'scroll' }}
    >
      <DataTable
        items={tokenPairs}
        id="DataTableExample-headless"
        striped
      >
        {columns}
      </DataTable>
    </Card>
  );
}

TokenPairs.propTypes = {
  tokenPairs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  tokenPairs: state.app.tokenPairs,
});

export default connect(mapStateToProps, null)(TokenPairs);
