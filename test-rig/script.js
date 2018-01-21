// globals

var web3 = null;




$(init);

function init() {
    setupWeb3();
}

function setupWeb3() {
    web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.etherscan.io/api'));
}

