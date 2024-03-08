import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { 
    Button,
    Card,
    IconSettings,
    Input
} from '@salesforce/design-system-react';
import { 
    purge,
    postWallet 
} from "../../redux/actions";

const Home = (props) => {
    const address = useAddress();
    const navigate = useNavigate();

    const [wallet, setWallet] = useState('');

    const launchApp = async () => {
        if (wallet !== undefined && wallet !== '') {
            await props.postWallet(wallet);

            navigate("/wallet/" + wallet);
        } else if (address !== undefined) {
            await props.postWallet(address);

            navigate("/wallet/" + address);
        }
    }

    useEffect(() => {
        props.purge();
    },[])

    return (
        <IconSettings iconPath="/icons">
            <div 
                style={{ minHeight: '94vh', minWidth: '100vw'}} 
                className="slds-align_absolute-center"
            >
                <Card 
                    hasNoHeader 
                    className="slds-grid" 
                    bodyClassName="slds-p-horizontal_small slds-p-top_small"
                >
                    <Input 
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        placeholder="Enter Eth Address"
                    />
                    <div className="slds-p-vertical_small slds-align_absolute-center slds-text-title_caps">OR</div>
                    <ConnectWallet 
                        accentColor="#fff"
                        colorMode="dark"
                        className="slds-size_1-of-1"
                    />
                    <Button 
                        label="Launch App"
                        variant="brand"
                        className="slds-size_1-of-1 slds-m-top_small"
                        onClick={launchApp}
                    />
                </Card>
            </div>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    purge: () => 
        dispatch(purge()),
    postWallet: (wallet) => 
        dispatch(postWallet(wallet))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
