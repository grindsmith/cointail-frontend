import React, { useEffect, useState } from "react";

import { Row, Col, Card, Divider, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const WalletTokens = (props) => {
    const { chain, wallet, walletTokens } = props;

    return (
        <>
            {walletTokens.length === 0 ? (
                <Col span={24} align="center">
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                </Col>
            ): (
                <Row>
                {walletTokens.map((token) => {
                    return (
                        <Col key={token.asset} xs={24} sm={12} md={8} className="slds-p-vertical_xx-small">
                            <Card type="inner">
                                <Row>
                                    <Col sm={5} md={3} align="left">
                                        <img 
                                            src={token.logo}
                                            style={{
                                                height: '20px',
                                                width: '20px',
                                                borderRadius: '50%'
                                            }}
                                        />
                                    </Col>
                                    <Col sm={1} md={1} />
                                    <Col sm={18} md={20}>
                                        <div className="slds-truncate">{token.name} ({token.symbol})</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} align="left">
                                        <span style={{ fontSize: '12px'}} className="slds-truncate">
                                            <a href={`https://dexscreener.com/${chain}/${token.contractAddress}`} target="_blank">Chart</a> {/*parseFloat(token.walletBalance) > 1 ? parseFloat(token.walletBalance).toFixed(0) : parseFloat(token.walletBalance).toFixed(5)} tokens*/}
                                        </span>
                                    </Col>
                                    <Col span={18} align="right">
                                        <span className="slds-truncate">${token.holdings.toFixed(2)}</span>
                                        
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    )
                    
                })}
                </Row>
            )}
        </>
    );
};

export default WalletTokens;