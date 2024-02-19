import React, { useEffect, useState } from "react";
import Moment from 'moment-timezone';

import { Row, Col, Card, Divider, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const WalletTokens = (props) => {
    const { chain, wallet, walletTokens } = props;

    return (
        <>
            <Card 
                title={`Tokens (${walletTokens.length})`} 
                type="inner"
            >
                {walletTokens.length === 0 ? (
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                ): (
                    walletTokens.map((token) => {
                        return (
                            <div key={token.asset} className="slds-p-around_small">
                                <Row>
                                    <Col span={3} align="left">
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
                                        <div>{token.name} (${token.symbol})</div>
                                    </Col>
                                    <Col span={8} align="right">${token.holdings.toFixed(2)}</Col>
                                </Row>
                                <Row>
                                    <Col span={3} align="center">
                                    </Col>
                                    <Col span={13}>
                                        <div style={{ fontSize: '10px'}}>
                                            <a href={`https://dexscreener.com/${chain}/${token.contractAddress}`} target="_blank">Chart</a> - {token.pairs} Pairs
                                        </div>
                                    </Col>
                                    <Col span={8} align="right" style={{ fontSize: '10px'}}>{parseFloat(token.walletBalance) > 1 ? parseFloat(token.walletBalance).toFixed(0) : parseFloat(token.walletBalance).toFixed(5)}</Col>
                                </Row>
                                <Divider style={{ margin: 0 }} />
                            </div>
                        )
                    })
                )}
            </Card>
        </>
    );
};

export default WalletTokens;