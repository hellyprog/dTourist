// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.9.0;

contract Customs {
    mapping (address => Trip[]) public personToHistory;
    mapping (address => string) public addressToCountry;

    constructor() {
        addressToCountry[address(0x123)] = "Ukraine";
        addressToCountry[address(0x124)] = "Poland";
        addressToCountry[address(0x125)] = "USA";
        addressToCountry[address(0x126)] = "Australia";
    }

    function crossBorder(address _from, address _to, uint256 _date) public {
        personToHistory[msg.sender].push(Trip(_from, _to, _date, true));
    }

    function getValueAtHistoryMapping(address userAddress)  public  view  returns(Trip[] memory) {
      return personToHistory[userAddress];
    }

    /*function _isCrossingAllowed(address _user) private pure returns (bool) {
        return true;
    }*/

    struct Trip {
        address from;
        address to;
        uint256 date;
        bool success;
    }
}