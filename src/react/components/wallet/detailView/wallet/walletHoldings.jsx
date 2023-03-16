import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import WalletToken from "./walletToken";
import { 
    DataTable,
    DataTableCell,
    DataTableColumn
} from "@salesforce/design-system-react";


const TransactionCell = ({ children }) => {
    return (
        <DataTableCell>
            <a href={children} target="_blank" alt="tx">Chart</a>
        </DataTableCell>
  )
};
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

const WalletHoldings = (props) => {
    console.log(props.walletTokens);

    return (
        <DataTable
            items={props.walletTokens.filter((tx) => tx.walletBalance > 0)}
            id="DataTableExample-headless"
            className="slds-truncate"
            fixedLayout
        >
            {columns}
        </DataTable>
    )
};

const mapStateToProps = (state) => ({
    walletTokens: state.app.walletTokens,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(WalletHoldings);
