import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import {
    Button,
    DataTable,
    DataTableCell,
    DataTableColumn,
    Icon,
    Modal
} from '@salesforce/design-system-react';
import TokenChart from '../modal/tokenChart';
import { getTokenPairs } from '../../../../redux/actions';
import TokenPairs from '../modal/tokenPairs';

const LinkCell = ({ children, ...props }) => {
    let tmp = 'View';
    if (!props.linkLabel && !props.assetTwo)
        tmp = props.item.asset;
    else if (!props.linkLabel && props.assetTwo)
        tmp = props.item.assetTwo

    return (
        <DataTableCell {...props}>
            <a 
                href={`${props.prefix}/${props.chain}/${children}`}
                target="_blank"
                rel="noreferrer"
                title={`${props.prefix}/${props.chain}/${children}`}
            >{tmp}</a>
        </DataTableCell>
    );
}
LinkCell.displayName = DataTableCell.displayName;

const WalletERC20Transactions = (props) => {
    const { chain } = props;

    const filterForERC20 = (tx) => {
        return tx.category !== "erc721";
    }

    return (
        <div>
            <DataTable
                items={props.transactions.filter((tx) => filterForERC20(tx))}
                id="DataTableExample-headless"
                striped
                fixedLayout
            >
                <DataTableColumn key="blockTimeStamp" label="Time" property="blockTimestamp" />
                <DataTableColumn key="action" label="Action" property="action" width="80px" />
                <DataTableColumn key="summary" label="Summary" property="summary" width="250px" />
                <DataTableColumn key="gas" label="Gas (ETH)" property="gas" />
                <DataTableColumn key="contractAddress" label="Chart" property="contractAddress" width="80px">
                    <LinkCell 
                        prefix={`https://dexscreener.com`} 
                        chain={chain} 
                        linkLabel={false}
                        assetTwo={false}
                    />
                </DataTableColumn>
                <DataTableColumn key="contractAddressTwo" label="Chart" property="contractAddressTwo" width="80px">
                    <LinkCell 
                        prefix={`https://dexscreener.com`} 
                        chain={chain} 
                        linkLabel={false}
                        assetTwo={true}
                    />
                </DataTableColumn>
                <DataTableColumn 
                    key="hash" 
                    label={props.chain === 'ethereum' ? 'Etherscan' : 'Arbiscan'} 
                    property="hash"
                    width="90px"
                >
                    <LinkCell 
                        prefix={props.chain === 'ethereum' 
                            ? `https://etherscan.io` 
                            : `https://arbiscan.io`} 
                        chain={'tx'} 
                        linkLabel={true}
                        assetTwo={false}
                    />
                </DataTableColumn>
            </DataTable>
        </div>
    );
}

// Redux is case sensitive
const mapStateToProps = (state) => ({
    walletEthereumTransactions: state.app.walletEthereumTransactions,
});

const mapDispatchToProps = (dispatch) => ({
    getTokenPairs: (contractAddress) => dispatch(getTokenPairs(contractAddress))
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletERC20Transactions);