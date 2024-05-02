// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./AccessControl.sol";

contract Students is AccessControl {

    event deletedStudent(address indexed teacherAddress);
    
    struct SubjectScores {
        uint256 biology;
        uint256 physics;
        uint256 mathematics;
        uint256 chemistry;
        uint256 geography;
        uint256 history;
        uint256 civics;
        uint256 english;
        uint256 kiswahili;
        uint256 average;
        string grade;
    }

    struct Student {
        address studentAddress;
        string firstName;
        string middleName;
        string lastName;
        string examNumber;
        string gender;
        string religion;
        string dob;
        string classLevel;
        string combination;
        string phoneNumber;
        string studentLocation;
        uint year;
        string password;
        bool isRegistered;
        bool isLogin;
        bool isDeleted;
        // string imageUrl;
        // mapping(uint8 => SubjectScores) termResults; // 1: First Term, 2: Mid Term, 3: Third Term
    }

    mapping(address => Student) public students;
    address[] public studentAddressArray;

    uint256 studentId;

    function registerStudent(
        address _studentAddress, 
        string memory _firstName, 
        string memory _middleName,
        string memory _lastName,
        string memory _gender,
        string memory _religion,
        string memory _dob, 
        string memory _classLevel,
        string memory _combination,
        string memory _studentLocation,
        uint256 _year,
        string memory _phoneNumber, 
        string memory _password
        ) public {
            studentId++;
            Student storage student = students[_studentAddress];
            student.studentAddress = _studentAddress;
            student.firstName = _firstName;
            student.middleName = _middleName;
            student.lastName = _lastName;
            student.examNumber = string(abi.encodePacked("s1253-", _year,"-", studentId));
            student.gender = _gender;
            student.religion = _religion;
            student.dob = _dob;
            student.classLevel = _classLevel;
            student.combination = _combination;
            student.studentLocation = _studentLocation;
            student.year = _year;
            student.phoneNumber = _phoneNumber;
            student.password = _password;
            student.isRegistered = true;
            student.isLogin = false;
            student.isDeleted = false;

            studentAddressArray.push(_studentAddress);
    }

    function deleteStudent(address _studentAddress) external {
        require(!students[_studentAddress].isDeleted, "Teacher does not exist");
        Student storage student = students[_studentAddress];
        student.isDeleted = true;
        delete(student.studentAddress);
        // students[_studentAddress] = student;
        emit deletedStudent(_studentAddress);
    }

    function  studentLogin(address _studentAddress, string memory _password) external {
        require(students[_studentAddress].isRegistered == true, "Your not registered yet!");
        // require(students[_studentAddress].isLogin == false, "Your Already login");
        require(compareString(students[_studentAddress].password, _password), "Invalid address or password");
        
        students[_studentAddress].isLogin = true;
    }

    // function addTermResult(address _studentAddress, uint8 _term, uint256 _biology, uint256 _physics, uint256 _mathematics, uint256 _chemistry, uint256 _geography, uint256 _history, uint256 _civics, uint256 _english, uint256 _kiswahili) public {
    //     SubjectScores memory scores = SubjectScores({
    //         biology: _biology,
    //         physics: _physics,
    //         mathematics: _mathematics,
    //         chemistry: _chemistry,
    //         geography: _geography,
    //         history: _history,
    //         civics: _civics,
    //         english: _english,
    //         kiswahili: _kiswahili,
    //         average: 0,
    //         grade: ""
    //     });

    //     students[_studentAddress].termResults[_term] = scores;
    //     calculateAverageAndGrade(_studentAddress, _term);
    // }

    function getStudentArray() external view returns(address[] memory) {
        return studentAddressArray;
    }

    function getStudent(address _studentAddress) external view returns(
        address studentAddress, 
        string memory firstName, 
        string memory middleName, 
        string memory lastName, 
        string memory examNumber, 
        string memory gender, 
        string memory religion, 
        string memory dob, 
        string memory classLevel, 
        string memory combination, 
        string memory studentLocation, 
        uint256 year, 
        string memory phoneNumber,
        bool isDeleted 
        ) {
        Student storage student = students[_studentAddress];
        studentAddress = student.studentAddress;
        firstName = student.firstName;
        middleName = student.middleName;
        lastName = student.lastName;
        examNumber = student.examNumber;
        gender = student.gender;
        religion = student.religion;
        dob = student.dob;
        classLevel = student.classLevel;
        combination = student.combination;
        studentLocation = student.studentLocation;
        year = student.year;
        phoneNumber = student.phoneNumber;
        isDeleted = student.isDeleted;
    }

    // function calculateAverageAndGrade(address _studentAddress, uint8 _term) private {
    //     Student storage student = students[_studentAddress];
    //     SubjectScores storage scores = student.termResults[_term];

    //     uint256 totalScore = scores.biology + scores.physics + scores.mathematics + scores.chemistry + scores.geography + scores.history + scores.civics + scores.english + scores.kiswahili;
    //     uint256 numberOfSubjects = 9; // Total number of subjects

    //     scores.average = totalScore / numberOfSubjects;

    //     if (scores.average >= 80) {
    //         scores.grade = "A";
    //     } else if (scores.average >= 70) {
    //         scores.grade = "B";
    //     } else if (scores.average >= 50) {
    //         scores.grade = "C";
    //     } else if (scores.average >= 35) {
    //         scores.grade = "D";
    //     } else {
    //         scores.grade = "F";
    //     }
    // }
}
