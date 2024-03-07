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
          backgroundColor: '#F0F2F5'
        }}
      >
      <Row>
        
        <Col xs={24} sm={24} md={24} lg={15}>
          <div className="slds-p-top_xx-large app-wallets">
            <h1 style={{ 
              color: '#000', 
              paddingBottom: '.75rem', 
              fontSize: '45px', 
              fontWeight: '600', 
              textAlign: 'center'
            }}>Cointail</h1>
            <h2 style={{ 
              color: '#1677ff', 
              paddingBottom: '3rem', 
              fontSize: '16px', 
              fontWeight: '600', 
              textAlign: 'center' 
            }}>Select An Existing Wallet</h2>
            <Card 
              title="Wallets"
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
                  <Col span={24} align="center">
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                  </Col>
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
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={9}>
          <div 
            style={{ 
              minHeight: '100vh', 
              minWidth: '100%',
              backgroundColor: "#000",
              position: "absolute",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: '100% 100%',
              backgroundImage:"url('../../../public/images/cointail_home_background_2.webp')"
            }} 
            className="slds-p-around_xx-large"
          > 
            <Row className="slds-p-top_xx-large">
              <Col span={24}></Col>
            </Row>
          </div>
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
