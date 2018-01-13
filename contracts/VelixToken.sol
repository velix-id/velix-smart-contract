pragma solidity 0.4.18;

import "zeppelin-solidity/contracts/token/MintableToken.sol";


contract VelixToken is MintableToken {
    string public name = "VELIX.ID TOKEN";
    string public symbol = "VXD";
    uint8 public decimals = 18;
}