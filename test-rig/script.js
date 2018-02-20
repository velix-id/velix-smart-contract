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
    // web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8545'));
    web3.setProvider(new web3.providers.HttpProvider('https://api.myetherapi.com/eth'));

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

function createAccounts(numberOfAccounts) {
    var n = parseInt(numberOfAccounts);    
    var output = '';
    
    for (let i = 0; i < n; i++) {
        
        var account = web3.eth.accounts.create();
        output += account.address + ',' + 'Pseaudo Account #' + (i+1) + ',' + account.privateKey + '\n';        
    }
    console.log(output);
}


function deploy() {
    const BigNumber = web3.BigNumber;
    const totalSupply = new BigNumber("100000000000000000000000000");
    var _name = "Velix ID Token" /* var of type string here */ ;
var _symbol = "VXD" /* var of type string here */ ;
var _initialSupply = totalSupply.toNumber() /* var of type uint256 here */ ;
var _decimals = 18 /* var of type uint256 here */ ;
var velixidtokenContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"state","type":"bool"}],"name":"setTransferAgent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setReleaseAgent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"burnAmount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"}],"name":"setTokenInformation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"releaseTokenTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"transferAgents","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"released","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"releaseAgent","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"BURN_ADDRESS","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_initialSupply","type":"uint256"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newName","type":"string"},{"indexed":false,"name":"newSymbol","type":"string"}],"name":"UpdatedTokenInformation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"burner","type":"address"},{"indexed":false,"name":"burnedAmount","type":"uint256"}],"name":"Burned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"canTransfer","type":"bool"},{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"isTransferAgent","type":"bool"},{"indexed":false,"name":"isReleased","type":"bool"}],"name":"CanTransferChecked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]);
var velixidtoken = velixidtokenContract.new(
   _name,
   _symbol,
   _initialSupply,
   _decimals,
   {
     from: web3.eth.accounts[0], 
     data: '0x60606040526000600260146101000a81548160ff02191690831515021790555034156200002b57600080fd5b60405162001c9038038062001c908339810160405280805182019190602001805182019190602001805190602001909190805190602001909190505033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008214151515620000b957600080fd5b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550836006908051906020019062000112929190620001ac565b5082600790805190602001906200012b929190620001ac565b50816000819055508060088190555060005460046000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505050506200025b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001ef57805160ff191683800117855562000220565b8280016001018555821562000220579182015b828111156200021f57825182559160200191906001019062000202565b5b5090506200022f919062000233565b5090565b6200025891905b80821115620002545760008160009055506001016200023a565b5090565b90565b611a25806200026b6000396000f300606060405260043610610112576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806302f652a31461011757806306fdde031461015b578063095ea7b3146101e957806318160ddd1461024357806323b872dd1461026c57806329ff4f53146102e5578063313ce5671461031e57806342966c68146103475780634eee966f1461036a5780635f412d4f1461040a57806370a082311461041f578063867c28571461046c5780638da5cb5b146104bd57806395d89b411461051257806396132521146105a0578063a9059cbb146105cd578063d1f276d314610627578063dd62ed3e1461067c578063f2fde38b146106e8578063fccc281314610721575b600080fd5b341561012257600080fd5b610159600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610776565b005b341561016657600080fd5b61016e610851565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101ae578082015181840152602081019050610193565b50505050905090810190601f1680156101db5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156101f457600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506108ef565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b610256610a76565b6040518082815260200191505060405180910390f35b341561027757600080fd5b6102cb600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610a7c565b604051808215151515815260200191505060405180910390f35b34156102f057600080fd5b61031c600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c2d565b005b341561032957600080fd5b610331610cf1565b6040518082815260200191505060405180910390f35b341561035257600080fd5b6103686004808035906020019091905050610cf7565b005b341561037557600080fd5b610408600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610e09565b005b341561041557600080fd5b61041d610fdc565b005b341561042a57600080fd5b610456600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611055565b6040518082815260200191505060405180910390f35b341561047757600080fd5b6104a3600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061109e565b604051808215151515815260200191505060405180910390f35b34156104c857600080fd5b6104d06110be565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561051d57600080fd5b6105256110e4565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561056557808201518184015260208101905061054a565b50505050905090810190601f1680156105925780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156105ab57600080fd5b6105b3611182565b604051808215151515815260200191505060405180910390f35b34156105d857600080fd5b61060d600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050611195565b604051808215151515815260200191505060405180910390f35b341561063257600080fd5b61063a611344565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561068757600080fd5b6106d2600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061136a565b6040518082815260200191505060405180910390f35b34156106f357600080fd5b61071f600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506113f1565b005b341561072c57600080fd5b6107346114cd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156107d257600080fd5b6000600260149054906101000a900460ff1615158115151415156107f557600080fd5b81600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550505050565b60068054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108e75780601f106108bc576101008083540402835291602001916108e7565b820191906000526020600020905b8154815290600101906020018083116108ca57829003601f168201915b505050505081565b60008082148061097b57506000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054145b151561098657600080fd5b81600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60005481565b60003373ffffffffffffffffffffffffffffffffffffffff167f0f83f112fbad4975eca5f3ec649cbf30eab2c0cd67155d1420630cd8bf70562e600260149054906101000a900460ff1680610b1a5750600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600260149054906101000a900460ff1660405180841515151581526020018315151515815260200182151515158152602001935050505060405180910390a2600260149054906101000a900460ff1680610c0a5750600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b15610c2157610c1a8484846114d2565b9050610c26565b600090505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610c8957600080fd5b6000600260149054906101000a900460ff161515811515141515610cac57600080fd5b81600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60085481565b6000339050610d45600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205483611782565b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610d9460005483611782565b6000819055507f696de425f79f4a40bc6d2122ca50507f0efbeabbff86a84871b7196ab8ea8df78183604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e6557600080fd5b8160069080519060200190610e7b929190611954565b508060079080519060200190610e92929190611954565b507fd131ab1e6f279deea74e13a18477e13e2107deb6dc8ae955648948be5841fb4660066007604051808060200180602001838103835285818154600181600116156101000203166002900481526020019150805460018160011615610100020316600290048015610f455780601f10610f1a57610100808354040283529160200191610f45565b820191906000526020600020905b815481529060010190602001808311610f2857829003601f168201915b5050838103825284818154600181600116156101000203166002900481526020019150805460018160011615610100020316600290048015610fc85780601f10610f9d57610100808354040283529160200191610fc8565b820191906000526020600020905b815481529060010190602001808311610fab57829003601f168201915b505094505050505060405180910390a15050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561103857600080fd5b6001600260146101000a81548160ff021916908315150217905550565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60036020528060005260406000206000915054906101000a900460ff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60078054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561117a5780601f1061114f5761010080835404028352916020019161117a565b820191906000526020600020905b81548152906001019060200180831161115d57829003601f168201915b505050505081565b600260149054906101000a900460ff1681565b60003373ffffffffffffffffffffffffffffffffffffffff167f0f83f112fbad4975eca5f3ec649cbf30eab2c0cd67155d1420630cd8bf70562e600260149054906101000a900460ff16806112335750600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16600260149054906101000a900460ff1660405180841515151581526020018315151515815260200182151515158152602001935050505060405180910390a2600260149054906101000a900460ff16806113235750600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b1561133957611332838361179b565b905061133e565b600090505b92915050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561144d57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561148957600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600081565b600080600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506115a683600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461193690919063ffffffff16565b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061163b83600460008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461178290919063ffffffff16565b600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611691838261178290919063ffffffff16565b600560008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040518082815260200191505060405180910390a360019150509392505050565b600082821115151561179057fe5b818303905092915050565b60006117ef82600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461178290919063ffffffff16565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061188482600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461193690919063ffffffff16565b600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600080828401905083811015151561194a57fe5b8091505092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061199557805160ff19168380011785556119c3565b828001600101855582156119c3579182015b828111156119c25782518255916020019190600101906119a7565b5b5090506119d091906119d4565b5090565b6119f691905b808211156119f25760008160009055506001016119da565b5090565b905600a165627a7a7230582033f7ac5cc4ae999916b4375cca26bd4e6d62fa1070599b0ae1426f93a0689acd0029', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
}