import React from "react";
import {
    Card,
    Icon,
    Pill
} from '@salesforce/design-system-react';

const TokenInfo = (props) => {
    console.log(props.tokenInfo)
    return (
        <Card hasNoHeader>
            <div className="slds-align_absolute-center">
                <img src={props.tokenInfo.image} alt="NFT" />
            </div>
            <div className="slds-grid slds-wrap slds-p-around_small">
                <div className="slds-size_1-of-1 slds-text-heading_medium">{props.tokenInfo.name}</div>
                <div className="slds-size_1-of-1 slds-text-title_caps slds-p-vertical_small">Details</div>
                <div className="slds-size_1-of-1">Owner: <a href={'/wallet/' + props.tokenInfo.owner}>View</a></div>
                <div className="slds-size_1-of-1">Primary Sale Occurred: {props.tokenInfo.primarySaleHappened}</div>
                <div className="slds-size_1-of-1">Seller Fee Basis Points: {props.tokenInfo.sellerFeeBasisPoints}</div>
                <div className="slds-size_1-of-1">Supply: {props.tokenInfo.supply}</div>
                <div className="slds-size_1-of-1">Update Authority: <a href={'/wallet/' + props.tokenInfo.updateAuthority}>View</a></div>
                <div className="slds-size_1-of-1 slds-text-title_caps slds-p-vertical_small">Resources</div>
                {props.tokenInfo.externalUrl ? (<div className="slds-size_1-of-1"><a href={props.tokenInfo.externalUrl}>Website</a></div>) : null}
                {props.tokenInfo.animationUrl ? (<div className="slds-size_1-of-1"><a href={props.tokenInfo.animationUrl}>Animation</a></div>) : null}
                <div className="slds-size_1-of-1 slds-text-title_caps slds-p-vertical_small">Attributes</div>
                <div className="slds-grid slds-wrap">
                    {props.tokenInfo.attributes?.slice(0,10).map((attribute) => {
                        return (
                            <div className="slds-size_1-of-2">
                                <Pill
                                    labels={{
                                        label: attribute.value,
                                        title: attribute.trait_type,
                                        removeTitle: 'Remove',
                                    }}
                                    icon={<Icon title="attribute" category="standard" name="choice" />}
                                />
                            </div>
                        )
                    })}
                </div> 

            </div>
        </Card>
    )
}

export default TokenInfo;