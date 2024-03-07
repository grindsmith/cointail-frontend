import React, { useEffect } from "react";

import { Row, Col, Button, Card } from 'antd';
import '../../styles/slds.css';

import { useNavigate, useParams } from "react-router-dom";

const WalletHeader = ({ walletMetadata, child }) => {
  const { wallet } = useParams();

  const navigate = useNavigate();

  return (
    <Card type="inner" title={walletMetadata.name} extra={wallet !== walletMetadata.address ? (
        <Button 
            onClick={() => navigate(`/wallet/${walletMetadata.address}`, { replace: true })}
            type={'default'}
        >View</Button>
    ) : (child?.length > 0 ? child[0] : null)}>
        <small className="slds-truncate">{walletMetadata.chain === 'ethereum' ? `0x${walletMetadata.address?.slice(5)}` : walletMetadata.address?.slice(5)}</small>
    </Card>         
  )
};

export default WalletHeader;
