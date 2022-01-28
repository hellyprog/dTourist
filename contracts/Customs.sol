// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Customs is Ownable {
    event TravelerDataProcessed(bool success, string message);

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
            if (isInsuranceUpToDate(msg.sender)) {
                personToHistory[msg.sender].push(
                    Trip(
                        City(_fromCity, _fromCountry), 
                        City(_toCity, _toCountry), 
                        uint64(block.timestamp), 
                        true
                    )
                );
            }

            emit TravelerDataProcessed(true, "Border crossing is allowed");
    }

    function setInsuranceContractAddress(address _address) external onlyOwner {
        insuranceContract = InsuranceInterface(_address);
    }

    function isInsuranceUpToDate(address _person) private view returns (bool) {
        uint expiryDate = insuranceContract.getInsuranceInfo(_person);

        return expiryDate > block.timestamp;
    }

    function getValueAtHistoryMapping(address userAddress) public view returns (Trip[] memory) {
        return personToHistory[userAddress];
    }
}

interface InsuranceInterface {
    function getInsuranceInfo(address _person) external view returns (
        uint expipryDate
    );
}