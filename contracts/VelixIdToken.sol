pragma solidity ^0.4.15;

import "zeppelin-solidity/contracts/token/MintableToken.sol";


contract VelixIdToken is MintableToken {

	string public name = "VELIX.ID TOKEN";
    string public symbol = "VXD";
    uint8 public decimals = 18;

	address public releaseAgent;
	
	bool public released = false;

	mapping (address => bool) public transferAgents;

	modifier canTransfer(address _sender) {
	    require(released || transferAgents[_sender]);
    	_;
	}

	modifier inReleaseState(bool releaseState) {
    	require(releaseState == released);
    	_;
	}

	modifier onlyReleaseAgent() {
    	require(msg.sender == releaseAgent);
    	_;
	}

	function setReleaseAgent(address addr) onlyOwner inReleaseState(false) public {
	    releaseAgent = addr;
	}

	function setTransferAgent(address addr, bool state) onlyOwner inReleaseState(false) public {
  		transferAgents[addr] = state;
	}

	function releaseTokenTransfer() public onlyReleaseAgent {
    	released = true;
	}

	// @dev Override standardToken function
	function transfer(
			address _to, 
			uint _value) 
			canTransfer(msg.sender) public returns (bool success) {
		return super.transfer(_to, _value);
	}

	// @dev Override standardToken function
	function transferFrom(
			address _from, 
			address _to, 
			uint _value) 
			canTransfer(_from) public returns (bool success) {
    	return super.transferFrom(
	    		_from, 
	    		_to, 
	    		_value);
	}
}