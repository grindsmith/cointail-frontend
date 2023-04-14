import React from "react";
import { useNavigate } from 'react-router-dom';
import {
    Button,
    ButtonGroup,
    Card,
} from '@salesforce/design-system-react';

const Collections = (props) => {
    const navigate = useNavigate();

    return (
        <div className="slds-grid slds-wrap">
            {props.collections
            .filter((collection) => collection.image != null)
            .map((collection, i) => {
                return (
                    <div className="slds-size_1-of-5 slds-p-around_xx-small" key={i}>
                        <Card 
                            heading={collection.name} 
                            headerActions={
                                <Button 
                                    id={i}
                                    label="Select"
                                    variant="outline-brand"
                                    onClick={(e) => navigate('/collection/' + collection.symbol, { replace: true })}
                                />}
                        > 
                            <div style={{ height: '350px', overflow: 'scroll'}}>
                                <img src={collection.image} alt="NFT you might like" />
                                <div className="slds-grid slds-wrap slds-p-horizontal_x-small">
                                    <div className="slds-size_2-of-3 slds-text-title_caps slds-p-top_small">Details</div>
                                    <ButtonGroup className="slds-size_1-of-3" id="button-group-icon-group-1">
                                        {collection.twitter && collection.twitter !== "" ? (<Button onClick={(e) => window.location.replace(collection.twitter)}>T</Button>) : null}
                                        {collection.discord && collection.discord !== "" ? (<Button onClick={(e) => window.location.replace(collection.discord)}>D</Button>) : <Button />}
                                    </ButtonGroup>
                                    <div className="slds-size_1-of-1">{collection.description}</div>
                                </div>      
                            </div>                     
                        </Card>
                    </div>
                )
            })}
        
        </div>

    )
}

export default Collections;