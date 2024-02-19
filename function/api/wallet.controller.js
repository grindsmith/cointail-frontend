require('dotenv').config();

const Alchemy = require('../services/alchemy.services');
const { 
    getWalletDocuments, 
    getAllDocuments 
} = require('../services/firestore.services');

async function getWalletTokens(req, res) {
    console.log('API Endpoint: getWalletTokens');

    const { wallet } = req.params;

    const { chain, network } = req.query;

    let settings = await Alchemy.setNetworkEndpoint(chain, network, 'getWalletTokens');

    let nativeTokens = await Alchemy.getWalletNativeBalance(settings, wallet);

    let walletTokens = await Alchemy.getWalletERC20Balance(settings, wallet, nativeTokens);

    let nonZeroTokens = await Alchemy.filterWalletTokens(walletTokens);

    let tokens = await Alchemy.formatWalletTokens(nonZeroTokens);

    return res.json({ 'tokens': tokens });
};

async function getWalletTransactions(req, res) {
    console.log('API Endpoint: getWalletTransactions');
  
    const { wallet } = req.params;

    const { chain, network } = req.query;
  
    try {
        let settings = await Alchemy.setNetworkEndpoint(chain, network, 'getWalletTransactions');
        
        let unformattedTxs = await Alchemy.getWalletTransactions(settings, wallet, 50);
        
        let transactions = await Alchemy.formatWalletTransactions(settings, wallet, unformattedTxs, chain);

        return res.status(200).json({ 'transactions': transactions});
    } catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
};

async function getWallets(req, res) {
    console.log('API Endpoint: getWallets');

    const walletDocuments = await getAllDocuments("wallet");

    console.log(walletDocuments)

    return res.json({ 'wallet': walletDocuments});
}

async function getWallet(req, res) {
    const { wallet } = req.params;

    const walletDoc = await getWalletDocuments("wallet", "address", wallet);

    return res.json({ 'wallet': walletDoc});
}


module.exports = {
    getWalletTokens,
    getWalletTransactions,
    getWallets,
    getWallet
};
