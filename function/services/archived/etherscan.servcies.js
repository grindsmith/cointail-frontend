require('dotenv').config();

const Axios = require('axios');
const Web3 = require('web3')

async function getContract(address) {
    let web3 = new Web3(new Web3.providers.HttpProvider());

    await Axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}`)
    .then((response) => {
        let contractABI = JSON.parse(response.data.result);

        if (contractABI != ''){
            let contract = new web3.eth.Contract(contractABI);

            console.log(contract.methods);

            contract.methods.owner().call((error, result) => {
                if (error) {
                  console.error('Error calling owner():', error);
                } else {
                  console.log('Owner:', result);
                }
            });
        }
    });
}

getContract('0xEBe035dA5DF98E8297D31cFD1c249732a6d6d3bA');

