import React from "react";

const WalletTokenStatsBox = (props) => {
    const textColor = (stat, unit) => {
        if (props.stat > 0 && props.unit === '%') {
            return { color: 'green' }
        } else if (props.stat <= 0 && props.unit === '%') {
            return { color: 'red' }
        } else {
            return { color: 'gray' }
        }
    }

    return (
        <div 
            style={{
                border: '1px solid #ddd',
                borderRadius: '5px'
            }}
            className="slds-m-around_xx-small slds-truncate"
        >
            <div className="slds-align_absolute-center">{props.label}</div>
            <div 
                style={textColor()}
                className="slds-align_absolute-center"
            >{props.stat}{props.unit}</div>
        </div>                
    )
};

export default WalletTokenStatsBox;
