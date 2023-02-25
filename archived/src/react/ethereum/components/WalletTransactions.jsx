import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Moment from 'moment';
import { 
    Button,
    Card,
    DataTable,
    DataTableCell,
    DataTableColumn,
  } from '@salesforce/design-system-react';

  const CustomDateCell = ({ children, ...props }) => (<DataTableCell {...props} ><p>{Moment(children * 1000).fromNow()}</p></DataTableCell>);
CustomDateCell.displayName = DataTableCell.displayName;
  
  const columns = [
    <DataTableColumn key="tokenSymbol" label="Symbol" property="tokenSymbol" />,
    <DataTableColumn key="timeStamp" label="Date" property="timeStamp">
        <CustomDateCell />
    </DataTableColumn>,
  ]

const WalletTransactions = (props) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (props.address !== undefined) {
            Axios.get('http://localhost:8080/api/etherscan/transactions/' + props.address).then((result) => {
                console.log(result.data.transactions.result);
                setTransactions(result.data.transactions.result);
            });
        }
    }, [props.address]);

    return (
        <div style={{ overflowX: "scroll"}}>
            <DataTable
                items={transactions}
                id="DataTableExample-headless"
                striped
            >
                {columns}
            </DataTable>
        </div>
    );
}

export default WalletTransactions;