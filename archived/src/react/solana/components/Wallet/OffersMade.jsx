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

const OffersMade = (props) => {
    return (
        <Card heading="Offers Made" style={{ overflowX: "scroll"}}>
            <DataTable
                items={props.offersMade}
                id="DataTableExample-headless"
                striped
            >
                {columns}
            </DataTable>
        </Card>
    )
}

export default OffersMade;