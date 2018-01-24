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

  // array of timelocks
  uint256[] public milestones;

  // decide if the contract is timelock contract
  bool isTimelockContract = false;

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

  // creates the token to be sold.
  // override this method to have crowdsale of a specific mintable token.
  // function createTokenContract() internal returns (VelixIDToken) {
  //   return new VelixIDToken("VelixID Token", "VXD");
  // }

  // fallback function can be used to buy tokens
  function () external payable {
    // buyTokens(msg.sender);
  }

  // low level token purchase function
  // function buyTokens(address beneficiary) public payable {
  //   require(beneficiary != 0x0);
  //   require(validPeriod());

  //   uint256 weiAmount = msg.value;

  //   // calculate token amount to be created
  //   uint256 tokens = weiAmount.mul(rate);

  //   // update state
  //   weiRaised = weiRaised.add(weiAmount);

  //   token.mint(beneficiary, tokens);
  //   TokenPurchase(msg.sender, beneficiary, tokens);

  //   forwardFunds(tokens);
  // }

  // low level token purchase function
  // function allocateTokens(address beneficiary) public payable {
  //   require(beneficiary != address(0));
  //   require(validNonZeroPurchase());

  //   uint256 weiAmount = msg.value;

  //   // calculate token amount to be created
  //   uint256 tokens = weiAmount.mul(rate);

  //   // update state
  //   weiRaised = weiRaised.add(weiAmount);

  //   token.mint(beneficiary, tokens);
  //   TokenPurchase(msg.sender, beneficiary, tokens);

  //   forwardFunds(tokens);
  // }

  // @dev transfer after release should not be made with an amount greater allowed
  // @param the address to transfer to
  // @param tokens the total amount of tokens to transfer to
  // @param tokensInMlestone1 the amount of tokens to transfer to at the 1st milestone
  // @param tokensInMlestone2 the amount of tokens to transfer to at the 1st milestone
  // @param tokensInMlestone3 the amount of tokens to transfer to at the 1st milestone
  // @param tokensInMlestone4 the amount of tokens to transfer to at the 1st milestone
  // @param tokensInMlestone5 the amount of tokens to transfer to at the 1st milestone
  // @param tokensInMlestone6 the amount of tokens to transfer to at the 1st milestone
  function transferTokensWithTimelock(
    address to,
    uint256 tokens,
    uint256 tokensInMlestone1,
    uint256 tokensInMlestone2,
    uint256 tokensInMlestone3,
    uint256 tokensInMlestone4,
    uint256 tokensInMlestone5,
    uint256 tokensInMlestone6) public payable returns (VelixIDToken){
    
    require(to != address(0));
    require(validNonZeroPurchase());
    require(tokens >= (tokensInMlestone1+tokensInMlestone2+tokensInMlestone3+tokensInMlestone4+tokensInMlestone5+tokensInMlestone6));
    isTimelockContract = true;
    milestones[0] = tokensInMlestone1;
    milestones[1] = tokensInMlestone2;
    milestones[2] = tokensInMlestone3;
    milestones[3] = tokensInMlestone4;
    milestones[4] = tokensInMlestone5;
    milestones[5] = tokensInMlestone6;
    token = new VelixIDToken("VelixID Token", "VXD", tokens, 20);
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

  function validTimelockContract() internal view returns (bool) {
    return isTimelockContract;
  }
}