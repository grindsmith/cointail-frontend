import React, { useEffect, useState } from "react";

import { Row, Col, Card, Divider, Spin, Typography } from 'antd';
const { Title } = Typography;

import { LoadingOutlined } from '@ant-design/icons';
import WalletMetricCard from "./WalletMetricCard";

const WalletTokens = (props) => {
    const { chain, wallet, isLoading, walletTokens } = props;

    console.log(walletTokens)

    return (
        <>
            {isLoading || walletTokens.length > 0 ? (<Title level={4} className="slds-m-top_medium">{chain}</Title>) : (<></>)}
            {isLoading ? (
                <Col span={24} align="center">
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                </Col>
            ): (
                <Row>
                {walletTokens.map((token, i) => {
                    return (
                        <Col key={i} xs={24} sm={12} md={8}>
                            <WalletMetricCard
                                title={
                                    <div className="slds-truncate">
                                        <img 
                                            src={token.logo}
                                            style={{
                                                height: '20px',
                                                width: '20px',
                                                borderRadius: '50%'
                                            }}
                                        />
                                        <span className="slds-p-left_small">{token.name}</span>
                                    </div>
                                }
                                metric={`$${token.holdings.toFixed(0)}`}
                                walletBalance={token.walletBalance > 1 ? token.walletBalance.toFixed(2) : token.walletBalance.toFixed(5)}
                                symbol={token.symbol}
                                chain={chain.toLowerCase()}
                                contractAddress={token.contractAddress}
                            />
                        </Col>
                    )
                })}
                </Row>
            )}
        </>
    );
};

export default WalletTokens;