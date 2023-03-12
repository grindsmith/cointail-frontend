import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import {
    Card,
    DataTable,
    DataTableCell,
    DataTableColumn,
} from '@salesforce/design-system-react';
import NFTRenderer from './ERC721/NFTRenderer';

const CustomDateCell = ({ children, ...props }) => (<DataTableCell {...props} ><p>{Moment(children * 1000).fromNow()}</p></DataTableCell>);
CustomDateCell.displayName = DataTableCell.displayName;

const CustomGasCell = ({ children, ...props }) => (<DataTableCell {...props} ><p>{Math.round(children / Math.pow(10, 7)) / 1000} Gwei</p></DataTableCell>);
CustomGasCell.displayName = DataTableCell.displayName;
  
const columns = [
    <DataTableColumn key="category" label="Category" property="category" />,
    <DataTableColumn key="value" label="Value" property="value" />,
    <DataTableColumn key="asset" label="Asset" property="asset" />,
    <DataTableColumn key="contractAddress" label="Address" property="contractAddress" />,
    <DataTableColumn key="gasPrice" label="Gas" property="gasPrice">
        <CustomGasCell />
    </DataTableColumn>,
    <DataTableColumn key="blockTimestamp" label="Date" property="blockTimestamp">
        <CustomDateCell />
    </DataTableColumn>,
]

const walletERC721Transactions = (props) => {
    return (
        <Card heading="ERC721 Transactions" style={{ overflowX: "scroll"}}>
            <DataTable
                items={[]}//Object.values(props.walletTransactions).filter((tx) => tx.category === 'erc721')}
                id="DataTableExample-headless"
                striped
            >
                {columns}
            </DataTable>
            {/** <NFTRenderer key={i} contractAddress={tx.contractAddress} /> **/}
        </Card>
    );
}

// Redux is case sensitive
const mapStateToProps = (state) => ({
    walletTransactionMatches: state.app.walletTransactionMatches,
    walletTransactions: state.app.walletTransactions,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(walletERC721Transactions);