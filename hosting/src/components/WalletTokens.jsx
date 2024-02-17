import React, { useEffect, useState } from "react";
import Moment from 'moment-timezone';

import { Row, Col, Card, Divider, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const WalletTokens = (props) => {
    const { wallet, walletTokens } = props;

    const formatTokens = async () => {

    }

    return (
        <>
            <Card 
                title="Wallet Tokens" 
                type="inner"
            >
                {walletTokens.length === 0 ? (
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                ): (
                    walletTokens.map((token) => {
                        return (
                            <>
                                <Row key={token.asset} className="slds-p-around_small">
                                    <Col span={3} align="center">
                                        <img 
                                            src={token.logo}
                                            style={{
                                                height: '25px',
                                                width: '25px',
                                                borderRadius: '50%'
                                            }}
                                        />
                                    </Col>
                                    <Col span={13}>
                                        <div>{token.name}</div>
                                        <div style={{ fontSize: '10px'}}><a href="#">Token Contract</a></div>
                                    </Col>
                                    <Col span={8} align="right">{parseFloat(token.walletBalance) > 0 ? parseFloat(token.walletBalance).toFixed(0) : parseFloat(token.walletBalance).toFixed(5)}</Col>
                                </Row>
                                <Divider style={{ margin: 0 }} />
                            </>
                        )
                    })
                )}
            </Card>
        </>
    );
};

export default WalletTokens;