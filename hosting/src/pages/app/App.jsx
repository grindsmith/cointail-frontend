import { useState, useEffect } from 'react'
import Axios from 'axios';
import { Col, Input, Row, Button, Card, Modal, Spin, Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

import { ReloadOutlined, LoadingOutlined } from '@ant-design/icons';

// Styles
import './App.css'
import WalletHeader from '../../components/wallet/WalletHeader';

function App() {
  // All Wallets
  const [wallets, setWallets] = useState([]);

  // Add Wallet Form
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('ethereum');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getAllWallets();
  }, []);

  const getAllWallets = () => {
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallets`)
    .then((res) => {
      if (res.data) {
        setWallets(res.data.wallets)
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
  }

  const addWallet = async () => {
    Axios.post(`${import.meta.env.VITE_API_URL}/api/wallet`, {
      name,
      address,
      chain
    })
    .then((res) => {
      console.log(res);

      setName('');
      setAddress('');
    })
    .catch((err) => console.log(err));
  }

  return (
    <Layout>
      <Content
        style={{
          marginTop: 64,
          backgroundColor: '#F0F2F5'
        }}
      >
      <h1 style={{ 
        color: '#000', 
        paddingBottom: '1.5rem', 
        fontSize: '45px', 
        fontWeight: '600', 
        textAlign: 'center'
      }}>Cointail</h1>
      <h2 style={{ 
        color: '#f37925', 
        paddingBottom: '1.5rem', 
        fontSize: '24px', 
        fontWeight: '600', 
        textAlign: 'center' 
      }}>Select A Wallet</h2>
      <Row>
        <Col span={24}>
          <Card 
            title="Wallets"
            style={{ minWidth: '50vw'}}
            extra={
              <>
                <Button 
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    setWallets([]);
                    getAllWallets().then((result) => setWallets(result))
                  }}
                />
                <Button 
                  type="primary"
                  style={{ marginLeft: '5px'}}
                  onClick={() => setIsOpen(true)}
                >Add Wallet</Button>
              </>
            }
          >
            <Row>
              {wallets.length === 0 ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
              ): (
                wallets.map((walletMetadata) => {
                  return (
                    <Col key={walletMetadata.address} xs={24} sm={24} md={12} style={{ padding: '.75rem'}}>
                      <WalletHeader walletMetadata={walletMetadata} />
                    </Col>
                  )
                }
              ))}
            </Row>
          </Card>
        </Col>
        <Modal 
          title="Add New Wallet" 
          open={isOpen} 
          onOk={async () => {
            await addWallet();
            await setIsOpen(false);
          }} 
          onCancel={() => setIsOpen(false)}
        >
          <h6 style={{ marginTop: '1rem' }}>Name</h6>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <h6 style={{ marginTop: '1rem' }}>Blockchain <small>(Currently Only Supporting Ethereum)</small></h6>
          <Input value={chain} />
          <h6 style={{ marginTop: '1rem' }}>Address</h6>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </Modal>
      </Row>
      </Content>
    </Layout>
  )
}

export default App
