import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { 
    PageHeader,
} from '@salesforce/design-system-react';


const TokenHeader = (props) => {
    const getDetails = () => {
        if (props.selected.length > 0) {
            return [{
                label: 'Balance',
                content: props.selected[0]?.walletBalance
            },{
                label: 'Contract Address',
                content: props.selected[0]?.contractAddress
            }]
        } else {
            return [];
        }
    }

    return (
        <PageHeader
            details={getDetails()}
            //icon={<img src={props.selected[0]?.logo} alt={props.selected[0]?.symbol} />}
            title={props.selected[0]?.name || 'Token Pairs'}
            variant="related-list"
            info={(props.selected[0]?.walletBalance || '0') + " " + (props.selected[0]?.symbol || '- Select Tokens')}
        />
    );
}

TokenHeader.propTypes = {
    selected: PropTypes.array
}

export default TokenHeader;