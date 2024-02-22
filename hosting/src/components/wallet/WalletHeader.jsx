import React, { useEffect } from "react";

import { Row, Col, Button, Card } from 'antd';

import { useNavigate, useParams } from "react-router-dom";

const WalletHeader = ({ walletMetadata, child }) => {
  const { wallet } = useParams();

  const navigate = useNavigate();

  console.log(child)

  return (
    <Card>
        <Row>
            <Col span={18}>
                <h4>{walletMetadata.name}</h4>
                <small className="slds-truncate">{walletMetadata.chain === 'ethereum' ? `0x${walletMetadata.address?.slice(5)}` : walletMetadata.address?.slice(5)}</small>
            </Col>
            <Col span={6} align="right">
                {wallet !== walletMetadata.address ? (
                    <Button 
                        onClick={() => navigate(`/wallet/${walletMetadata.address}`, { replace: true })}
                        type={'default'}
                    >View</Button>
                ) : (child?.length > 0 ? child[0] : null)}
            </Col>
        </Row>
    </Card>         
  )
};

export default WalletHeader;
