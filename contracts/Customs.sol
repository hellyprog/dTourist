// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.9.0;

contract Customs {
    struct Trip {
        address from;
        address to;
        uint64 date;
        bool success;
    }

    mapping(address => Trip[]) public personToHistory;
    mapping(address => string) public addressToCountry;

    constructor() public {
        initializeCountryMapping();
    }

    function crossBorder(address _from, address _to) public {
        personToHistory[msg.sender].push(
            Trip(_from, _to, uint64(block.timestamp), true)
        );
    }

    function getValueAtHistoryMapping(address userAddress) public view returns (Trip[] memory)
    {
        return personToHistory[userAddress];
    }

    function initializeCountryMapping() private {
        addressToCountry[address(0x123)] = "Ukraine";
        addressToCountry[address(0x124)] = "Poland";
        addressToCountry[address(0x125)] = "USA";
        addressToCountry[address(0x126)] = "Australia";
    }

    /*function _isCrossingAllowed(address _user) private pure returns (bool) {
        return true;
    }*/
}
