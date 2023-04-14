import React from "react";
import { 
    DataTable,
    DataTableCell,
    DataTableColumn,
    Spinner
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
        <div>
            {props.tokens.length > 0 ? (
                <DataTable
                    items={props.tokens.filter((tx) => tx.walletBalance > 0)}
                    id="DataTableExample-headless"
                    className="slds-truncate"
                    fixedLayout
                    keyboardNavigation
                    striped
                >
                    {columns}
                </DataTable>
            ): (
                <div className="slds-m-vertical_xx-large">
                    <Spinner
                        size="medium"
                        variant="base"
                        assistiveText={{ label: 'Main Frame Loading...' }}
                    />
                </div>
            )}
        </div>
    )
};

export default WalletHoldings;
