import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Card,
    IconSettings,
} from '@salesforce/design-system-react';

import {
    getCollections,
    getSolanaInfo,
    getCollection
 } from '../../../redux/actions';

import Header from '../../app/components/Header';
import Listings from "../components/NFTCollection/Listings";
import Activities from "../components/NFTCollection/Activities";
import Buys from "../components/NFTCollection/Buys";

const NFTCollection = (props) => {
    let { symbol } = useParams();
    
    useEffect(() => {
        props.getCollection(symbol);
    }, []);

    return (
        <IconSettings iconPath="/icons">
            <Header />

            <div className="slds-grid slds-wrap slds-p-horizontal_small" style={{ marginTop: '25px'}}>
                <div className="slds-size_1-of-4">
                    {Object.keys(props.collections).length > 0 ? (
                        <Card heading={props.collections[symbol].name}>
                            <div className="slds-grid slds-wrap">
                                <div className="slds-size_1-of-1">
                                    <img src={props.collections[symbol]?.image} alt="NFT" />
                                </div>
                                <div className="slds-p-horizontal_x-small">
                                    <div className="slds-size_1-of-1 slds-text-title_caps slds-p-top_small">Details</div>
                                    <div className="slds-size_1-of-1">{props.collections[symbol]?.description}</div>
                                </div>    
                            </div>                                              
                        </Card>
                    ) : null}

                    <Card hasNoHeader>
                        <Activities activities={props.collectionActivities || []} />
                    </Card>

                    <Card hasNoHeader>
                        <Listings listings={props.collectionListings || []} /> 
                    </Card>
                </div>
                <div className="slds-size_3-of-4 slds-p-horizontal_x-small">
                    <Buys activities={props.collectionActivities || []} />
                </div>
            </div>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({
    collections: state.magicEden.collections,
    collectionActivities: state.magicEden.collectionActivities,
    collectionListings: state.magicEden.collectionListings
});

const mapDispatchToProps = (dispatch) => ({
    getCollections: () => dispatch(getCollections()),
    getSolanaInfo: () => dispatch(getSolanaInfo()),
    getCollection: (symbol) => dispatch(getCollection(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NFTCollection);