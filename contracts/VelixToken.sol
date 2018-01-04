pragma solidity ^0.4.13;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract VelixToken is MintableToken {
  string public name = "VELIX TOKEN";
  string public symbol = "VLX";
  uint256 public decimals = 18;
}