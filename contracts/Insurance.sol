// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract InsuranceStore {
    enum InsuranceType { CLASSIC, PREMIUM }

    uint basicDaylyInsurancePrice = 0.01 ether;
    uint basicDaylyInsurancePremiumPrice = 0.015 ether;

    struct Insurance {
        uint expiryDate;
        InsuranceType insuranceType;
    }

    mapping(address => Insurance) personToInsurance;

    function buyInsurance(uint _days, InsuranceType _type) external payable {
        if (_type == InsuranceType.CLASSIC) {
            require(_days * basicDaylyInsurancePrice == msg.value);
        } else if (_type == InsuranceType.PREMIUM) {
            require(_days * basicDaylyInsurancePremiumPrice == msg.value);
        }
        
        personToInsurance[msg.sender] = Insurance(block.timestamp + _days, _type);
    }

    function getInsuranceInfo(address _person) external view returns(Insurance memory) {
        return personToInsurance[_person];
    }

    function checkInsurance(address _person) external view returns(bool) {
        return personToInsurance[_person].expiryDate > block.timestamp;
    }
}