import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { 
    Button,
    Combobox,
    Icon,
    PageHeader,
    SplitViewListbox 
} from '@salesforce/design-system-react';

import { 
    getAllWallets, 
    postGroupWallet,
    getGroup
  } from '../../../redux/actions';

const GroupMasterView = (props) => {
    const { groupId } = useParams();

    const [selection, setSelection] = useState([]);
    const [placeholder, setPlaceholder] = useState('Add New Wallets To Group');

    useEffect(() => {
        props.getAllWallets();
    }, []);

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
            info={
                <div className="slds-grid slds-p-top_x-large">
                    <div className="slds-size_3-of-4">
                        <Combobox
                            options={props.allWallets}
                            labels={{
                                label: null,
                                placeholder: placeholder,
                            }}
                            variant="inline-listbox"
                            className="slds-truncate"
                            selection={selection}
                            events={{
                                onSelect: (event, data) => {
                                    setSelection(data.selection);
                                },
                                onRequestRemoveSelectedOption: (event, data) => {
                                    setSelection([]);
                                    setPlaceholder('Add New Wallets To Group');
                                }
                            }}
                        />
                    </div>
                    <div className="slds-size_1-of-4">
                        <Button 
                            label="Submit" 
                            variant="brand"
                            onClick={async () => {
                                if (selection.length > 0) {
                                    await props.postGroupWallet(selection[0].id, groupId);
                                    setSelection([]);
                                }
                            }}
                        />
                    </div>
                </div>
                
            }
		/>,
        <SplitViewListbox
            key="2"
            labels={{
                header: 'All ' + props.groupWallets.length + ' Wallet(s)',
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
    allWallets: state.app.allWallets,
    groupInfo: state.group.info,
    groupWallets: state.group.wallets
});
const mapDispatchToProps = (dispatch) => ({
    getAllWallets: () => 
        dispatch(getAllWallets()),
    getGroup: (groupId) => 
        dispatch(getGroup(groupId)),
    postGroupWallet: (walletId, groupId) => 
        dispatch(postGroupWallet(walletId, groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMasterView);
