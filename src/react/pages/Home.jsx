import React, { useEffect } from "react";
import { connect } from 'react-redux';
import {
    Card,
    IconSettings,
} from '@salesforce/design-system-react';

import {
    getCollections,
    getSolanaInfo,
    setActiveCollectionId,
    getCollection
 } from '../../redux/actions';

import Header from "../components/App/Header";
import Collections from "../components/Home/Collections";


const Home = (props) => {
    useEffect(() => {
        props.getCollections();
        props.getSolanaInfo();
    }, []);

    return (
        <IconSettings iconPath="/icons">
            <Header />

            <div className="slds-grid slds-wrap slds-p-horizontal_small" style={{ marginTop: '25px'}}>
                <div className="slds-size_3-of-4">
                    <Collections collections={Object.values(props.collections)} />
                </div>
                <div className="slds-size_1-of-4 slds-p-horizontal_x-small">
                    <Card heading="Solana Network Info" />
                    <Card hasNoHeader>
                        <div>Total Supply</div>
                        <div>{props.solanaInfo?.totalSupply.toFixed(2)}</div>
                        <div>Circulating Supply</div>
                        <div>{props.solanaInfo?.circulatingSupply.toFixed(2)} ({((props.solanaInfo?.circulatingSupply /props.solanaInfo?.totalSupply) * 100).toFixed(2)}%)</div>
                        <div>Non-Circulating Supply</div>
                        <div>{props.solanaInfo?.nonCirculatingSupply.toFixed(2)}({((props.solanaInfo?.nonCirculatingSupply /props.solanaInfo?.totalSupply) * 100).toFixed(2)}%)</div>
                    </Card>
                </div>
            </div>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({
    collections: state.magicEden.collections,
    solanaInfo: state.magicEden.solanaInfo,
    activeCollectionId: state.magicEden.activeCollectionId,
    activities: state.magicEden.activities,
    listings: state.magicEden.listings
});

const mapDispatchToProps = (dispatch) => ({
    getCollections: () => dispatch(getCollections()),
    getSolanaInfo: () => dispatch(getSolanaInfo()),
    setActiveCollectionId: (collectionId) => dispatch(setActiveCollectionId(collectionId)),
    getCollection: (symbol) => dispatch(getCollection(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
