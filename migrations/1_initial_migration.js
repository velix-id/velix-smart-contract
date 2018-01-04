var Migrations = artifacts.require("./Migrations.sol");
var VelixIdTokenCrowdsale = artifacts.require("./VelixIdTokenCrowdsale.sol")

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(VelixIdTokenCrowdsale);
};
