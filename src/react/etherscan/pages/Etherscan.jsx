import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Axios from 'axios';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import {
    Button,
    Card,
    DataTable,
    DataTableColumn,
    IconSettings,
    Input
} from '@salesforce/design-system-react';


import Header from "../../app/components/Header";
import VolumeChart from "../components/VolumeChart";
import WalletTokenBalances from "../components/WalletTokenBalances";
import DexScreenerPairs from "../components/DexScreenerPairs";

const Home = (props) => {
    const address = useAddress();
    const [contract, setContract] = useState('0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a');
    const [pairs, setPairs] = useState([]);
    const [tokenBalances, setTokenBalances] = useState([]);

    const searchToken = async () => {
        try {
            let data = await Axios.get('http://localhost:8080/api/etherscan/contract/' + contract);
            console.log(data.data);
            setPairs(data.data.pairs);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (address !== undefined) {
            Axios.get('http://localhost:8080/api/etherscan/wallet/' + address).then((result) => {
                console.log(result.data);
                setTokenBalances(result.data);
            });
        }
    },[address])

    console.log(tokenBalances);
    
    return (
        <IconSettings iconPath="/icons">
            <Header />
            <div className="slds-p-horizontal_small" style={{ marginTop: '25px'}}>
                <div className="slds-grid">
                    <div className="slds-size_4-of-5 slds-p-right_small">
                        <Card heading="Search Dex Screener" bodyClassName="slds-p-around_small">
                            <div className="slds-grid slds-wrap">
                                <Input className="slds-size_4-of-5" value={contract} onChange={(e) => setContract(e.target.value)} />
                                <div className="slds-size_1-of-5 slds-align_absolute-center">
                                    <Button className=""  label="Retrieve Token" onClick={searchToken} variant="brand" />
                                </div>
                                <div className="slds-size_1-of-1">Only using uniswap, sushiswap. Not using camelot, balancer, oreoswap, 3xcalibur </div>
                            </div>
                        </Card>

                        <div className="slds-grid slds-wrap slds-p-top_small">
                            <div className="slds-size_1-of-2 slds-p-right_xx-small">
                                <VolumeChart pairs={pairs} />
                            </div>
                            <div className="slds-size_1-of-2 slds-p-left_xx-small">
                                <DexScreenerPairs pairs={pairs} />
                            </div>
                        </div>
                    </div>

                    <div className="slds-size_1-of-5">
                        <div className="connect">
                            <ConnectWallet />
                            <WalletTokenBalances tokenBalances={tokenBalances} setContract={setContract} />
                        </div>
                    </div>
                </div>

                
            </div>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
