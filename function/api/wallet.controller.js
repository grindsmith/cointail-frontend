require('dotenv').config();

const Alchemy = require('../services/alchemy.services');

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

    console.log(chain, network, wallet);
  
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

    const wallets = [{
        'address': '0x8a76eA819F06b974b75f22C63727c7335f7ebdc3',
        'name': 'Evan',
        'chain': 'ethereum'
    },{
        'address': '0xadf27ee1A23D5Df947d37CF65f1a10872e03d333',
        'name': 'Soham',
        'chain': 'ethereum'
    },{
        'address': '0xEBe035dA5DF98E8297D31cFD1c249732a6d6d3bA',
        'name': 'Evan',
        'chain': 'ethereum'
    }];

    return res.json({ 'wallets': wallets});
}


module.exports = {
    getWalletTokens,
    getWalletTransactions,
    getWallets
};
