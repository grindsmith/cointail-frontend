import React from "react";
import {
    Card,
    DataTable,
    DataTableColumn
} from '@salesforce/design-system-react';

const columns = [
    <DataTableColumn key="price" label="Price" property="price" />,
    <DataTableColumn key="tokenSize" label="Token Size" property="tokenSize" />,
    <DataTableColumn key="seller" label="Seller" property="seller" />,
]

const Listings = (props) => {
    return (
        <Card heading="Recent Listings" style={{ overflowX: "scroll"}}>
            <DataTable
                items={props.listings.splice(0, 10)}
                id="DataTableExample-headless"
                striped
            >
                {columns}
            </DataTable>
        </Card>
    )
}

export default Listings;