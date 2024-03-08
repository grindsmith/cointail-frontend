import React, { useEffect, useState } from "react";
import Moment from 'moment-timezone';

import { Row, Col, Card, Button, Spin, Divider } from 'antd';
import { LoadingOutlined, CodeOutlined } from '@ant-design/icons';

const WalletTransactions = (props) => {
    const { wallets, walletTransactions } = props;

    function getSite (tx) {
        if (tx.chain === "ethereum") {
            return 'Etherscan';
        } else if (tx.chain === "arbitrum") {
            return 'Arbiscan';
        } else if (tx.chain === "base") {
            return 'Basescan';
        }
    }

    const formatSummary = (tx) => {        
        if (tx.action === "Sent") {
            return (<div>{tx.action} {tx.summary} to <a target="_blank" href={`https://${getSite(tx)}.io/address/${tx.to}`} >{wallets[tx.to] !== undefined ? wallets[tx.to].name : `0x${tx.to.slice(-7)}`}</a></div>);
        } else if (tx.action === "Received") {
            return (<div>{tx.action} {tx.summary} from <a target="_blank" href={`https://${getSite(tx)}.io/address/${tx.from}`}>{wallets[tx.from] !== undefined ? wallets[tx.from].name : `0x${tx.from.slice(-7)}`}</a></div>);
        } else if (tx.action === "Swap") {
            return (<div>Swapped {tx.summary} with <a target="_blank" href={`https://${getSite(tx)}.io/address/${tx.to}`}>0x{tx.to.slice(-7)}</a></div>);
        } 
    }

    return (
        <>
            {walletTransactions.length === 0 ? (
                <Row>
                    <Col span={24} align="center">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    </Col>
                </Row>
            ): (
                walletTransactions.map((tx) => {
                    return (
                        <Card key={tx.hash}>
                            <Row>
                                <Col span={20} align="left">
                                    <h3 className="slds-truncate">{formatSummary(tx)}</h3>
                                    <div>{tx.blockTimestamp} - {tx.chain}</div>
                                </Col>
                                <Col span={4} align="right">
                                    <Button 
                                        title={`View Contract On ${getSite(tx)}`}
                                        type="primary" 
                                        icon={<CodeOutlined />} 
                                        size={'large'} 
                                        onClick={() => { window.open(`https://${getSite(tx)}.io/address/${tx.contractAddress}`, '_blank').focus()}}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    )
                })
            )}
        </>
    );
};

export default WalletTransactions;