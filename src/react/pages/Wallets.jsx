import React, { useEffect } from "react";
import { connect } from 'react-redux';
import {
    DataTable,
    DataTableColumn,
    DataTableCell,
    Card,
    IconSettings,
} from '@salesforce/design-system-react';
import { 
    purge,
    getAppWallets 
} from "../../redux/actions";

import Header from "../components/app/appHeader";

const CustomDataTableCell = ({ children, ...props }) => (
    <DataTableCell {...props} >
      <a href={'/wallet/' + children}>0x{children.substr(children.length - 6)}</a>
    </DataTableCell>
);
CustomDataTableCell.displayName = DataTableCell.displayName;

const columns = [
    <DataTableColumn key="Name" label="name" property="name" />,
    <DataTableColumn key="address" label="Wallet" property="address">
        <CustomDataTableCell />
    </DataTableColumn>,
    <DataTableColumn key="chain" label="chain" property="chain" />,
    <DataTableColumn key="created_at" label="Created" property="created_at" />,
]

const WalletDetails = (props) => {
    useEffect(() => {
        props.purge();
        props.getAppWallets();
    }, [])

    return (
        <IconSettings iconPath="/icons">
            <Header />
            <div className="slds-grid slds-p-top_small slds-p-horizontal_small" style={{ height: '94vh'}}>
                <div className="slds-size_1-of-1 slds-p-around_large">
                    <Card heading="Wallets">
                        <DataTable
                            items={props.appWallets}
                            id="DataTableExample-headless"
                            striped
                        >
                            {columns}
                        </DataTable>
                    </Card>
                </div>
            </div>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({
    appWallets: state.app.appWallets
});
const mapDispatchToProps = (dispatch) => ({
    purge: () => 
        dispatch(purge()),
    getAppWallets: () => 
        dispatch(getAppWallets())
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetails);
