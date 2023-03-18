/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
        href={`https://etherscan.io/tx/${children.split(':')[0]}`}
        target="_blank"
        alt="tx"
        rel="noreferrer"
      >
        {children.slice(0, 8)}
      </a>
    </DataTableCell>
  );
}
TransactionCell.displayName = DataTableCell.displayName;

const columns = [
  <DataTableColumn key="blockTimeStamp" label="Time" property="blockTimestamp" />,
  <DataTableColumn key="action" label="Action" property="action" />,
  <DataTableColumn key="asset" label="Token" property="asset" />,
  <DataTableColumn key="value" label="Amount" property="value" />,
  <DataTableColumn key="uniqueId" label="Etherscan" property="uniqueId">
    <TransactionCell />
  </DataTableColumn>,
];

function WalletERC20Transactions(props) {
  const { walletTransactions } = props;

  const filterForERC20 = (tx) => tx.category !== 'erc721';

  return (
    <DataTable
      // eslint-disable-next-line react/prop-types
      items={walletTransactions.filter((tx) => filterForERC20(tx))}
      id="DataTableExample-headless"
      striped
      fixedLayout
    >
      {columns}
    </DataTable>
  );
}

WalletERC20Transactions.propTypes = {
  walletTransactions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  walletTransactions: state.app.walletTransactions,
});

export default connect(mapStateToProps, null)(WalletERC20Transactions);
