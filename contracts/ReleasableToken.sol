/**
 * This smart contract code is Copyright 2017 TokenMarket Ltd. For more information see https://tokenmarket.net
 *
 * Licensed under the Apache License, version 2.0: https://github.com/TokenMarketNet/ico/blob/master/LICENSE.txt
 */

pragma solidity ^0.4.18;

import "./Ownable.sol";
import './BurnableToken.sol';
import "./ERC20.sol";
import "./StandardToken.sol";


/**
 * Define interface for releasing the token transfer after a successful crowdsale.
 */
contract ReleasableToken is ERC20, Ownable, StandardToken, BurnableToken {

  struct Vesting {

    /* The base point of which the time vesting is counted from */
    uint256 basePoint;

    /* An array of vesting milestones, the entries of which determine the amount of tokens locked during vesting period */
    uint256[] milestones;

    /* An array of vesting timelocks, the entries of which are physical time in seconds */
    uint256[] timelocks;

    /* An indicator to determine which milestone the token is at */
    uint256 currentState;
  }

  /* The finalizer contract that allows unlift the transfer limits on this token */
  address public releaseAgent;

  /** A crowdsale contract can release us to the wild if ICO success. If false we are are in transfer lock up period.*/
  bool public released = false;

  /** Map of agents that are allowed to transfer tokens regardless of the lock down period. These are crowdsale contracts and possible the team multisig itself. */
  mapping (address => bool) public transferAgents;

  mapping (address => Vesting) internal vestings;

  event CanTransferChecked(bool canTransfer, address indexed from, bool isTransferAgent, bool isReleased);

  /**
   * Limit token transfer until the crowdsale is over.
   *
   */
  modifier canTransfer(address _sender, uint256 _value) {
    CanTransferChecked(released || transferAgents[_sender], _sender, transferAgents[_sender], released);
    if (released || transferAgents[_sender]) {revert();}

    // udpate to latest state
    while (vestings[_sender].basePoint + vestings[_sender].timelocks[vestings[_sender].currentState] < now && vestings[_sender].currentState < vestings[_sender].timelocks.length) {
      vestings[_sender].currentState++;
    }

    uint256 bal = balances[msg.sender];

    // the balance of wallet after the transaction should not be lower than locked balance
    require((bal - _value) >= vestings[_sender].milestones[vestings[_sender].currentState]);
    _;
  }

  // @dev set the milestones array for token
  function setMilestones(
    address _vestingAddr,
    uint256 _basePoint,
    uint256[] _milestones,
    uint256[] _timelocks
  ) public {
    require(_milestones.length == _timelocks.length);
    vestings[_vestingAddr] = Vesting(_basePoint, _milestones, _timelocks, 0);
  }

  // @dev get current state of the milestone
  function getCurrentMilestone(address _address) public view returns (uint256) {
    return vestings[_address].milestones[vestings[_address].currentState];
  }

  /**
   * Set the contract that can call release and make the token transferable.
   *
   * Design choice. Allow reset the release agent to fix fat finger mistakes.
   */
  function setReleaseAgent(address addr) onlyOwner inReleaseState(false) public {

    // We don't do interface check here as we might want to a normal wallet address to act as a release agent
    releaseAgent = addr;
  }

  /**
   * Owner can allow a particular address (a crowdsale contract) to transfer tokens despite the lock up period.
   */
  function setTransferAgent(address addr, bool state) onlyOwner inReleaseState(false) public {
    transferAgents[addr] = state;
  }

  /**
   * One way function to release the tokens to the wild.
   *
   * Can be called only from the release agent that is the final ICO contract. It is only called if the crowdsale has been success (first milestone reached).
   */
  function releaseTokenTransfer() public onlyReleaseAgent {
    released = true;
  }

  /** The function can be called only before or after the tokens have been releasesd */
  modifier inReleaseState(bool releaseState) {
    require(releaseState == released);
    _;
  }

  /** The function can be called only by a whitelisted release agent. */
  modifier onlyReleaseAgent() {
    require(msg.sender == releaseAgent);
    _;
  }

  function transfer(address _to, uint _value) canTransfer(msg.sender, _value) public returns (bool success) {
    // Call StandardToken.transfer()
    CanTransferChecked(released || transferAgents[msg.sender], msg.sender, transferAgents[msg.sender], released);
    return super.transfer(_to, _value);
  }

  function transferFrom(address _from, address _to, uint _value) canTransfer(_from, _value) public returns (bool success) {
    // Call StandardToken.transferForm()
    CanTransferChecked(released || transferAgents[msg.sender], msg.sender, transferAgents[msg.sender], released);
    return super.transferFrom(_from, _to, _value);
  }

}