import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { 
    IconSettings,
} from '@salesforce/design-system-react';

const Home = (props) => {
    const address = useAddress();
    const navigate = useNavigate();

    useEffect(() => {
        if (address !== undefined) {
            navigate("/wallets");
        }
    }, [address])

    return (
        <IconSettings iconPath="/icons">
            <div style={{ minHeight: '100vh', minWidth: '100vw'}} className="slds-align_absolute-center">
                <ConnectWallet 
                    accentColor="#fff"
                    colorMode="dark"
                />
            </div>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
