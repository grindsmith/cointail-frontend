import React, { useEffect, useState } from "react";
import { 
    DataTable,
    DataTableCell,
    DataTableColumn
} from "@salesforce/design-system-react";


const TransactionCell = ({ children }) => {
    return (
        <DataTableCell>
            <a href={children} target="_blank" alt="tx" rel="noreferrer">View</a>
        </DataTableCell>
  )
};
TransactionCell.displayName = DataTableCell.displayName;

const columns = [
    <DataTableColumn key="label" label="Token" property="label" />,
    <DataTableColumn key="walletBalance" label="Balance" property="walletBalance" />,
    <DataTableColumn key="priceChange1hr" label="1hr %" property="priceChange1hr" />,
    <DataTableColumn key="priceChange24hr" label="24hr %" property="priceChange24hr" />,
    <DataTableColumn key="url" label="Chart" property="url">
        <TransactionCell />
    </DataTableColumn>,
];

const WalletHoldings = (props) => {
    return (
        <DataTable
            items={props.tokens.filter((tx) => tx.walletBalance > 0)}
            id="DataTableExample-headless"
            className="slds-truncate"
            fixedLayout
        >
            {columns}
        </DataTable>
    )
};

export default WalletHoldings;
