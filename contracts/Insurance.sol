// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract InsuranceStore {
    enum InsuranceType { CLASSIC, PREMIUM }

    struct Insurance {
        uint expiryDate;
        InsuranceType insuranceType;
    }

    mapping(address => Insurance) personToInsurance;

    function buyInsurance(uint _days, InsuranceType _type) external {
        personToInsurance[msg.sender] = Insurance(block.timestamp + _days, _type);
    }
}