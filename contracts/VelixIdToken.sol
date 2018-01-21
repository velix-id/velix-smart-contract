/**
 * This smart contract is modified 2017 by Velix.ID to assemble code for creation of VelixIDToken with
 * it's unique characteristics. 
 *
 * Licensed under the Apache License, version 2.0
 */

/**
 * This smart contract code is Copyright 2017 TokenMarket Ltd. For more information see https://tokenmarket.net
 *
 * Licensed under the Apache License, version 2.0: https://github.com/TokenMarketNet/ico/blob/master/LICENSE.txt
 */

pragma solidity ^0.4.18;

import './BurnableToken.sol';
import "./ReleasableToken.sol";
import './SafeMath.sol';


/**
 * VelixIDToken
 *
 * Capped, burnable, and transfer releaseable ERC20 token 
 * for Velix.ID
 *
 */
contract VelixIDToken is ReleasableToken, BurnableToken {
// contract VelixIDToken is ReleasableToken {

  using SafeMath for uint256;

  /** Name and symbol were updated. */
  event UpdatedTokenInformation(string newName, string newSymbol);

  string public name;

  string public symbol;

  uint public decimals;

//   mapping(address => uint256) balances;

  /**
   * Construct the token.
   *
   * @param _name Token name
   * @param _symbol Token symbol
   * @param _initialSupply How many tokens we start with
   * @param _decimals Number of decimal places
   */
  function VelixIDToken(string _name, string _symbol, uint _initialSupply, uint _decimals) public {
    // Cannot create a token without supply
    require(_initialSupply != 0);

    owner = msg.sender;

    name = _name;
    symbol = _symbol;

    totalSupply = _initialSupply;

    decimals = _decimals;

    // Create initially all balance on owner
    balances[owner] = totalSupply;
  }

  /**
   * To update token information at the end.
   *
   */
  function setTokenInformation(string _name, string _symbol) onlyOwner public {
    name = _name;
    symbol = _symbol;

    UpdatedTokenInformation(name, symbol);
  }
}
