import React from "react";
import {
    Card,
    DataTable,
    DataTableColumn
} from '@salesforce/design-system-react';

const columns = [
    <DataTableColumn key="date" label="Date" property="date" />,
    <DataTableColumn key="price" label="Price" property="price" />,
    <DataTableColumn key="type" label="Type" property="type" />,
    <DataTableColumn key="source" label="Source" property="source" />,
]

const Activities = (props) => {
    return (
        <Card heading="Recent Activites" style={{ overflowX: "scroll"}}>
            <DataTable
                items={props.activities}
                id="DataTableExample-headless"
                striped
            >
                {columns}
            </DataTable>
        </Card>
    )
}

export default Activities;