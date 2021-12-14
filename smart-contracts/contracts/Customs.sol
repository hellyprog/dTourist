pragma solidity >=0.4.22 <0.9.0;

contract Customs {
    function crossBorder(address payable _user) public {
        bool isAllowed = _isCrossingAllowed(_user); 
    }

    function _isCrossingAllowed(address payable _user) private returns (bool) {
        return true;
    }
}