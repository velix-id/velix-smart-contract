// globals

var web3 = null;

var contract = {
    button: null,
    input: null,
    abi: null
}

var loadedContract = null

var scName = null;
var scCode = null;

var addresses = {};

$(init);

function init() {
    setupWeb3();

    contract.button = $('#load-contract-btn');
    contract.input = $('#contract-address');
    contract.abi = $('#contract-abi');

    scName = $("#sc-name");
    scCode = $("#sc-code");

    contract
        .button
        .click(loadContract);
}

function setupWeb3() {
    // web3 = new Web3(new
    // Web3.providers.HttpProvider('https://kovan.etherscan.io/api'));

    web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

}

function loadContract() {
    var abi = JSON.parse(contract.abi.val());
    var address = contract
        .input
        .val();
    loadedContract = web3
        .eth
        .contract(abi)
        .at(address);

    var events = loadedContract.allEvents(function (error, log) {
        if (!error) 
            console.log('SC EVENT', log);
        }
    );

    loadedContract.name(setname);
    loadedContract.symbol(setsymbol);
    loadedContract.owner(addOwnerAdderess);

}

function setname(err, name) {
    console.log('name', name);

    scName.html(name);
}
function setsymbol(err, symbol) {
    console.log('symbol', symbol);

    scCode.html(symbol);
}

function addOwnerAdderess(err, address) {
    console.log('owner', address);

    addAddress(address);
    renderAddresses();
}

function addAddress(address, privateKey) {
    addresses[address] = {
        address: address,
        privateKey: privateKey
    };
}

function renderAddresses() {
    for (const address in addresses) {
        if (addresses.hasOwnProperty(address)) {
            const element = addresses[address];
            $("<tr id=\"addr-" + address + "\"><td class=\"address\">" + address + "</td><td class=\"eth\"></td><td class=\"vxd\"></td><td class=\"can-transfer\"></" +
                    "td><td class=\"is-RA\"></td><td class=\"owner\"></td></tr>").appendTo("table tbody");

        }
    }
}
