// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./AccessControl.sol";

contract Accountants {

    struct Accountant {
        string acc_address;
        string name;
        string salary;
    }
}
