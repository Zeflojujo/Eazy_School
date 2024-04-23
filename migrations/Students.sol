// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Students {

    enum Combination {science, arts, business}
    enum FeeStatus { complete, notcomplete }

    struct studentFinance {
        address studentAddress;
        uint256 school_fee_amount;
        FeeStatus fee_status;
    }

    struct Subjects {
        string biology;
        string pyhsics;
        string mathematics;
        string chemistry;
        string geography;
        string history;
        string civics;
        string english;
        string kiswahili;
        uint256 average;
        string grade;
    }
    
    struct Student {
        address student_addr;
        Combination combination;
        string full_name;
        string exam_number;
        string standard_level;
        uint256 age;
        bool isRegister;
    }

    mapping(address => Student) internal students;
    mapping(address => Subjects) internal first_term_result;
    mapping(address => Subjects) internal mid_term_result;
    mapping(address => Subjects) internal third_term_result;

    address[] private studentAddressArray;

    function registerStudent(address _studentAddress, Combination _combination, string memory _full_name, string memory _exam_number, string memory _standard_level, uint256 _age) external{
        require(students[_studentAddress].isRegistered == false, "Donor is already registered");
        require(donors[_donorPublicAddress].isDeleted, "Student does not exists");
        students[_studentAddress] = Student({
            student_addr: _studentAddress,
            combination: _combination,
            full_name: _full_name,
            exam_number: _exam_number,
            standard_level: _standard_level,
            age: _age
        });
    }

}