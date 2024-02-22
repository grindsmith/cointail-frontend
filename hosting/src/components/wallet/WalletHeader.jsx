import React, { useEffect } from "react";

import { Row, Col, Button, Card } from 'antd';

import { useNavigate, useParams } from "react-router-dom";

const WalletHeader = (props) => {
  const { wallet } = useParams();

  const { walletMetadata } = props;

  const navigate = useNavigate();

  return (
    <Card>
        <Row>
            <Col span={18}>
                <div>{walletMetadata.name}</div>
                <small style={{ fontWeight: '400'}}>{walletMetadata.chain === 'ethereum' ? `0x${walletMetadata.address?.slice(5)}` : walletMetadata.address}</small>
            </Col>
            <Col span={6}>
                {wallet !== walletMetadata.address ? (
                    <Button 
                        onClick={() => navigate(`/wallet/${walletMetadata.address}`, { replace: true })}
                        type={'default'}
                    >View</Button>
                ) : (<></>)}
            </Col>
        </Row>
    </Card>         
  )
};

export default WalletHeader;
