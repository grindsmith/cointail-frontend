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
        const actionName = tx.action === "Received" ? "from" : "to";
        
        return (
            <div>
                {tx.action} {tx.summary} {tx.action === "Received" ? "from" : "to" }
                {!tx.toIsContract ? (
                    <a target="_self" href={`/wallet/${tx[actionName]}`} className="slds-m-left_xx-small">
                        {wallets[tx[actionName]] !== undefined ? wallets[tx[actionName]].name : `0x${tx[actionName].slice(-7)}`} [Wallet]
                    </a>
                ) : <span className="slds-m-left_xx-small">0x{tx[actionName].slice(-7)} [Contract]</span> }
            </div>
        );
    }

    const getCounterPartyWallet = (tx) => {        
        if (tx.action === "Sent") {
            return tx.to;
        } else if (tx.action === "Received") {
            return tx.from;
        } else if (tx.action === "Swap") {
            return tx.to;
        } else {
            return null;
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
                        <Card key={tx.hash} type="inner" className="slds-m-bottom_xx-small">
                            <Row>
                                <Col span={20} align="left">
                                    <div><small>{tx.blockTimestamp}</small></div>
                                    <h3 className="slds-truncate">{formatSummary(tx)}</h3>
                                    <div>{tx.category.toUpperCase()}</div>
                                </Col>
                                <Col span={4} align="right" className="slds-m-top_small">
                                    {/*getCounterPartyWallet(tx) !== null ? (
                                        <Button 
                                            title={`View Other Wallet`}
                                            type="primary" 
                                            icon={<CodeOutlined />} 
                                            size={'large'} 
                                            onClick={() => { window.open(`/wallet/${getCounterPartyWallet(tx)}`, '_self').focus()}}
                                        />
                                    ) : <></> */}
                                    {tx.contractAddress !== null ? (
                                        <Button 
                                            title={`View Contract On ${getSite(tx)}`}
                                            type="primary" 
                                            icon={<CodeOutlined />} 
                                            size={'large'} 
                                            onClick={() => { window.open(`https://${getSite(tx)}.io/address/${tx.contractAddress}`, '_blank').focus()}}
                                        />
                                    ) : <></>}
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