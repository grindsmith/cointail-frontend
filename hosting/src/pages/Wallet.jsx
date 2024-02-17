import React, { useEffect, useState } from "react";
import Axios from 'axios';
import {  useParams } from "react-router-dom";
import { Row, Col, Card } from 'antd';
import Moment from 'moment-timezone';

// Services
// import { getSortedWalletTransactions, getWalletTokens } from "../services/alchemy";
import WalletTransactions from "../components/WalletTransactions";
// import { getWalletDocuments } from "../services/firestore";
import WalletHeader from "../components/WalletHeader";
import WalletTokens from "../components/WalletTokens";

const Wallet = () => {
  const { wallet } = useParams();

  const [walletMetadata, setWalletMetadata] = useState({});
  const [walletTokens, setWalletTokens] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallet/${wallet}/tokens?chain=arbitrum&network=mainnet`)
      .then((res) => {
        console.log("Tokens: ", res.data.transactions);

        setWalletTokens(res.data.tokens)
      })  
      .catch((err) => console.log("Tokens Error: ", err));
    
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallet/${wallet}/transactions?chain=arbitrum&network=mainnet`)
      .then((res) => {
        console.log("Transactions: ", res.data.transactions);

        setWalletTransactions(res.data.transactions)
      })
      .catch((err) => console.log("Transactions Error: ", err.message));
  }, []);

  return (
    <>
      <Row>
        <Col span={16} className="slds-p-around_medium">
          {/*
          <WalletHeader
            wallet={wallet}
            walletMetadata={walletMetadata}
          />
          */}
        </Col>
        <Col span={8} className="slds-p-around_medium">
          <Card title="Wallet Actions">
            
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={16} className="slds-p-around_medium">
          <Row>
            <Col span={6} style={{ padding: '5px'}}>
              <Card>
                <div>Past 24 Hours</div>
                <div>{walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(24, 'hours')).length} </div>
                <div>Transactions</div>
              </Card>
            </Col>
            <Col span={6} style={{ padding: '5px'}}>
              <Card>
                <div>Past 7 Days</div>
                <div>{walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(7, 'days')).length} </div>
                <div>Transactions</div>
              </Card>
            </Col>
            <Col span={6} style={{ padding: '5px'}}>
              <Card>
                <div>Past 30 Days</div>
                <div>{walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(30, 'days')).length} </div>
                <div>Transactions</div>
              </Card>
            </Col>
            <Col span={6} style={{ padding: '5px'}}>
              <Card>
                <div>Past Year</div>
                <div>{walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(365, 'days')).length} </div>
                <div>Transactions</div>
              </Card>
            </Col>
          </Row>
          <WalletTransactions 
            wallet={wallet}
            walletTransactions={walletTransactions} 
          />
        </Col>
        <Col span={8} className="slds-p-around_medium">
          
          <WalletTokens
            wallet={wallet}
            walletTokens={walletTokens} 
          />
        </Col>
      </Row>
    </>
  )
};

export default Wallet;