import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Select, Spin, Layout, Menu, Statistic } from 'antd';
const { Header, Content, Footer } = Layout;
import { LoadingOutlined } from '@ant-design/icons';
import Moment from 'moment-timezone';
import Axios from 'axios';

// Components
import WalletTransactions from "../../components/wallet/WalletTransactions";
import WalletHeader from "../../components/wallet/WalletHeader";
import WalletTokens from "../../components/wallet/WalletTokens";
import WalletMetricCard from "../../components/wallet/WalletMetricCard";

const Wallet = () => {
  const { wallet } = useParams();

  const navigate = useNavigate();

  const [walletMetadata, setWalletMetadata] = useState({});
  const [walletTokens, setWalletTokens] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [activeChain, setActiveChain] = useState('arbitrum');
  const [wallets, setWallets] = useState([]);
  const [items, setItems] = useState([{ key: 1, label: `Home`}, { key: 2, label: `Wallet`}])

  useEffect(() => {
    getWallets();

    getWalletTokensAndTransactions(activeChain);
  }, [wallet, activeChain])

  const getWallets = useCallback(() => {
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallets`).then((res) => {
      if (res.data.wallets) {
        setWallets(res.data.wallets)
      } else {
        console.log(res.data);
      }
    });
  }, []);

  const handleHeaderClick = (key) => {
    console.log(key)
    if (key === '1') {
      navigate('/');
    } else if (key === '2') {
      console.log('Wallet Header Item Click')
    }
  }

  const getWalletTokensAndTransactions = useCallback((chain) => {
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallet/${wallet}`)
      .then((res) => {
        if (res.data?.wallet) {
          setWalletMetadata(res.data.wallet[0]);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log("Wallet Error: ", err));
  
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallet/${wallet}/tokens?chain=${chain}&network=mainnet`)
      .then((res) => {
        if (res.data?.tokens) {
          setWalletTokens(res.data.tokens)
        } else {
          console.log(res);
        }
      })  
      .catch((err) => console.log("Tokens Error: ", err));
  
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallet/${wallet}/transactions?chain=${chain}&network=mainnet`)
      .then((res) => {
        if (res.data?.transactions) {
          setWalletTransactions(res.data.transactions)
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log("Transactions Error: ", err.message));
  }, [wallet, activeChain]);

  return (
    <Layout>
      <Header
        style={{ 
          position: 'fixed', 
          zIndex: 1, 
          width: '100%', 
          alignItems: 'center', 
          display: 'flex' 
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          onClick={(e) => handleHeaderClick(e.key)}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 15%',
          marginTop: 64 
        }}
      >
        <Row>
          <Col span={16} className="slds-p-around_medium">
            <WalletHeader
              walletMetadata={walletMetadata}
              child={[
                <Select
                  key={'change-chain'}
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
                    { value: 'base', label: 'Base' },
                  ]}
                />   
              ]}
            />
                
            <WalletTokens
              style={{ marginTop: '1rem'}}
              chain={activeChain}
              wallet={wallet}
              walletTokens={walletTokens} 
            />
            <h3 className="slds-m-around_medium">Transactions</h3>
            <Row style={{ margin: '1rem' }}>
              <Col span={6} style={{ padding: '5px'}}>
                <Statistic title="Past 24 Hours" value={walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(24, 'hours')).length} />
              </Col>
              <Col span={6} style={{ padding: '5px'}}>
                <Statistic title="Past 7 Days" value={walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(7, 'days')).length} />
              </Col>
              <Col span={6} style={{ padding: '5px'}}>
                <Statistic title="Past 30 Days" value={walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(30, 'days')).length} />
              </Col>
              <Col span={6} style={{ padding: '5px'}}>
                <Statistic title="Past 365 Days" value={walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(365, 'days')).length} />
              </Col>
            </Row>
            <WalletTransactions 
              wallet={wallet}
              walletTransactions={walletTransactions} 
            />
          </Col>
          <Col span={8} className="slds-p-around_medium" >
            
            <h3>Other Wallets</h3>
            {wallets.length > 0 ? wallets.map((walletMetadata, i) => {
              return (
                <div key={i} style={{ marginTop: '.5rem'}}>
                  <WalletHeader walletMetadata={walletMetadata} />
                </div>
              )
            }) : (<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />)}
          </Col>
        </Row>
      </Content>
    </Layout>
  )
};

export default Wallet;