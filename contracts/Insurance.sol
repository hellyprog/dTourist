// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract InsuranceStore is Ownable {
    enum InsuranceType { CLASSIC, PREMIUM }

    uint basicDaylyInsurancePrice = 0.01 ether;
    uint basicDaylyInsurancePremiumPrice = 0.015 ether;

    struct Insurance {
        uint expiryDate;
        InsuranceType insuranceType;
    }

    mapping(address => Insurance) personToInsurance;

    function buyInsurance(uint _days, InsuranceType _type) external payable {
        require(_days > 0);

        if (_type == InsuranceType.CLASSIC) {
            require(_days * basicDaylyInsurancePrice == msg.value);
        } else if (_type == InsuranceType.PREMIUM) {
            require(_days * basicDaylyInsurancePremiumPrice == msg.value);
        }
        
        uint expiry = block.timestamp + (_days * 1 days);

        if (_type == InsuranceType.PREMIUM && _days >= 7) {
            expiry += 1 days;
        }

        personToInsurance[msg.sender] = Insurance(expiry, _type);
    }

    function withdraw() external onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function getInsuranceInfo(address _person) external view returns(Insurance memory) {
        return personToInsurance[_person];
    }

    function checkInsurance(address _person) external view returns(bool) {
        return personToInsurance[_person].expiryDate > block.timestamp;
    }
}