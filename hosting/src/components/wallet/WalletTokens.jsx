import React, { useEffect, useState } from "react";
import Moment from 'moment-timezone';

import { Row, Col, Card, Divider, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const WalletTokens = (props) => {
    const { chain, wallet, walletTokens } = props;

    return (
        <>
            <h3 className="slds-m-around_medium">Tokens ({walletTokens.length})</h3>
            <Row>
            {walletTokens.length === 0 ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            ): (
                walletTokens.map((token) => {
                    return (
                        <Col key={token.asset} span={8}>
                            <Card  className="slds-m-around_small">
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
                                    <Col span={1} />
                                    <Col span={12}>
                                        <div>{token.name}</div>
                                    </Col>
                                    <Col span={8} align="right">${token.holdings.toFixed(2)}</Col>
                                </Row>
                                <Row className="slds-top_xx-small">
                                    <Col span={6} align="left">
                                        <div style={{ fontSize: '10px'}}>{token.symbol}</div>
                                    </Col>
                                    <Col span={18} align="right">
                                        <div style={{ fontSize: '10px'}}>
                                            <a href={`https://dexscreener.com/${chain}/${token.contractAddress}`} target="_blank">Chart</a> - {token.pairs} Pairs - 
                                        
                                        {parseFloat(token.walletBalance) > 1 ? parseFloat(token.walletBalance).toFixed(0) : parseFloat(token.walletBalance).toFixed(5)}
                                        </div>
                                    </Col>
                               </Row>
                            </Card>
                        </Col>
                    )
                })
            )}
            </Row>
        </>
    );
};

export default WalletTokens;