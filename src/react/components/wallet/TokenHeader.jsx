import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { 
    PageHeader,
} from '@salesforce/design-system-react';


const TokenHeader = (props) => {
    useEffect(() => {
        if (props.token !== undefined) {
            /*
            Axios.get('http://localhost:8080/api/etherscan/transactions/' + props.address).then((result) => {
                console.log(result.data.transactions.result);
                setTransactions(result.data.transactions.result);
            });
            */
        }
    }, [props.token]);

    const getDetails = () => {
        if (props.selected.length > 0) {
            return [{
                label: 'Balance',
                content: parseInt(props.selected[0]?.walletBalance) / Math.pow(10, props.selected[0]?.decimals)
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
            icon={<img src={props.selected[0]?.logo} alt={props.selected[0]?.symbol} />}
            label={props.selected[0]?.symbol}
            title={props.selected[0]?.name}
            variant="record-home"
        />
    );
}

TokenHeader.propTypes = {
    selected: PropTypes.array
}

export default TokenHeader;