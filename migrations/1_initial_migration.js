var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer, network, accounts) {
  console.log('Acc', accounts);
  deployer.deploy(Migrations);
};
