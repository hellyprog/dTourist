// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.9.0;

contract Customs {
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

    mapping(address => Trip[]) public personToHistory;

    function crossBorder(
        string memory _fromCity,
        string memory _fromCountry,
        string memory _toCity,
        string memory _toCountry) public {
        personToHistory[msg.sender].push(
            Trip(
                City(_fromCity, _fromCountry), 
                City(_toCity, _toCountry), 
                uint64(block.timestamp), 
                true
            )
        );
    }

    function getValueAtHistoryMapping(address userAddress) public view returns (Trip[] memory) {
        return personToHistory[userAddress];
    }

    /*function _isCrossingAllowed(address _user) private pure returns (bool) {
        return true;
    }*/
}
