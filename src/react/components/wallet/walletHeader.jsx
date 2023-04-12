import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useAddress } from "@thirdweb-dev/react";
import { 
    Button,
    PageHeaderControl,
    PageHeader,
    ButtonGroup,
    Input,
    Modal
} from '@salesforce/design-system-react';
import { useParams } from 'react-router-dom';
import { putWallet } from '../../../redux/actions';

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
                        label: '# of Arbitrum Tokens',
                        content: props.walletArbitrumTokens?.filter((tx) => tx.walletBalance > 0).length || 0
                    },{
                        label: '# of Ethereum Tokens',
                        content: props.walletEthereumTokens?.filter((tx) => tx.walletBalance > 0).length || 0
                    }
                ]}
                label={props.walletInfo.address}
                title={props.walletInfo.name}
                variant="record-home"
                style={{
                    backgroundColor: '#fff !important'
                }}
                onRenderActions={() => { 
                    return (
                        <PageHeaderControl>
                            {address === wallet ? (
                                <ButtonGroup>
                                    <Button 
                                        label="Edit Wallet" 
                                        onClick={() => {
                                            setIsOpen(true)
                                        }} 
                                    />
                                </ButtonGroup>
                            ) : null}
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
                            await props.putWallet(wallet, name)
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
    walletArbitrumTokens: state.wallet.arbitrumTokens,
    walletEthereumTokens: state.wallet.ethereumTokens,
    walletInfo: state.wallet.info
});

const mapDispatchToProps = (dispatch) => ({
    putWallet : (wallet, name) =>
        dispatch(putWallet(wallet, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletHeader);