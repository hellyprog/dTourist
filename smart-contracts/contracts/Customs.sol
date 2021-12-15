// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Customs {
    mapping (address => Trip[]) public personToHistory;
    mapping (address => string) public addressToCountry;

    function crossBorder(address _from, address _to, uint256 _date) public {
        personToHistory[msg.sender].push(Trip(_from, _to, _date, true));
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