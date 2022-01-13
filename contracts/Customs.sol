// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.9.0;

contract Customs {
    event TravelerDataProcessed(bool success, string message);

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

    function crossBorder(
        string memory _fromCity,
        string memory _fromCountry,
        string memory _toCity,
        string memory _toCountry) external {
        personToHistory[msg.sender].push(
            Trip(
                City(_fromCity, _fromCountry), 
                City(_toCity, _toCountry), 
                uint64(block.timestamp), 
                true
            )
        );

        emit TravelerDataProcessed(true, "Border crossing is allowed");
    }

    function getValueAtHistoryMapping(address userAddress) public view returns (Trip[] memory) {
        return personToHistory[userAddress];
    }

    /*function _isCrossingAllowed(address _user) private pure returns (bool) {
        return true;
    }*/
}
