import React from "react";
import {
    Card,
    DataTable,
    DataTableColumn
} from '@salesforce/design-system-react';

const columns = [
    <DataTableColumn key="price" label="Price" property="price" />,
    <DataTableColumn key="tokenSize" label="Tokens" property="tokenSize" />,
    <DataTableColumn key="buyer" label="Buyer" property="buyer" />,
]

const OffersRecieved = (props) => {
    return (
        <Card heading="Offers Recieved" style={{ overflowX: "scroll"}}>
            <DataTable
                items={props.offersRecieved}
                id="DataTableExample-headless"
                striped
            >
                {columns}
            </DataTable>
        </Card>
    )
}

export default OffersRecieved;