import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import './styles/globals.css';
import './styles/main.css';
import './styles/responsive.css';
import Wallet from './pages/wallet/Wallet.jsx';
import App from './pages/app/App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/wallet/:wallet" element={<Wallet />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
