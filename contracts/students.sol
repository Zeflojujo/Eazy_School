// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./AccessControl.sol";

contract Students is AccessControl {
    
    enum Combination {Science, Arts, Business, None}
    
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
        Combination combination;
        address studentAddress;
        string fullName;
        string examNumber;
        string standardLevel;
        uint256 age;
        string phoneNumber;
        string password;
        bool isRegistered;
        bool isLogin;
        bool isDeleted;
        mapping(uint8 => SubjectScores) termResults; // 1: First Term, 2: Mid Term, 3: Third Term
    }

    mapping(address => Student) public students;
    address[] public studentAddressArray;

    function registerStudent(address _studentAddress, string memory _fullName, string memory _examNumber, string memory _standardLevel, uint256 _age, string memory _phoneNumber, string memory _password) public {
        Student storage student = students[_studentAddress];
        student.combination = Combination.None;
        student.studentAddress = _studentAddress;
        student.fullName = _fullName;
        student.examNumber = _examNumber;
        student.standardLevel = _standardLevel;
        student.age = _age;
        student.phoneNumber = _phoneNumber;
        student.password = _password;
        student.isRegistered = true;
        student.isLogin = false;
        student.isDeleted = false;

        studentAddressArray.push(_studentAddress);
    }

    function  studentLogin(address _studentAddress, string memory _password) external {
        require(students[_studentAddress].isRegistered == true, "Your not registered yet!");
        // require(students[_studentAddress].isLogin == false, "Your Already login");
        require(compareString(students[_studentAddress].password, _password), "Invalid address or password");
        
        students[_studentAddress].isLogin = true;
    }

    function addTermResult(address _studentAddress, uint8 _term, uint256 _biology, uint256 _physics, uint256 _mathematics, uint256 _chemistry, uint256 _geography, uint256 _history, uint256 _civics, uint256 _english, uint256 _kiswahili) public {
        SubjectScores memory scores = SubjectScores({
            biology: _biology,
            physics: _physics,
            mathematics: _mathematics,
            chemistry: _chemistry,
            geography: _geography,
            history: _history,
            civics: _civics,
            english: _english,
            kiswahili: _kiswahili,
            average: 0,
            grade: ""
        });

        students[_studentAddress].termResults[_term] = scores;
        calculateAverageAndGrade(_studentAddress, _term);
    }

    function getStudentArray() external view returns(address[] memory) {
        return studentAddressArray;
    }

    function getStudent(address _studentAddress) external view returns(address studentAddress, string memory fullName, string memory examNumber, string memory classLevel, uint256 age, string memory phoneNumber ) {
        Student storage student = students[_studentAddress];
        studentAddress = student.studentAddress;
        fullName = student.fullName;
        examNumber = student.examNumber;
        classLevel = student.standardLevel;
        age = student.age;
        phoneNumber = student.phoneNumber;
    }

    function calculateAverageAndGrade(address _studentAddress, uint8 _term) private {
        Student storage student = students[_studentAddress];
        SubjectScores storage scores = student.termResults[_term];

        uint256 totalScore = scores.biology + scores.physics + scores.mathematics + scores.chemistry + scores.geography + scores.history + scores.civics + scores.english + scores.kiswahili;
        uint256 numberOfSubjects = 9; // Total number of subjects

        scores.average = totalScore / numberOfSubjects;

        if (scores.average >= 80) {
            scores.grade = "A";
        } else if (scores.average >= 70) {
            scores.grade = "B";
        } else if (scores.average >= 50) {
            scores.grade = "C";
        } else if (scores.average >= 35) {
            scores.grade = "D";
        } else {
            scores.grade = "F";
        }
    }

    function parseCombination(string memory _combination) private pure returns (Combination) {
        if (keccak256(bytes(_combination)) == keccak256(bytes("Science"))) {
            return Combination.Science;
        } else if (keccak256(bytes(_combination)) == keccak256(bytes("Arts"))) {
            return Combination.Arts;
        } else if (keccak256(bytes(_combination)) == keccak256(bytes("Business"))) {
            return Combination.Business;
        }else{
            return Combination.None;
        }
    }
}
