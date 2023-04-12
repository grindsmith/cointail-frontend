import React from "react";
import {
    Card,
    Icon,
    Pill
} from '@salesforce/design-system-react';

const Tokens = (props) => {
    return (
        <div className="slds-grid slds-wrap">
            {props.tokens.map((token) => {
                console.log(token)
                return (
                    <div className="slds-size_1-of-5 slds-p-around_xx-small">
                        <Card hasNoHeader style={{ minHeight: '350px'}}> 
                            <img src={token.image} alt="token" />
                            <div className="slds-p-around_x-small">
                                <div className="slds-grid">
                                    <div className="slds-size_1-of-1"><a href={'/token/'+ token.mintAddress}>{token.name}</a></div>
                                </div>
                                <div className="slds-text-title_caps slds-p-top_small">Details</div>
                                <div className="slds-grid slds-wrap">
                                    <div className="slds-size_1-of-2">Status:  </div>
                                    <div className="slds-size_1-of-2"> {token.listStatus}</div>
                                    <div className="slds-size_1-of-2">Supply:  </div>
                                    <div className="slds-size_1-of-2"> {token.supply}</div>
                                    <div className="slds-size_1-of-2">Basis Point Fee:  </div>
                                    <div className="slds-size_1-of-2"> {token.sellerFeeBasisPoints}</div>
                                    <div className="slds-size_1-of-2">Sale Happened:  </div>
                                    <div className="slds-size_1-of-2"> {token.primarySaleHappened}</div>
                                </div>
                                <div className="slds-text-title_caps slds-p-top_small">Attributes</div>
                                <div className="slds-grid slds-wrap">
                                    {token.attributes?.slice(0,10).map((attribute) => {
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
                    </div>
                )
            })}
        </div>

    )
}

export default Tokens;