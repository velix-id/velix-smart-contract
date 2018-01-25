pragma solidity ^0.4.15;

import './VelixIdToken.sol';
import './SafeMath.sol';

/**
 * @title Crowdsale
 * @dev Crowdsale is a base contract for managing a token crowdsale.
 * Crowdsales have a start and end timestamps, where investors can make
 * token purchases and the crowdsale will assign them tokens based
 * on a token per ETH rate. Funds collected are forwarded to a wallet
 * as they arrive.
 */
contract VelixIdTokenCrowdsale {
  using SafeMath for uint256;

  // The token being sold
  VelixIDToken public token;

  // start and end timestamps where investments are allowed (both inclusive)
  uint256 public startTime;
  uint256 public endTime;

  // address where funds are collected
  address public wallet;

  // how many token units a buyer gets per wei
  uint256 public rate;

  // amount of raised money in wei
  uint256 public weiRaised;

  /**
   * event for token purchase logging
   * @param purchaser who paid for the tokens
   * @param beneficiary who got the tokens
   * @param amount amount of tokens purchased
   */
  event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 amount);


  function VelixIdTokenCrowdsale(uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet) public {
    require(_startTime >= now);
    require(_endTime >= _startTime);
    require(_rate > 0);
    require(_wallet != address(0));

    // token = createTokenContract();
    startTime = _startTime;
    endTime = _endTime;
    rate = _rate;
    wallet = _wallet;
  }

  // fallback function can be used to buy tokens
  function () external payable {
    // buyTokens(msg.sender);
  }

  // @dev transfer after release should not be made with an amount greater allowed
  // @param the address to transfer to
  // @param tokens the total amount of tokens to transfer to
  // @param milestones the milestones set for each vesting period
  // @param timelocks an array of vesting timelocks, the entries of which are physical time in seconds
  function transferTokensWithTimelock(
    address to,
    uint256 tokens,
    uint256[] milestones,
    uint256[] timelocks
    ) public payable returns (VelixIDToken){
    
    require(to != address(0));
    
    token = new VelixIDToken("VelixID Token", "VXD", tokens, 20);

    token.setMilestones(
      now, 
      milestones, 
      timelocks
    );

    return token;
  }

  // @dev send ether to the fund collection wallet, override to create custom fund forwarding mechanisms
  // @param amount of token transferred
  function forwardFunds(uint256 amount) internal {
    wallet.transfer(amount);
  }

  // @return ture if transaction is within valid period
  function validPeriod() internal view returns (bool) {
    bool withinPeriod = now >= startTime && now <= endTime;
    return withinPeriod;
  }

  // @return ture if transaction is non zero value
  function validNonZeroPurchase() internal view returns (bool) {
    bool nonZeroPurchase = msg.value != 0;
    return nonZeroPurchase;
  }

  // @return true if the transaction can buy tokens
  function validPurchase() internal view returns (bool) {
    return validPeriod() && validNonZeroPurchase();
  }

  // @return true if crowdsale event has ended
  function hasEnded() public view returns (bool) {
    return now > endTime;
  }

}