// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract JoniToken {
    string public name = "Joni Token";
    string public symbol = "JONI";
    string public standard = "Joni Token v1.0";
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) public {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
    }

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}