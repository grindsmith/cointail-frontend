import React, { useEffect } from "react";

import { Row, Col, Button, Card } from 'antd';

import { useNavigate, useParams } from "react-router-dom";

const WalletHeader = (props) => {
  const { wallet } = useParams();

  const { walletMetadata } = props;

  const navigate = useNavigate();

  return (
    <>
        <Card 
            title={walletMetadata.name} 
            extra={wallet !== walletMetadata.address ? (<Button 
                    onClick={() => navigate(`/wallet/${walletMetadata.address}`, { replace: true })}
                    type={'default'}
                >View</Button>
            ) : <></>}
        >
            
            <Row>
                <Col span={24}>
                    <div>{walletMetadata.address?.substring(0,25)}</div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{walletMetadata.chain?.toUpperCase()}</div>
                </Col>
            </Row>            
        </Card>
    </>
  )
};

export default WalletHeader;