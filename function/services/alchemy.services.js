const { Alchemy, Network } = require('alchemy-sdk');
const Axios = require('axios');
const Moment = require('moment-timezone');

/*
* 
*      GET WALLET ERC20 BALANCE
* 
*/
async function getWalletERC20Balance(networkSettings, accountAddress, accountTokens) {
  console.log(`Service: getWalletERC20Balance`);

  const alchemy = new Alchemy(networkSettings);

  let erc20Tokens = await alchemy.core.getTokenBalances(accountAddress);

  /**  IF TOKENS ARE STAKED, YOU DON'T OWN THEM */
  for (let i = 0; i < erc20Tokens.tokenBalances.length; i++){
      let data = await alchemy.core.getTokenMetadata(erc20Tokens.tokenBalances[i].contractAddress);
      
      accountTokens.push({
          label: data.symbol,
          contractAddress: erc20Tokens.tokenBalances[i].contractAddress,
          walletBalance: parseInt(erc20Tokens.tokenBalances[i].tokenBalance) / Math.pow(10, data.decimals),
          ...data
      })
  }

  return accountTokens;
}

/*
* 
*      GET WALLET NATIVE BALANCE
* 
*/
async function getWalletNativeBalance(networkSettings, accountAddress) {
  console.log(`Service: getWalletNativeBalance`);

  const alchemy = new Alchemy(networkSettings);

  let nativeToken = await alchemy.core.getBalance(accountAddress);

  let walletTokens = [];
  walletTokens.push({ 
      label: 'ETH', 
      symbol: 'ETH',
      name: 'Ether',
      contractAddress: 'native', 
      walletBalance: (parseInt(nativeToken) / Math.pow(10, 18)),
      decimals: 18
  });

  return walletTokens;
}

/**
 * 
 *      GET WALLET TRANSACTIONS
 * 
 */
async function getWalletTransactions(networkSettings, accountAddress, numberOfTransactions) {
  console.log(`Service: getWalletTransactions`);

  const alchemy = new Alchemy(networkSettings);

  let assetTransfersFrom = await alchemy.core.getAssetTransfers({
    fromAddress: accountAddress,
    category: ['external', "erc20", "erc721", "erc1155", "specialnft"],
    withMetadata: true,
    excludeZeroValue: true,
    maxCount: 100,
    order: 'desc'
  });

  let assetTransfersTo = await alchemy.core.getAssetTransfers({
    toAddress: accountAddress,
    category: ['external', "erc20", "erc721", "erc1155", "specialnft"],
    withMetadata: true,
    excludeZeroValue: true,
    maxCount: 100,
    order: 'desc'
  });

  let txBoth = assetTransfersFrom.transfers.concat(assetTransfersTo.transfers)
  
  return txBoth.sort((a,b) => {
    if (new Date(a.metadata.blockTimestamp).getTime() < new Date(b.metadata.blockTimestamp).getTime()) {
        return 1;
    } else if (new Date(a.metadata.blockTimestamp).getTime() > new Date(b.metadata.blockTimestamp).getTime()) {
        return -1;
    } else {
        return 0;
    }
  }).slice(0, numberOfTransactions);
}

/*
* 
*      FILTER WALLET TOKENS
* 
*/
async function filterWalletTokens(accountTokens) {
  console.log(`Service: filterWalletTokens`);

  const filteredTokens = [];
  for (let i = 0; i < accountTokens.length; i++) {
    if (accountTokens[i].walletBalance > 0) {
      const dexData = await Axios.get(`https://api.dexscreener.com/latest/dex/tokens/${accountTokens[i].contractAddress}`);

      if (dexData.data.pairs?.length > 0) {
        accountTokens[i].pairs = dexData.data.pairs?.length;
        accountTokens[i].priceUsd = dexData.data.pairs[0].priceUsd;
        accountTokens[i].holdings = accountTokens[i].walletBalance * dexData.data.pairs[0].priceUsd;

        filteredTokens.push(accountTokens[i]);
      }
    }
  }
  
  const sortedTokens = await filteredTokens.sort((a, b) => {
    if (a.pairs < b.pairs) return -1;
    else if (a.pairs > b.pairs) return 1;
    else return 0;
  })

  return sortedTokens;
}

/**
 * 
 *      FORMAT WALLET TRANSACTIONS
 * 
 */
async function formatWalletTransactions(networkSettings, accountAddress, transactions, chain) {
  console.log(`Service: formatWalletTransactions`);

  const alchemy = new Alchemy(networkSettings);
  
  let tmp = {}
  for (let i = 0; i < transactions.length; i++) {
    let txHash = transactions[i].hash;

    if (tmp[txHash]) {
      tmp[txHash].action = "Swap";
      
      tmp[txHash].assetTwo = transactions[i].asset;
      
      tmp[txHash].summary = tmp[txHash].summary + " for " + (transactions[i].value?.toFixed(5) || 0.00) + " " + transactions[i].asset;
      
      tmp[txHash].contractAddressTwo = transactions[i].rawContract.address;
    } else {
      tmp[txHash] = transactions[i]
      
      tmp[txHash].chain = chain;
      
      tmp[txHash].value = transactions[i].value?.toFixed(5) || 0.00;
      
      tmp[txHash].summary = transactions[i].value + " " + transactions[i].asset;
      
      tmp[txHash].blockTimestamp = Moment(transactions[i].metadata.blockTimestamp).tz("America/Chicago").format('lll');
      
      tmp[txHash].contractAddress = transactions[i].rawContract.address;

      if (transactions[i].to.toUpperCase() === accountAddress.toUpperCase()) {
        tmp[txHash].action = "Received";
      } else if (transactions[i].from.toUpperCase() === accountAddress.toUpperCase()) {
        tmp[txHash].action = "Sent";
      }

      let tx = await alchemy.core.getTransactionReceipt(txHash);
      
      tmp[txHash].gas = (tx.gasUsed.toNumber() * 0.0000000001).toFixed(7);
    }
  } 

  return Object.values(tmp);
}

/*
* 
*      FORMAT WALLET TOKENS
* 
*/
async function formatWalletTokens(accountTokens) {
  console.log(`Service: formatWalletTokens`);

  for (let i=0; i < accountTokens.length; i++) {
    try {
      let dexscreener = await Axios.get('https://api.dexscreener.com/latest/dex/search/?q=' + accountTokens[i].symbol + '/USDT');
    
      if (dexscreener.data.pairs.length > 0) {
          accountTokens[i].priceUSD = dexscreener.data.pairs[0].priceUsd;
          accountTokens[i].priceChange1hr = dexscreener.data.pairs[0].priceChange.h1 + '%';
          accountTokens[i].priceChange24hr = dexscreener.data.pairs[0].priceChange.h24 + '%';
          accountTokens[i].url = dexscreener.data.pairs[0].url;
      }
    } catch (err) {
      console.error('Dexscreener Error: ', err);
    }
    
  }

  return accountTokens;
}

/**
 * 
 *      SET NETWORK ENDPOINTS
 * 
 */
async function setNetworkEndpoint(chain, network, functionName) {
  console.log(`Service: setNetworkEndpoint`);

  /** SET NETWORK RPC ENDPOINT */
  let settings = {};

  if (chain === 'ethereum' && network === 'mainnet') {
    settings = { apiKey: process.env.ALCHEMY_API_KEY, network: Network.ETH_MAINNET };
  } else if (chain === 'arbitrum' && network === 'mainnet') {
    settings = { apiKey: process.env.ALCHEMY_API_KEY, network: Network.ARB_MAINNET };
  } else if (chain === 'base' && network === 'mainnet') {
    settings = { apiKey: process.env.ALCHEMY_API_KEY, network: Network.BASE_MAINNET };
  }

  return settings;
}

module.exports = {
  getWalletERC20Balance,
  getWalletNativeBalance,
  getWalletTransactions,
  filterWalletTokens,
  formatWalletTransactions,
  formatWalletTokens,
  setNetworkEndpoint
};
