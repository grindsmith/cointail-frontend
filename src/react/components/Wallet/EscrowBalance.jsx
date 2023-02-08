import React from "react";
import {
    Card,
    DataTable,
    DataTableColumn
} from '@salesforce/design-system-react';

const columns = [
    <DataTableColumn key="balance" label="Balance" property="balance" />,
    <DataTableColumn key="buyerEscrow" label="Buyer" property="buyerEscrow" />,
]

const EscrowBalance = (props) => {
    return (
        <Card heading="Escrow Balance" style={{ overflowX: "scroll"}}>
            <DataTable
                items={props.escrowBalance}
                id="DataTableExample-headless"
                striped
            >
                {columns}
            </DataTable>
        </Card>
    )
}

export default EscrowBalance;