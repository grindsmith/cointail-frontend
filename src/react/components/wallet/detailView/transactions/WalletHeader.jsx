import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { 
    Button,
    PageHeaderControl,
    PageHeader,
} from '@salesforce/design-system-react';
import { useParams } from 'react-router-dom';

const WalletHeader = (props) => {
    const { wallet } = useParams()

    return (
        <PageHeader
            details={[]}
            label={'0x' + wallet.substr(wallet.length - 6)}
            title={'0x' + wallet.substr(wallet.length - 6)}
            variant="record-home"
            style={{
                backgroundColor: '#fff !important'
            }}
            onRenderActions={() => { 
                return (
                    <PageHeaderControl>
                        <Button label="Edit Details" onClick={() => {
                            console.log('click')
                        }} />
                    </PageHeaderControl>
                )
            }}
        />
    );
}

WalletHeader.propTypes = {
}

export default WalletHeader;