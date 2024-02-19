import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Select } from 'antd';
import Moment from 'moment-timezone';
import Axios from 'axios';

// Components
import WalletTransactions from "../../components/wallet/WalletTransactions";
import WalletHeader from "../../components/wallet/WalletHeader";
import WalletTokens from "../../components/wallet/WalletTokens";
import WalletMetricCard from "../../components/wallet/WalletMetricCard";

const Wallet = () => {
  const { wallet } = useParams();

  const [walletMetadata, setWalletMetadata] = useState({});
  const [walletTokens, setWalletTokens] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [activeChain, setActiveChain] = useState('arbitrum');

  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    getWalletTokensAndTransactions(activeChain);

    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallets`).then((res) => setWallets(res.data.wallet));
  }, [activeChain]);

  const getWalletTokensAndTransactions = async (chain) => {
    await Axios.get(`${import.meta.env.VITE_API_URL}/api/wallet/${wallet}`)
      .then((res) => res.data.wallet?.length > 0 ? setWalletMetadata(res.data.wallet[0]) : setWalletMetadata({}))  
      .catch((err) => console.log("Tokens Error: ", err));
  
    await Axios.get(`${import.meta.env.VITE_API_URL}/api/wallet/${wallet}/tokens?chain=${chain}&network=mainnet`)
      .then((res) => setWalletTokens(res.data.tokens))  
      .catch((err) => console.log("Tokens Error: ", err));
  
    await Axios.get(`${import.meta.env.VITE_API_URL}/api/wallet/${wallet}/transactions?chain=${chain}&network=mainnet`)
      .then((res) => setWalletTransactions(res.data.transactions))
      .catch((err) => console.log("Transactions Error: ", err.message));
  }

  return (
    <div className="root">
      <Row>
        <Col span={16} className="slds-p-around_medium">
          <WalletHeader
            walletMetadata={walletMetadata}
          />
          <Row style={{ marginTop: '1rem', marginBottom: '1rem'}}>
            <Col span={6} style={{ padding: '5px'}}>
              <WalletMetricCard
                title={`Past 24 Hours`}
                metric={walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(24, 'hours')).length}
                metricType={`Transactions`}
              />
            </Col>
            <Col span={6} style={{ padding: '5px'}}>
              <WalletMetricCard
                title={`Past 7 Days`}
                metric={walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(7, 'days')).length}
                metricType={`Transactions`}
              />
            </Col>
            <Col span={6} style={{ padding: '5px'}}>
              <WalletMetricCard
                title={`Past 30 Days`}
                metric={walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(30, 'days')).length}
                metricType={`Transactions`}
              />
            </Col>
            <Col span={6} style={{ padding: '5px'}}>
              <WalletMetricCard
                title={`Past 365 Days`}
                metric={walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(365, 'days')).length}
                metricType={`Transactions`}
              />
            </Col>
          </Row>
          <WalletTransactions 
            wallet={wallet}
            walletTransactions={walletTransactions} 
          />
        </Col>
        <Col span={8} className="slds-p-around_medium" >
          <Card title="Actions" type="inner" style={{ marginBottom: '1rem'}}>
            <Select
              title="Change Chain"
              defaultValue={activeChain}
              style={{ width: 120 }}
              onChange={(chain) => {
                setWalletTokens([]);
                setWalletTransactions([]);
                setActiveChain(chain)
              }}
              options={[
                { value: 'ethereum', label: 'Ethereum' },
                { value: 'arbitrum', label: 'Arbitrum' },
              ]}
            />   
          </Card>

          <WalletTokens
            style={{ marginTop: '1rem'}}
            chain={activeChain}
            wallet={wallet}
            walletTokens={walletTokens} 
          />
          <Card title={'Other Wallets'} style={{ marginTop: '1rem'}} type="inner">
            {wallets.map((walletMetadata, i) => {
              return (
                <div key={i} style={{ marginTop: '.5rem'}}>
                  <WalletHeader walletMetadata={walletMetadata} />
                </div>
              )
            })}
          </Card>
        </Col>
      </Row>
    </div>
  )
};

export default Wallet;