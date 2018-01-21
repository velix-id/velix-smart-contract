var VelixIdToken = artifacts.require("./VelixIdToken.sol");

module.exports = function(deployer, network, accounts) 
{
    return liveDeploy(deployer, accounts);
};

async function liveDeploy(deployer, accounts)
{
    const BigNumber = web3.BigNumber;
    const totalSupply = new BigNumber("100000000000000000000000000");

    //string _name, string _symbol, uint _initialSupply, uint _decimals
      return deployer.deploy(VelixIdToken, 'VelixIdToken', 'VXD', totalSupply.toNumber(), 18).then( async () => {
          const instance = await VelixIdToken.deployed();
          //const token = await instance.token.call();
          //console.log('Token Address', token, instance.token);
          
          console.log('ABI', JSON.stringify(instance.abi));

          instance.abi.forEach(element => {

            var Message = element.constant ? 'CONST ' : 'FUNC ' ;
            Message += element.name ;
            console.log(Message);
          });

      }) 
}

