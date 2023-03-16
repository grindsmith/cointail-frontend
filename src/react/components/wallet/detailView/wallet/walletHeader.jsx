import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { 
    Button,
    PageHeaderControl,
    PageHeader,
    ButtonGroup,
    Input,
    Modal
} from '@salesforce/design-system-react';
import { useParams } from 'react-router-dom';
import {
    putAppWallets,
} from '../../../../../redux/actions';

const WalletHeader = (props) => {
    const address = useAddress();
    const { wallet } = useParams()
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');

    return (
        <div>
            <PageHeader
                details={[
                    {
                        label: '# of Tokens',
                        content: props.walletTokens?.filter((tx) => tx.walletBalance > 0).length || 0
                    },
                ]}
                label={'0x' + wallet.substr(wallet.length - 6)}
                title={props.appWallets.find((el) => el.address === wallet)?.name}
                variant="record-home"
                style={{
                    backgroundColor: '#fff !important'
                }}
                onRenderActions={() => { 
                    return (
                        <PageHeaderControl>
                            <ButtonGroup>
                                {address === wallet ? (
                                    <Button 
                                        label="Edit Wallet" 
                                        onClick={() => {
                                            setIsOpen(true)
                                        }} 
                                    />
                                ) : null}
                                {/** 
                                <Button 
                                    label="View Other Wallets" 
                                    onClick={() => props.setIsOpen(true)} 
                                    variant="brand"
                                />
                                 */}
                            </ButtonGroup>
                        </PageHeaderControl>
                    )
                }}
            />
            <Modal
				isOpen={isOpen}
				onRequestClose={() => setIsOpen(false)}
                heading="Edit Wallet Details"
                footer={[
                    <Button label="Cancel" onClick={() => setIsOpen(false)} />,
                    <Button 
                        label="Save" 
                        variant="brand" 
                        onClick={async () => {
                            await props.putAppWallets(wallet, name)
                            await setIsOpen(false)
                        }}
                    />
                ]}
			>
                <div className="slds-p-around_small">
                    <Input label="Wallet Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    walletTokens: state.app.walletTokens,
    appWallets: state.app.appWallets
});

const mapDispatchToProps = (dispatch) => ({
    putAppWallets : (wallet, name) =>
        dispatch(putAppWallets(wallet, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletHeader);