import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { ConnectWallet, useAddress, useBalance } from "@thirdweb-dev/react";
import { 
    Card,
    IconSettings,
  } from '@salesforce/design-system-react';

const Home = (props) => {
    const address = useAddress();
    const navigate = useNavigate();

    useEffect(() => {
        if (address !== undefined) {
            navigate('/wallet/' + address);
        }
    }, [address])

    return (
        <IconSettings iconPath="/icons">
            <Card hasNoHeader>
                <ConnectWallet />
            </Card>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
