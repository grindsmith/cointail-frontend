import React, { useEffect, useState } from "react";
import Axios from 'axios';
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
    postAppWallet
} from '../../redux/actions';

const Home = (props) => {
    const address = useAddress();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        props.purge();
    }, [])

    const login = async () => {
        try {
            await Axios.post('/api/app/user', {
                username: username,
                password: password
            }).then((res) => {
                console.log(res);
                
                navigate("/user/" + username);
            });
        } catch (err) {
            console.error(err);
        }
    }

    const launchApp = async () => {
        if (address !== undefined) {
            await props.postAppWallet({ 'wallet': address});

            navigate("/wallet/" + address);
        } else {
            alert('Connect Your Wallet')
        }
    }

    return (
        <IconSettings iconPath="/icons">
            <div style={{ minHeight: '100vh', minWidth: '100vw'}} className="slds-align_absolute-center">
                <Card heading="Register/Login" bodyClassName="slds-p-horizontal_small" style={{ width: '325px'}}>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} label="Username" />
                    <Input value={password} type="password" onChange={(e) => setPassword(e.target.value)} label="Password" />
                    <Button 
                        className="slds-size_1-of-1 slds-m-top_small"
                        label="Launch App" 
                        onClick={() => login()} 
                        variant="brand"
                    />
                </Card>
            </div>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    purge: () => 
        dispatch(purge()),
    postAppWallet: (info) =>
        dispatch(postAppWallet(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
