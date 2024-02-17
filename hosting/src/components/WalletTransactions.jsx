import React, { useEffect, useState } from "react";
import Moment from 'moment-timezone';

import { Row, Col, Card, Button, Spin, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const WalletTransactions = (props) => {
    const { walletTransactions } = props;

    return (
        <>
            <Card 
                title="Wallet Transactions" 
                type="inner"
            >
                {walletTransactions.length === 0 ? (
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                ): (
                    walletTransactions.map((tx) => {
                        return (
                            <Row key={tx.hash}>
                                <Col span={24}>{tx.action} {tx.summary} on {tx.blockTimestamp}</Col>
                                <Divider style={{ margin: 0 }} />
                            </Row>
                        )
                    })
                )}
            </Card>
        </>
    );
};

export default WalletTransactions;