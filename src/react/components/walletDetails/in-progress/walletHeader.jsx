import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { 
    Button,
    Input,
    Modal,
    PageHeaderControl,
    PageHeader,
} from '@salesforce/design-system-react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    putAppWallet
} from '../../../../redux/actions';

const WalletHeader = (props) => {
    const { wallet } = useParams()
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');

    const onSave = async () => {
        await props.putAppWallet({ 'name': name, 'wallet': wallet, 'chain': 'ethereum' });

        setIsOpen(false);
    }

    return (
        <div>
            <PageHeader
                details={[]}
                label={'0x' + wallet.substr(wallet.length - 6)}
                title={props.appWallets.length > 0 ? props.appWallets.find(el => el.address === wallet)?.name : 'Placeholder'}
                variant="record-home"
                style={{
                    backgroundColor: '#fff !important'
                }}
                onRenderActions={() => { 
                    return (
                        <PageHeaderControl>
                            <Button label="Edit Details" onClick={() => setIsOpen(true)} />
                        </PageHeaderControl>
                    )
                }}
            />
            <Modal
                isOpen={isOpen}
                footer={[
                    <Button label="Cancel" onClick={() => setIsOpen (false)} />,
                    <Button label="Save" variant="brand" onClick={() => onSave()} />,
                ]}
                onRequestClose={() => setIsOpen(false)}
                heading="Edit Wallet Details"
            >
                <div className="slds-p-around_small">
                    <Input 
                        label="Wallet Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <Input 
                        label="Wallet Address" 
                        value={wallet} 
                        disabled 
                    />
                    <Input 
                        label="Chain" 
                        value={'ethereum'} 
                        disabled 
                    />
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    appWallets: state.app.appWallets,
    walletTransactions: state.app.walletTransactions
});
const mapDispatchToProps = (dispatch) => ({
    putAppWallet : (info) =>
        dispatch(putAppWallet(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletHeader);