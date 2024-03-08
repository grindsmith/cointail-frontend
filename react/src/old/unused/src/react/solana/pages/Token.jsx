import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import {
    IconSettings,
} from '@salesforce/design-system-react';

import TokenInfo from "../components/Token/TokenInfo";
import Activities from "../components/Token/Activities";
import OffersRecieved from "../components/Token/OffersRecieved";
import Listings from "../components/Token/Listings";
import Header from '../../app/components/Header';

const Token = () => {
    let { token } = useParams();

    let [tokenInfo, setTokenInfo] = useState({});
    let [activities, setActivities] = useState([]);
    let [offersRecieved, setOffersRecieved] = useState([]);
    let [listings, setListings] = useState([]);

    const getToken = async () => {
        await Axios.get('https://api-mainnet.magiceden.dev/v2/tokens/' + token).then((result) => {
            setTokenInfo(result.data);
        }).catch((err) => {
            console.error(err.message);
        })
    }

    const getActivites = async () => {
        await Axios.get('https://api-mainnet.magiceden.dev/v2/tokens/' + token + '/activities?offset=0&limit=100').then((result) => {
            console.log(result.data);
            let tmp = [];
            for (const i in result.data) {
                let tmp2 = result.data[i];
                tmp2['date'] = moment(result.data[i].blockTime * 1000).format('L');
                tmp.push(tmp2);
            }

            setActivities(tmp);
        }).catch((err) => {
            console.error(err.message);
        })
    }

    const getOffersRecieved = async () => {
        await Axios.get('https://api-mainnet.magiceden.dev/v2/tokens/' + token + '/offers_received?offset=0&limit=100').then((result) => {
            console.log(result.data)
            setOffersRecieved(result.data);
        }).catch((err) => {
            console.error(err.message);
        })
    }

    const getListings = async () => {
        await Axios.get('https://api-mainnet.magiceden.dev/v2/tokens/' + token + '/listings').then((result) => {
            setListings(result.data);
        }).catch((err) => {
            console.error(err.message);
        })
    }

    useEffect(async() => {
        try {
            await getToken();
            await getActivites();
            await getOffersRecieved();
            await getListings();
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <IconSettings iconPath="/icons">
            <Header />

            <div className="slds-grid slds-wrap slds-p-horizontal_small" style={{ marginTop: '25px'}}>
                <div className="slds-size_1-of-5">
                    <TokenInfo tokenInfo={tokenInfo} />
                </div>
                <div className="slds-size_3-of-5 slds-p-horizontal_x-small">
                    <Activities activities={activities} />
                </div>
                <div className="slds-size_1-of-5 slds-p-horizontal_x-small">
                    <OffersRecieved offersRecieved={offersRecieved} />
                    <Listings listings={listings} />
                </div>
            </div>
        </IconSettings>
    )
};

export default Token;