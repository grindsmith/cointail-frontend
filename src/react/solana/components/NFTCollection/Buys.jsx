import React from "react";
import { 
    CartesianGrid,
    Legend, 
    LineChart, 
    Line, 
    ResponsiveContainer, 
    Tooltip, 
    XAxis, 
    YAxis 
} from 'recharts';
import Moment from 'moment';
import {
    Card,
    DataTable,
    DataTableCell,
    DataTableColumn
} from '@salesforce/design-system-react';

const CustomDateCell = ({ children, ...props }) => (<DataTableCell {...props} ><p>{Moment(children * 1000).fromNow()}</p></DataTableCell>);
CustomDateCell.displayName = DataTableCell.displayName;

const CustomDataTableCell = ({ children, ...props }) => (<DataTableCell {...props} ><a href={'/wallet/' + children}>{children}</a></DataTableCell>);
CustomDataTableCell.displayName = DataTableCell.displayName;

const buyerColumns = [
    <DataTableColumn key="blockTime" label="Block Time" property="blockTime">
        <CustomDateCell />
    </DataTableColumn>,
    <DataTableColumn key="price" label="Price" property="price" />,
    <DataTableColumn key="type" label="Type" property="type" />,
    <DataTableColumn key="buyer" label="Buyer" property="buyer">
		<CustomDataTableCell />
    </DataTableColumn>,
    <DataTableColumn key="slot" label="Slot" property="slot" />,
]

const Buys = (props) => {
    console.log(props.activities)
    return (
        <div>
            <Card heading="Recent Buys" style={{ overflowX: "scroll"}}>
                <ResponsiveContainer width={"100%"} aspect={3}>
                    <LineChart width={400} height={10} data={props.activities}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="blockTime" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
            <Card heading="Recent Buys" style={{ overflowX: "scroll"}} className="slds-m-vertical_small">
                <DataTable
                    items={props.activities.slice(0,20).filter((activity) => { return activity.type === "buyNow" })}
                    id="DataTableExample-headless"
                    striped
                >
                    {buyerColumns}
                </DataTable>
            </Card>
        </div>
    )
}

export default Buys;