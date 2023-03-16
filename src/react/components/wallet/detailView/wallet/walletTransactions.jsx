import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    DataTable,
    DataTableCell,
    DataTableColumn
} from '@salesforce/design-system-react';

const TransactionCell = ({ children }) => {
    return (
        <DataTableCell>
            <a 
                href={'https://etherscan.io/tx/' + children.split(':')[0]} 
                target="_blank" 
                alt="tx"
            >
                {children.slice(0,8)}
            </a>
        </DataTableCell>
  )
};
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

const WalletERC20Transactions = (props) => {
    const filterForERC20 = (tx) => {
        return tx.category !== "erc721";
    }

    console.log(props.walletEthereumTransactions)

    return (
        <DataTable
            items={props.walletEthereumTransactions.filter((tx) => filterForERC20(tx))}
            id="DataTableExample-headless"
            striped
            fixedLayout
        >
            {columns} 
        </DataTable>
    );
}

// Redux is case sensitive
const mapStateToProps = (state) => ({
    walletEthereumTransactions: state.app.walletEthereumTransactions,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WalletERC20Transactions);