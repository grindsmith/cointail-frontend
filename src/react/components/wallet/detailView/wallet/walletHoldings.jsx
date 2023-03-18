import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  DataTable,
  DataTableCell,
  DataTableColumn,
} from '@salesforce/design-system-react';

// eslint-disable-next-line react/prop-types
function TransactionCell({ children }) {
  return (
    <DataTableCell>
      <a
        href={children}
        target="_blank"
        alt="tx"
        rel="noreferrer"
      >
        Chart
      </a>
    </DataTableCell>
  );
}
TransactionCell.displayName = DataTableCell.displayName;

const columns = [
  <DataTableColumn key="label" label="Token" property="label" />,
  <DataTableColumn key="priceUSD" label="Price" property="priceUSD" />,
  <DataTableColumn key="priceChange1hr" label="1hr %" property="priceChange1hr" />,
  <DataTableColumn key="priceChange24hr" label="24hr %" property="priceChange24hr" />,
  <DataTableColumn key="url" label="DexScrnr" property="url">
    <TransactionCell />
  </DataTableColumn>,
];

function WalletHoldings(props) {
  const { walletTokens } = props;

  return (
    <DataTable
      // eslint-disable-next-line react/prop-types
      items={walletTokens.filter((tx) => tx.walletBalance > 0)}
      id="DataTableExample-headless"
      className="slds-truncate"
      fixedLayout
    >
      {columns}
    </DataTable>
  );
}

WalletHoldings.propTypes = {
  walletTokens: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  walletTokens: state.app.walletTokens,
});

export default connect(mapStateToProps, null)(WalletHoldings);
