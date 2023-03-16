import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { 
    Button,
    Card,
    IconSettings
} from '@salesforce/design-system-react';
import { 
    purge,
    postAppWallets 
} from "../../redux/actions";

const Home = (props) => {
    const address = useAddress();
    const navigate = useNavigate();

    const launchApp = async () => {
        if (address !== undefined) {
            await props.postAppWallets(address);

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
    postAppWallets: (wallet) => 
        dispatch(postAppWallets(wallet))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
