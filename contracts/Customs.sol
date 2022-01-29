// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Customs is Ownable {
    event TravelerDataProcessed(bool success, string message, Trip trip);

    InsuranceInterface insuranceContract;

    struct Trip {
        City from;
        City to;
        uint64 date;
        bool success;
    }

    struct City {
        string name;
        string country;
    }

    mapping(address => Trip[]) personToHistory;

    constructor(address _insuranceAddress) {
        insuranceContract = InsuranceInterface(_insuranceAddress);
    }

    function crossBorder(
        string memory _fromCity,
        string memory _fromCountry,
        string memory _toCity,
        string memory _toCountry) external {
            bool insuranceCheckPassed = isInsuranceUpToDate(msg.sender);
            Trip memory tripToCreate = Trip(
                City(_fromCity, _fromCountry), 
                City(_toCity, _toCountry), 
                uint64(block.timestamp), 
                insuranceCheckPassed
            );
            personToHistory[msg.sender].push(tripToCreate);

            if (insuranceCheckPassed) {
                emit TravelerDataProcessed(true, "Border crossing is allowed", tripToCreate);
            } else {
                emit TravelerDataProcessed(false, "Border crossing is not allowed. Insurance needed", tripToCreate);
            }
    }

    function setInsuranceContractAddress(address _address) external onlyOwner {
        insuranceContract = InsuranceInterface(_address);
    }

    function isInsuranceUpToDate(address _person) private view returns (bool) {
        return insuranceContract.checkInsurance(_person);
    }

    function getValueAtHistoryMapping(address userAddress) public view returns (Trip[] memory) {
        return personToHistory[userAddress];
    }
}

interface InsuranceInterface {
    function checkInsurance(address _person) external view returns (
        bool isInsuranceOk
    );
}