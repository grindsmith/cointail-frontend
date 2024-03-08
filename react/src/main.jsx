import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import './styles/slds.css';
import './styles/ant-design.css';
import './styles/responsive.css';
import Wallet from './pages/wallet/Wallet.jsx';
import App from './pages/app/App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="app-root">
            <App />
          </div>
        } />
        <Route path="/wallet/:wallet" element={
          <div className="wallet-root">
            <Wallet />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
