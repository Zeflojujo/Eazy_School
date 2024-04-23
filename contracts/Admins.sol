// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./Accountants.sol";

contract Admins {
    address public adminAddress;

    constructor() {
        adminAddress = msg.sender;
    }

     modifier onlyAdmin() {
        require(msg.sender == adminAddress, "Only admin can call this function");
        _;
    }

    function changeAdmin(address newAdmin) public onlyAdmin {
        adminAddress = newAdmin;
    }

    // function addAccountant( address _acc_address, string _name, uint256 _salary ) external {

    // }

    // function registerStudent(address _studentAddress, Students _studentsContract, string memory _name, string memory _standardLevel, string memory _examNumber, uint256 _age, string[] memory _subjects) public onlyAdmin {
    //     _studentsContract.registerStudent(_studentAddress, _name, _standardLevel, _examNumber, _age, _subjects);
    // }

    // function registerTeacher(address _teacherAddress, Teacher _teacherContract, string memory _name, string[] memory _subjects) public onlyAdmin {
    //     _teacherContract.registerTeacher(_teacherAddress, _name, _subjects);
    // }

    // function registerAccountant(address _accountantAddress, Accountant _accountantContract) public onlyAdmin {
    //     // Add implementation to register accountant
    // }

    // function registerAcademic(address _academicAddress, Academic _academicContract) public onlyAdmin {
    //     // Add implementation to register academic personnel
    // }
}