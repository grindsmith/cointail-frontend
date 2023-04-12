import React from 'react';
import { DataTable, DataTableColumn } from '@salesforce/design-system-react';
import WalletLinkCell from './linkDataCell';

const WalletTransactions = (props) => {
    const { chain } = props;

    return (
        <div style={{ overflow: 'auto' }}>
            <DataTable
                items={props.transactions.filter((tx) => tx.category !== "erc721")}
                id="DataTableExample-headless"
                striped
                className="slds-truncate"
                fixedLayout
            >
                <DataTableColumn key="blockTimeStamp" label="Time" property="blockTimestamp" />

                <DataTableColumn key="action" label="Action" property="action" width="80px" />

                <DataTableColumn key="summary" label="Summary" property="summary" width="250px" />

                <DataTableColumn key="gas" label="Gas (ETH)" property="gas" />

                <DataTableColumn 
                    key="contractAddress" 
                    label="Chart" 
                    property="contractAddress" 
                    width="80px"
                >
                    <WalletLinkCell 
                        prefix={`https://dexscreener.com/${chain}`} 
                        linkLabel={false}
                        assetTwo={false}
                    />
                </DataTableColumn>

                <DataTableColumn 
                    key="contractAddressTwo" 
                    label="Chart" 
                    property="contractAddressTwo" 
                    width="80px"
                >
                    <WalletLinkCell 
                        prefix={`https://dexscreener.com/${chain}`} 
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
                    <WalletLinkCell 
                        prefix={props.chain === 'ethereum' ? `https://etherscan.io/tx` : `https://arbiscan.io/tx`} 
                        linkLabel={true}
                        assetTwo={false}
                    />
                </DataTableColumn>
            </DataTable>
        </div>
    );
}

export default WalletTransactions;