// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract InsuranceStore is Ownable {
    event InsurancePriceChanged(InsuranceType insuranceType, uint newPrice);

    enum InsuranceType { CLASSIC, PREMIUM }

    struct Insurance {
        uint expiryDate;
        InsuranceType insuranceType;
    }

    mapping(address => Insurance) personToInsurance;
    mapping(InsuranceType => uint) insuranceTypeToPrice;

    constructor() {
        insuranceTypeToPrice[InsuranceType.CLASSIC] = 0.01 ether;
        insuranceTypeToPrice[InsuranceType.PREMIUM] = 0.015 ether;
    }

    function buyInsurance(uint _days, InsuranceType _type) external payable {
        require(_days > 0);

        if (_type == InsuranceType.CLASSIC) {
            require(_days * insuranceTypeToPrice[InsuranceType.CLASSIC] == msg.value);
        } else if (_type == InsuranceType.PREMIUM) {
            require(_days * insuranceTypeToPrice[InsuranceType.PREMIUM] == msg.value);
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

    function setInsurancePrice(uint _insuranceType, uint newPrice) external onlyOwner {
        require(newPrice > 0);
        
        insuranceTypeToPrice[InsuranceType(_insuranceType)] = newPrice;

        emit InsurancePriceChanged(InsuranceType(_insuranceType), newPrice);
    }

    function getInsurancePrice(uint _insuranceType) external view returns(uint) {
        return insuranceTypeToPrice[InsuranceType(_insuranceType)];
    }

    function getInsuranceInfo(address _person) external view returns(Insurance memory) {
        return personToInsurance[_person];
    }

    function checkInsurance(address _person) external view returns(bool) {
        return personToInsurance[_person].expiryDate > block.timestamp;
    }
}