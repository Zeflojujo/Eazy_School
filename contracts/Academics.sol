// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Academic {
    struct StudentDiscipline {
        address studentAddress;
        string description;
        // Add more fields as needed
    }

    mapping(address => StudentDiscipline[]) public disciplineRecords;

    function recordDiscipline(address _studentAddress, string memory _description) public {
        disciplineRecords[_studentAddress].push(StudentDiscipline({
            studentAddress: _studentAddress,
            description: _description
        }));
    }

    // Add more functions for recording student discipline
}