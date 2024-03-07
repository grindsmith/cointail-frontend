import React, { useEffect, useState } from "react";
import Moment from 'moment-timezone';

import { Row, Col, Card, Button, Spin, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const WalletTransactions = (props) => {
    const { walletTransactions } = props;

    const formatSummary = (tx) => {
        let site = 'etherscan';

        if (tx.chain === "arbitrum") {
            site = 'arbiscan'
        }

        if (tx.action === "Sent") {
            return (<div>{tx.action} {tx.summary} to <a target="_blank" href={`https://${site}.io/address/${tx.to}`} >0x{tx.to.slice(-5)}</a></div>);
        } else if (tx.action === "Received") {
            return (<div>{tx.action} {tx.summary} from <a target="_blank" href={`https://${site}.io/address/${tx.from}`}>0x{tx.to.slice(-5)}</a></div>);
        } else if (tx.action === "Swap") {
            return (<div>{tx.action} {tx.summary} with <a target="_blank" href={`https://${site}.io/address/${tx.to}`}>0x{tx.to.slice(-5)}</a></div>);
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
                                <Col span={6} align="left">{tx.blockTimestamp}</Col>
                                <Col span={16}>{formatSummary(tx)}</Col>
                                <Col span={2} align="right">{tx.chain.slice(0,3).toUpperCase()}</Col>
                            </Row>
                        </Card>
                    )
                })
            )}
        </>
    );
};

export default WalletTransactions;