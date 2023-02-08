import React from "react";
import {
    Card,
    DataTable,
    DataTableCell,
    DataTableColumn
} from '@salesforce/design-system-react';

const CustomDataTableCell = ({ children, ...props }) => (
    <DataTableCell {...props} >
      <a href={'/wallet/' + children}>Wallet</a>
    </DataTableCell>
);
CustomDataTableCell.displayName = DataTableCell.displayName;

const columns = [
    <DataTableColumn key="date" label="Date" property="date" />,
    <DataTableColumn key="price" label="Price" property="price" />,
    <DataTableColumn key="type" label="Type" property="type" />,
    <DataTableColumn key="source" label="Source" property="source" />,
]

const Activities = (props) => {
    return (
        <div>
            <Card heading="Recent Activities" style={{ overflowX: "scroll"}}>
                <DataTable
                    items={props.activities.splice(0, 15).filter((activity) => { return activity.type === "buyNow" ||  activity.type === "list"})}
                    id="DataTableExample-headless"
                    striped
                >
                    {columns}
                </DataTable>
            </Card>
        </div>
    )
}

export default Activities;