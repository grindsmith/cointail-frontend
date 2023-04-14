import React from 'react';
import { 
    DataTable, 
    DataTableColumn,
    Spinner
} from '@salesforce/design-system-react';
import LinkDataCell from './linkDataCell';

const WalletTransactions = (props) => {
    const { chain } = props;

    return (
        <div style={{ overflow: 'auto' }}>
            {props.transactions.length > 0 ? (
                <DataTable
                    items={props.transactions.filter((tx) => tx.category !== "erc721")}
                    id="DataTableExample-headless"
                    className="slds-truncate"
                    fixedLayout
                    striped
                >
                    <DataTableColumn key="blockTimeStamp" label="Time" property="blockTimestamp" width="175px" />

                    <DataTableColumn key="action" label="Action" property="action" width="80px" />

                    <DataTableColumn key="summary" label="Summary" property="summary" width="280px" />

                    <DataTableColumn 
                        key="contractAddress" 
                        label="Sent" 
                        property="contractAddress" 
                        width="80px"
                    >
                        <LinkDataCell 
                            prefix={"https://dexscreener.com/" + chain} 
                            linkLabel={false}
                            assetTwo={false}
                        />
                    </DataTableColumn>

                    <DataTableColumn 
                        key="contractAddressTwo" 
                        label="Received" 
                        property="contractAddressTwo" 
                        width="80px"
                    >
                        <LinkDataCell 
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
                        <LinkDataCell 
                            prefix={props.chain === 'ethereum' ? `https://etherscan.io/tx` : `https://arbiscan.io/tx`} 
                            linkLabel={true}
                            assetTwo={false}
                        />
                    </DataTableColumn>
                    <DataTableColumn key="gas" label="Gas (ETH)" property="gas" />
                </DataTable>
            ) : (
                <div className="slds-m-vertical_xx-large">
                    <Spinner
                        size="medium"
                        variant="base"
                        assistiveText={{ label: 'Main Frame Loading...' }}
                    />
                </div>
            )}
        </div>
    );
}

export default WalletTransactions;