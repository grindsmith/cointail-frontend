import { useState, useEffect } from 'react'
import Axios from 'axios';
import { Col, Input, Row, Button, Card, Modal } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

// Styles
import './App.css'
import WalletHeader from './components/WalletHeader';

function App() {
  // All Wallets
  const [wallets, setWallets] = useState([]);

  // Add Wallet Form
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('ethereum');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_API_URL}/api/wallets`).then((res) => setWallets(res.data.wallets))
  }, []);

  const addWallet = async () => {
    //const newDoc = await firestoreDB.collection('wallet').add({ name, address, chain });
  }

  return (
    <>
      <h1 style={{ textAlign: 'left'}}>Cointail</h1>
      <h2 style={{ textAlign: 'left', color: '#f37925' }}>Select A Wallet</h2>
      <Row>
        <Col span={24}>
          <Card 
            title=""
            style={{ minWidth: '50vw'}}
            extra={
              <>
                <Button 
                  icon={<ReloadOutlined />}
                  onClick={() => getAllDocuments('wallet').then((result) => setWallets(result))}
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
              {wallets.map((walletMetadata) => {
                return (
                  <Col span={12} style={{ padding: '.75rem'}}>
                    <WalletHeader walletMetadata={walletMetadata} />
                  </Col>
                )
              })}
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
    </>
  )
}

export default App
