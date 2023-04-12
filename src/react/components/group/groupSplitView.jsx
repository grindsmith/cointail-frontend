import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { 
    Icon,
    PageHeader,
    SplitViewListbox 
} from '@salesforce/design-system-react';

const GroupMasterView = (props) => {
    return [
        <PageHeader
            key="1"
            icon={
                <Icon
                    assistiveText={{ label: 'User' }}
                    category="standard"
                    name="lead"
                    iconSize="small"
                />
            }
            label={'Group'}
            title={props.groupInfo.name}
            truncate
            variant="object-home"
		/>,
        <SplitViewListbox
            key="2"
            labels={{
                header: props.groupWallets.length + ' Wallet(s)',
            }}
            options={props.groupWallets}
            events={{
                onSelect: async (event, { selectedItems, item }) => {
                    props.setActiveWallet(item.address);
                },
            }}
            selection={[]}
            unread={[]}
        />
    ]
};

const mapStateToProps = (state) => ({
    groupInfo: state.group.info,
    groupWallets: state.group.wallets
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMasterView);
