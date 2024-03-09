import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Select, Spin, Layout, Menu, Statistic, Breadcrumb, Tabs } from 'antd';
const { Header, Content, Footer } = Layout;
import { LoadingOutlined, HomeFilled, WalletFilled } from '@ant-design/icons';
import Moment from 'moment-timezone';
import Axios from 'axios';

import './Wallet.css';

// Components
import WalletTransactions from "../../components/wallet/WalletTransactions";
import WalletHeader from "../../components/wallet/WalletHeader";
import WalletTokens from "../../components/wallet/WalletTokens";
import WalletMetricCard from "../../components/wallet/WalletMetricCard";

const Wallet = () => {
  const { wallet } = useParams();

  const navigate = useNavigate();

  const [items, setItems] = useState([{ key: 1, label: `Home`, icon: <HomeFilled />}, { key: 2, label: `Wallet`, icon: <WalletFilled /> }])
  const [wallets, setWallets] = useState({});
  const [walletMetadata, setWalletMetadata] = useState({});
  const [activeChain, setActiveChain] = useState('arbitrum');

  // Arbitrum
  const [arbTokensLoading, setArbTokensLoading] = useState(false);
  const [arbWalletTokens, setArbWalletTokens] = useState([]);

  // Base
  const [baseTokensLoading, setBaseTokensLoading] = useState(false);
  const [baseWalletTokens, setBaseWalletTokens] = useState([]);

  // Ethereum
  const [ethTokensLoading, setEthTokensLoading] = useState(false);
  const [ethWalletTokens, setEthWalletTokens] = useState([]);

  // Transactions
  const [walletTransactions, setWalletTransactions] = useState([]);

  useEffect(() => {
    getWallets();

    getWalletTokensAndTransactions(activeChain);
  }, [wallet]);

  const getWallets = useCallback(() => {
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallets`).then((res) => {
      if (res.data.wallets) {
        let tmp = {};
        for (let i = 0; i < res.data.wallets.length; i++) {
          tmp[res.data.wallets[i].address] = res.data.wallets[i];
        }

        setWallets(tmp)
      } else {
        console.log(res.data);
      }
    });
  }, []);

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
  
    // Arbitrum Tokens
    setArbTokensLoading(true);
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallet/${wallet}/tokens?chain=arbitrum&network=mainnet`)
      .then((res) => {
        if (res.data?.tokens) {
          setArbWalletTokens(res.data.tokens)
        } else {
          console.log(res);
        }

        setArbTokensLoading(false);
      })  
      .catch((err) => console.log("Tokens Error: ", err));

    // Base Tokens
    setBaseTokensLoading(true);
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallet/${wallet}/tokens?chain=base&network=mainnet`)
      .then((res) => {
        if (res.data?.tokens) {
          setBaseWalletTokens(res.data.tokens)
        } else {
          console.log(res);
        }

        setBaseTokensLoading(false);
      })  
      .catch((err) => console.log("Tokens Error: ", err));

    // Ethereum Tokens
    setEthTokensLoading(true);
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallet/${wallet}/tokens?chain=ethereum&network=mainnet`)
      .then((res) => {
        if (res.data?.tokens) {
          setEthWalletTokens(res.data.tokens)
        } else {
          console.log(res);
        }

        setEthTokensLoading(false);
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
  }, [wallet]);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallet/${wallet}/transactions?chain=${activeChain}&network=mainnet`)
    .then((res) => {
      if (res.data?.transactions) {
        setWalletTransactions(res.data.transactions)
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log("Transactions Error: ", err.message));
  }, [activeChain]);

  const handleHeaderClick = (key) => {
    console.log(key)
    if (key === '1') {
      navigate('/');
    } else if (key === '2') {
      console.log('Wallet Header Item Click')
    }
  }

  return (
    <Layout>
      <Header
        style={{ 
          zIndex: 1, 
          width: '100%', 
          alignItems: 'left', 
          display: 'flex',
          backgroundColor: '#F0F2F5',
          padding: '0'
        }}
      >
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          onClick={(e) => handleHeaderClick(e.key)}
          style={{
            flex: 1,
            backgroundColor: '#F0F2F5',
            border: 'none'
          }}
        />
      </Header>
      <Content>
        <Breadcrumb
          style={{
            margin: '16px',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Wallet</Breadcrumb.Item>
          <Breadcrumb.Item>{walletMetadata.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col xs={24} sm={24} md={24} className="slds-p-around_medium">
            <h3 className="slds-m-around_medium">Wallet</h3>
            <WalletHeader walletMetadata={walletMetadata} />
            <Tabs
              className="slds-m-top_large"
              defaultActiveKey="1"
              size={2}
              style={{ marginBottom: 32 }}
              items={[{
                  label: `Current Holdings`,
                  key: 1,
                  children:
                  <div>
                    <WalletTokens
                      chain={'Arbitrum'}
                      wallet={wallet}
                      walletTokens={arbWalletTokens} 
                      isLoading={arbTokensLoading}
                    />
                    <WalletTokens
                      chain={'Base'}
                      wallet={wallet}
                      walletTokens={baseWalletTokens} 
                      isLoading={baseTokensLoading}
                    />
                    <WalletTokens
                      chain={'Ethereum'}
                      wallet={wallet}
                      walletTokens={ethWalletTokens} 
                      isLoading={ethTokensLoading}
                    />
                  </div>,
                }, {
                  label: `Past Transactions`,
                  key: 2,
                  children: 
                    <div>
                      <Select
                        key={'change-chain'}
                        title="Change Chain"
                        defaultValue={activeChain}
                        style={{ width: 120 }}
                        onChange={(chain) => {
                          setArbWalletTokens([]);
                          setWalletTransactions([]);
                          setActiveChain(chain)
                        }}
                        options={[
                          { value: 'ethereum', label: 'Ethereum' },
                          { value: 'arbitrum', label: 'Arbitrum' },
                          { value: 'base', label: 'Base' },
                        ]}
                      />   
                      <Row style={{ margin: '1rem' }}>
                        <Col span={6} style={{ padding: '5px'}}>
                          <Statistic title="24 Hours" value={walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(24, 'hours')).length} />
                        </Col>
                        <Col span={6} style={{ padding: '5px'}}>
                          <Statistic title="7 Days" value={walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(7, 'days')).length} />
                        </Col>
                        <Col span={6} style={{ padding: '5px'}}>
                          <Statistic title="30 Days" value={walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(30, 'days')).length} />
                        </Col>
                        <Col span={6} style={{ padding: '5px'}}>
                          <Statistic title="365 Days" value={walletTransactions.filter((tx) => Moment(tx.blockTimestamp) > Moment().subtract(365, 'days')).length} />
                        </Col>
                      </Row>
                      <WalletTransactions 
                        wallet={wallet}
                        wallets={wallets}
                        walletTransactions={walletTransactions} 
                      />
                    </div>
                  ,
                }, {
                  label: `Other Wallets`,
                  key: 3,
                  children: (
                    Object.values(wallets).map((walletMetadata, i) => {
                      if (walletMetadata.address !== wallet) {
                        return (
                          <div key={i} style={{ marginTop: '.5rem'}}>
                            <WalletHeader walletMetadata={walletMetadata} />
                          </div>
                        )
                      }
                    })
                  )
                }]
              }
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
};

export default Wallet;