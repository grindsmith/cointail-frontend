import React, { useEffect } from "react";

import { Row, Col, Button, Card } from 'antd';
import '../../styles/slds.css';

import { useNavigate, useParams } from "react-router-dom";

const WalletHeader = ({ walletMetadata, child }) => {
  const { wallet } = useParams();

  const navigate = useNavigate();

  console.log()

  return (
    <Card>
      <Row>
        <Col xs={20}>
          <h3>{walletMetadata.name || 'Unknown Wallet'}</h3>
          <small className="slds-truncate">{walletMetadata.chain === 'ethereum' ? `0x${walletMetadata.address?.slice(5)}` : walletMetadata.address?.slice(5)}</small>
        </Col>
        <Col span={4} align="right">
          {wallet !== walletMetadata.address ? (
            <Button 
              onClick={() => navigate(`/wallet/${walletMetadata.address}`, { replace: true })}
              type={'default'}
            >View</Button>
          ) : <></>}
        </Col>
      </Row>
    </Card>         
  )
};

export default WalletHeader;
