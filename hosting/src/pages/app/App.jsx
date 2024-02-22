import { useState, useEffect } from 'react'
import Axios from 'axios';
import { Col, Input, Row, Button, Card, Modal, Spin } from 'antd';
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
    //const newDoc = await firestoreDB.collection('wallet').add({ name, address, chain });
  }

  return (
    <div className="root">
      <h1 style={{ textAlign: 'left', color: '#fff', paddingTop: '3rem'}}>Cointail</h1>
      <h2 style={{ textAlign: 'left', color: '#f37925' }}>Select A Wallet</h2>
      <Row>
        <Col span={24}>
          <Card 
            title="WAGMI Wallets"
            type="inner"
            style={{ minWidth: '50vw'}}
            extra={
              <>
                <Button 
                  icon={<ReloadOutlined />}
                  onClick={() => getAllWallets().then((result) => setWallets(result))}
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
                    <Col key={walletMetadata.address} span={12} style={{ padding: '.75rem'}}>
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
          onOk={() => setIsOpen(false)} 
          onCancel={() => setIsOpen(false)}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Input value={chain} onChange={(e) => setChain(e.target.value)} />
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          <Button onClick={addWallet}>Add Wallet</Button>
        </Modal>
      </Row>
    </div>
  )
}

export default App
