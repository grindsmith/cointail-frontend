import React from "react";
import {
    Card
} from '@salesforce/design-system-react';

const User = (props) => {
    console.log(props.wallet)
    return (
        <Card hasNoHeader className="slds-p-top_small">
            <div className="slds-grid">
                <div className="slds-size_1-of-4 slds-align_absolute-center">
                    <img 
                        src={'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://avatars.dicebear.com/api/jdenticon/' + props.wallet.avatar + '.svg'} 
                        style={{
                            height: '50px',
                            width: '50px',
                            border: '2px solid #464646',
                            borderRadius: '50%'
                        }}
                        alt="User"
                    />
                </div>
                <div className="slds-size_3-of-4 slds-text-heading_medium slds-p-top_small">{props.wallet.displayName}</div>
            </div>
        </Card>
    )
}

export default User;