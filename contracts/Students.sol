// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.19;
// import "./AccessControl.sol";

// contract Students is AccessControl {

//     event deletedStudent(address indexed teacherAddress);
//     event StudentResultUploaded(address indexed teacherAddress, address indexed studentAddress, uint256 term, uint256 average, string grade);

//     struct SubjectScores {
//         uint256 biology;
//         uint256 physics;
//         uint256 mathematics;
//         uint256 chemistry;
//         uint256 geography;
//         uint256 history;
//         uint256 civics;
//         uint256 english;
//         uint256 kiswahili;
//         uint256 average;
//         string grade;
//     }

//     struct Student {
//         address studentAddress;
//         string firstName;
//         string middleName;
//         string lastName;
//         string examNumber;
//         string gender;
//         string religion;
//         string dob;
//         string classLevel;
//         string combination;
//         string phoneNumber;
//         string studentLocation;
//         uint year;
//         string password;
//         bool isRegistered;
//         bool isLogin;
//         bool isDeleted;
//         uint256 schoolFee;
//         uint256 accomodationFee;
//         mapping(uint256 => SubjectScores) termResults; // 1: First Term, 2: Mid Term, 3: Third Term
//     }

//     mapping(address => Student) students;
//     address[] public studentAddressArray;

//     uint256 studentId;

//     function registerStudent(
//         address _studentAddress, 
//         string memory _firstName, 
//         string memory _middleName,
//         string memory _lastName,
//         string memory _gender,
//         string memory _religion,
//         string memory _dob, 
//         string memory _classLevel,
//         string memory _combination,
//         string memory _studentLocation,
//         uint256 _year,
//         string memory _password
//     ) public {
//         studentId++;
//         Student storage student = students[_studentAddress];
//         student.studentAddress = _studentAddress;
//         student.firstName = _firstName;
//         student.middleName = _middleName;
//         student.lastName = _lastName;
//         student.examNumber = string(abi.encodePacked("s1253-", _year, "-", studentId));
//         student.gender = _gender;
//         student.religion = _religion;
//         student.dob = _dob;
//         student.classLevel = _classLevel;
//         student.combination = _combination;
//         student.studentLocation = _studentLocation;
//         student.year = _year;
//         student.password = _password;
//         student.isRegistered = true;
//         student.isLogin = false;
//         student.isDeleted = false;

//         studentAddressArray.push(_studentAddress);
//     }

//     function deleteStudent(address _studentAddress) external {
//         require(!students[_studentAddress].isDeleted, "Student does not exist");
//         Student storage student = students[_studentAddress];
//         student.isDeleted = true;
//         delete(student.studentAddress);
//         emit deletedStudent(_studentAddress);
//     }

//     function studentLogin(address _studentAddress, string memory _password) external {
//         require(students[_studentAddress].isRegistered, "You are not registered yet!");
//         require(compareString(students[_studentAddress].password, _password), "Invalid address or password");
//         students[_studentAddress].isLogin = true;
//     }

//     function addTermResult(
//         address _studentAddress, 
//         uint256 _term, 
//         uint256 _biology, 
//         uint256 _physics, 
//         uint256 _mathematics, 
//         uint256 _chemistry, 
//         uint256 _geography, 
//         uint256 _history, 
//         uint256 _civics, 
//         uint256 _english, 
//         uint256 _kiswahili
//     ) public {
//         require(students[_studentAddress].isRegistered, "Student is not registered");

//         SubjectScores memory scores = SubjectScores({
//             biology: _biology,
//             physics: _physics,
//             mathematics: _mathematics,
//             chemistry: _chemistry,
//             geography: _geography,
//             history: _history,
//             civics: _civics,
//             english: _english,
//             kiswahili: _kiswahili,
//             average: 0,
//             grade: ""
//         });

//         students[_studentAddress].termResults[_term] = scores;
//         calculateAverageAndGrade(_studentAddress, _term);
//     }

//     function calculateAverageAndGrade(address _studentAddress, uint256 _term) private {
//         Student storage student = students[_studentAddress];
//         SubjectScores storage scores = student.termResults[_term];

//         uint256 totalScore = scores.biology + scores.physics + scores.mathematics + scores.chemistry + scores.geography + scores.history + scores.civics + scores.english + scores.kiswahili;
//         uint256 numberOfSubjects = 9; // Total number of subjects

//         scores.average = totalScore / numberOfSubjects;

//         if (scores.average >= 80) {
//             scores.grade = "A";
//         } else if (scores.average >= 70) {
//             scores.grade = "B";
//         } else if (scores.average >= 50) {
//             scores.grade = "C";
//         } else if (scores.average >= 35) {
//             scores.grade = "D";
//         } else {
//             scores.grade = "F";
//         }

//         emit StudentResultUploaded(msg.sender, _studentAddress, _term, scores.average, scores.grade);
//     }

//     function getUploadedResult(address _studentAddress, uint256 _term) public view returns (
//         uint256 biology, 
//         uint256 physics, 
//         uint256 mathematics, 
//         uint256 chemistry, 
//         uint256 geography, 
//         uint256 history, 
//         uint256 civics, 
//         uint256 english, 
//         uint256 kiswahili, 
//         uint256 average, 
//         string memory grade
//     ) {
//         SubjectScores storage scores = students[_studentAddress].termResults[_term];
//         return (
//             scores.biology,
//             scores.physics,
//             scores.mathematics,
//             scores.chemistry,
//             scores.geography,
//             scores.history,
//             scores.civics,
//             scores.english,
//             scores.kiswahili,
//             scores.average,
//             scores.grade
//         );
//     }

//     function getStudentArray() external view returns(address[] memory) {
//         return studentAddressArray;
//     }

//     function getStudent(address _studentAddress) external view returns(
//         address studentAddress, 
//         string memory firstName, 
//         string memory middleName, 
//         string memory lastName, 
//         string memory examNumber, 
//         string memory gender, 
//         string memory religion, 
//         string memory dob, 
//         string memory classLevel, 
//         string memory combination, 
//         string memory studentLocation, 
//         uint256 year, 
//         bool isDeleted 
//     ) {
//         Student storage student = students[_studentAddress];
//         studentAddress = student.studentAddress;
//         firstName = student.firstName;
//         middleName = student.middleName;
//         lastName = student.lastName;
//         examNumber = student.examNumber;
//         gender = student.gender;
//         religion = student.religion;
//         dob = student.dob;
//         classLevel = student.classLevel;
//         combination = student.combination;
//         studentLocation = student.studentLocation;
//         year = student.year;
//         isDeleted = student.isDeleted;
//     }

//     // function compareString(string memory a, string memory b) private pure returns (bool) {
//     //     return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
//     // }

//     //  function uploadSubjectScore(address _studentAddress, uint256 _term, string memory subjectName_, string memory _subjectScore) external {
//     //     Student storage student = students[_studentAddress].termResults[_term];
//     //     student.subjectName_ = _subjectScore;
//     //     students[_studentAddress] = student;
//     // }

//     function uploadSubjectScore(address _studentAddress, uint256 _term, string memory subjectName_, uint256 _subjectScore) external {
//         Student storage student = students[_studentAddress];
//         student.termResults[_term][subjectName_] = _subjectScore;
//     }
// }

// pragma solidity ^0.8.19;

// import "./AccessControl.sol";
// import "./Teacher.sol"; // Import the Teachers contract

// contract Students is AccessControl {

//     Teachers teachersContract;

//     constructor(address _teachersContractAddress) {
//         teachersContract = Teachers(_teachersContractAddress);
//     }

//     event deletedStudent(address indexed studentAddress);
//     event StudentResultUploaded(address indexed teacherAddress, address indexed studentAddress, uint256 term, uint256 average, string grade);

//     struct SubjectScores {
//         uint256 biology;
//         uint256 physics;
//         uint256 mathematics;
//         uint256 chemistry;
//         uint256 geography;
//         uint256 history;
//         uint256 civics;
//         uint256 english;
//         uint256 kiswahili;
//         uint256 average;
//         string grade;
//     }

//     struct Student {
//         address studentAddress;
//         string firstName;
//         string middleName;
//         string lastName;
//         string examNumber;
//         string gender;
//         string religion;
//         string dob;
//         string classLevel;
//         string combination;
//         string phoneNumber;
//         string studentLocation;
//         uint year;
//         string password;
//         bool isRegistered;
//         bool isLogin;
//         bool isDeleted;
//         uint256 schoolFee;
//         uint256 accomodationFee;
//         mapping(uint256 => SubjectScores) termResults; // 1: First Term, 2: Mid Term, 3: Third Term
//     }

//     mapping(address => Student) public students;
//     address[] public studentAddressArray;

//     uint256 studentId;

//     function registerStudent(
//         address _studentAddress, 
//         string memory _firstName, 
//         string memory _middleName,
//         string memory _lastName,
//         string memory _gender,
//         string memory _religion,
//         string memory _dob, 
//         string memory _classLevel,
//         string memory _combination,
//         string memory _studentLocation,
//         uint256 _year,
//         string memory _password
//     ) public {
//         studentId++;
//         Student storage student = students[_studentAddress];
//         student.studentAddress = _studentAddress;
//         student.firstName = _firstName;
//         student.middleName = _middleName;
//         student.lastName = _lastName;
//         student.examNumber = string(abi.encodePacked("s1253-", _year, "-", studentId));
//         student.gender = _gender;
//         student.religion = _religion;
//         student.dob = _dob;
//         student.classLevel = _classLevel;
//         student.combination = _combination;
//         student.studentLocation = _studentLocation;
//         student.year = _year;
//         student.password = _password;
//         student.isRegistered = true;
//         student.isLogin = false;
//         student.isDeleted = false;

//         studentAddressArray.push(_studentAddress);
//     }

//     function deleteStudent(address _studentAddress) external {
//         require(!students[_studentAddress].isDeleted, "Student does not exist");
//         Student storage student = students[_studentAddress];
//         student.isDeleted = true;
//         delete(students[_studentAddress]);
//         emit deletedStudent(_studentAddress);
//     }

//     function studentLogin(address _studentAddress, string memory _password) external {
//         require(students[_studentAddress].isRegistered, "You are not registered yet!");
//         require(compareString(students[_studentAddress].password, _password), "Invalid address or password");
//         students[_studentAddress].isLogin = true;
//     }

//     function addTermResult(
//         address _studentAddress, 
//         uint256 _term, 
//         uint256 _biology, 
//         uint256 _physics, 
//         uint256 _mathematics, 
//         uint256 _chemistry, 
//         uint256 _geography, 
//         uint256 _history, 
//         uint256 _civics, 
//         uint256 _english, 
//         uint256 _kiswahili
//     ) public {
//         require(students[_studentAddress].isRegistered, "Student is not registered");

//         SubjectScores memory scores = SubjectScores({
//             biology: _biology,
//             physics: _physics,
//             mathematics: _mathematics,
//             chemistry: _chemistry,
//             geography: _geography,
//             history: _history,
//             civics: _civics,
//             english: _english,
//             kiswahili: _kiswahili,
//             average: 0,
//             grade: ""
//         });

//         students[_studentAddress].termResults[_term] = scores;
//         calculateAverageAndGrade(_studentAddress, _term);
//     }

//     function calculateAverageAndGrade(address _studentAddress, uint256 _term) private {
//         Student storage student = students[_studentAddress];
//         SubjectScores storage scores = student.termResults[_term];

//         uint256 totalScore = scores.biology + scores.physics + scores.mathematics + scores.chemistry + scores.geography + scores.history + scores.civics + scores.english + scores.kiswahili;
//         uint256 numberOfSubjects = 9; // Total number of subjects

//         scores.average = totalScore / numberOfSubjects;

//         if (scores.average >= 80) {
//             scores.grade = "A";
//         } else if (scores.average >= 70) {
//             scores.grade = "B";
//         } else if (scores.average >= 50) {
//             scores.grade = "C";
//         } else if (scores.average >= 35) {
//             scores.grade = "D";
//         } else {
//             scores.grade = "F";
//         }

//         emit StudentResultUploaded(msg.sender, _studentAddress, _term, scores.average, scores.grade);
//     }

//     function getUploadedResult(address _studentAddress, uint256 _term) public view returns (
//         uint256 biology, 
//         uint256 physics, 
//         uint256 mathematics, 
//         uint256 chemistry, 
//         uint256 geography, 
//         uint256 history, 
//         uint256 civics, 
//         uint256 english, 
//         uint256 kiswahili, 
//         uint256 average, 
//         string memory grade
//     ) {
//         SubjectScores storage scores = students[_studentAddress].termResults[_term];
//         return (
//             scores.biology,
//             scores.physics,
//             scores.mathematics,
//             scores.chemistry,
//             scores.geography,
//             scores.history,
//             scores.civics,
//             scores.english,
//             scores.kiswahili,
//             scores.average,
//             scores.grade
//         );
//     }

//     function getStudentArray() external view returns(address[] memory) {
//         return studentAddressArray;
//     }

//     function getStudent(address _studentAddress) external view returns(
//         address studentAddress, 
//         string memory firstName, 
//         string memory middleName, 
//         string memory lastName, 
//         string memory examNumber, 
//         string memory gender, 
//         string memory religion, 
//         string memory dob, 
//         string memory classLevel, 
//         string memory combination, 
//         string memory studentLocation, 
//         uint256 year, 
//         bool isDeleted 
//     ) {
//         Student storage student = students[_studentAddress];
//         studentAddress = student.studentAddress;
//         firstName = student.firstName;
//         middleName = student.middleName;
//         lastName = student.lastName;
//         examNumber = student.examNumber;
//         gender = student.gender;
//         religion = student.religion;
//         dob = student.dob;
//         classLevel = student.classLevel;
//         combination = student.combination;
//         studentLocation = student.studentLocation;
//         year = student.year;
//         isDeleted = student.isDeleted;
//     }

//     function uploadSubjectScore(address _studentAddress, uint256 _term, string memory subjectName_, uint256 _subjectScore) external {
//         Student storage student = students[_studentAddress];
//         student.termResults[_term][subjectName_] = _subjectScore;
//     }

//     // function compareString(string memory a, string memory b) private pure returns (bool) {
//     //     return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
//     // }
// }


pragma solidity ^0.8.19;

import "./AccessControl.sol";
import "./Teachers.sol"; // Import the Teachers contract

contract Students is AccessControl {

    Teachers teachersContract;

    constructor(address _teachersContractAddress) {
        teachersContract = Teachers(_teachersContractAddress);
    }

    event deletedStudent(address indexed studentAddress);
    event StudentResultUploaded(address indexed teacherAddress, address indexed studentAddress, uint256 term, uint256 average, string grade);

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
        uint256 schoolFee;
        uint256 accomodationFee;
        // mapping(uint256 => SubjectScores) termResults; // 1: First Term, 2: Mid Term, 3: Third Term
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
        string memory _password
    ) public {
        studentId++;
        Student storage student = students[_studentAddress];
        student.studentAddress = _studentAddress;
        student.firstName = _firstName;
        student.middleName = _middleName;
        student.lastName = _lastName;
        student.examNumber = string(abi.encodePacked("s1253-", _year, "-", studentId));
        student.gender = _gender;
        student.religion = _religion;
        student.dob = _dob;
        student.classLevel = _classLevel;
        student.combination = _combination;
        student.studentLocation = _studentLocation;
        student.year = _year;
        student.password = _password;
        student.schoolFee = 0;
        student.accomodationFee = 0;
        student.isRegistered = true;
        student.isLogin = false;
        student.isDeleted = false;
        student.biology = 0;
        student.physics = 0;
        student.mathematics = 0;
        student.chemistry = 0;
        student.geography = 0;
        student.history = 0;
        student.civics = 0;
        student.english = 0;
        student.kiswahili = 0;
        student.average = 0;
        student.grade = "--";

        studentAddressArray.push(_studentAddress);
    }

    function deleteStudent(address _studentAddress) external {
        require(!students[_studentAddress].isDeleted, "Student does not exist");
        Student storage student = students[_studentAddress];
        student.isDeleted = true;
        delete(students[_studentAddress]);
        emit deletedStudent(_studentAddress);
    }

    function studentLogin(address _studentAddress, string memory _password) external {
        require(students[_studentAddress].isRegistered, "You are not registered yet!");
        require(compareString(students[_studentAddress].password, _password), "Invalid address or password");
        students[_studentAddress].isLogin = true;
    }

    // function addTermResult(
    //     address _studentAddress, 
    //     uint256 _term, 
    //     uint256 _biology, 
    //     uint256 _physics, 
    //     uint256 _mathematics, 
    //     uint256 _chemistry, 
    //     uint256 _geography, 
    //     uint256 _history, 
    //     uint256 _civics, 
    //     uint256 _english, 
    //     uint256 _kiswahili
    // ) public {
    //     require(students[_studentAddress].isRegistered, "Student is not registered");

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

    function calculateAverageAndGrade(address _studentAddress, uint256 _term) private {
        Student storage student = students[_studentAddress];
        // SubjectScores storage student = student.termResults[_term];

        uint256 totalScore = student.biology + student.physics + student.mathematics + student.chemistry + student.geography + student.history + student.civics + student.english + student.kiswahili;
        uint256 numberOfSubjects = 9; // Total number of subjects

        student.average = totalScore / numberOfSubjects;

        if (student.average >= 80) {
            student.grade = "A";
        } else if (student.average >= 70) {
            student.grade = "B";
        } else if (student.average >= 45) {
            student.grade = "C";
        } else if (student.average >= 35) {
            student.grade = "D";
        } else {
            student.grade = "F";
        }

        emit StudentResultUploaded(msg.sender, _studentAddress, _term, student.average, student.grade);
    }

    function getUploadedResult(address _studentAddress) public view returns (
        string memory firstName,
        string memory middleName,
        string memory lastName,
        uint256 biology, 
        uint256 physics, 
        uint256 mathematics, 
        uint256 chemistry, 
        uint256 geography, 
        uint256 history, 
        uint256 civics, 
        uint256 english, 
        uint256 kiswahili, 
        uint256 average, 
        string memory grade
    ) {
        // SubjectScores storage scores = students[_studentAddress].termResults[_term];
        Student storage student = students[_studentAddress];
        return (
            student.firstName,
            student.middleName,
            student.lastName,
            student.biology,
            student.physics,
            student.mathematics,
            student.chemistry,
            student.geography,
            student.history,
            student.civics,
            student.english,
            student.kiswahili,
            student.average,
            student.grade
        );
    }

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
        uint256 accomodationFee, 
        uint256 schoolFee, 
        bool isDeleted,
        uint256 biology, 
        uint256 physics, 
        uint256 mathematics, 
        uint256 chemistry, 
        uint256 geography, 
        uint256 history, 
        uint256 civics, 
        uint256 english, 
        uint256 kiswahili, 
        uint256 average, 
        string memory grade 
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
        accomodationFee = student.accomodationFee;
        schoolFee = student.schoolFee;
        isDeleted = student.isDeleted;
        biology = student.biology;
        physics = student.physics;
        mathematics = student.mathematics;
        chemistry = student.chemistry;
        geography = student.geography;
        history = student.history;
        civics = student.civics;
        english = student.english;
        kiswahili = student.kiswahili;
        average = student.average;
        grade = student.grade;
    }

    function uploadSubjectScore(address _studentAddress, string memory subjectName, uint256 _subjectScore) external {
        // require(teachersContract.isTeacher(msg.sender), "Only teachers can upload scores");
        // require(students[_studentAddress].isRegistered, "Student is not registered");

        // SubjectScores storage scores = students[_studentAddress].termResults[_term];
        Student storage student = students[_studentAddress];
        // student.subjectName = _subjectScore;

        if (keccak256(abi.encodePacked(subjectName)) == keccak256(abi.encodePacked("biology"))) {
            student.biology = _subjectScore;
        } else if (keccak256(abi.encodePacked(subjectName)) == keccak256(abi.encodePacked("physics"))) {
            student.physics = _subjectScore;
        } else if (keccak256(abi.encodePacked(subjectName)) == keccak256(abi.encodePacked("mathematics"))) {
            student.mathematics = _subjectScore;
        } else if (keccak256(abi.encodePacked(subjectName)) == keccak256(abi.encodePacked("chemistry"))) {
            student.chemistry = _subjectScore;
        } else if (keccak256(abi.encodePacked(subjectName)) == keccak256(abi.encodePacked("geography"))) {
            student.geography = _subjectScore;
        } else if (keccak256(abi.encodePacked(subjectName)) == keccak256(abi.encodePacked("history"))) {
            student.history = _subjectScore;
        } else if (keccak256(abi.encodePacked(subjectName)) == keccak256(abi.encodePacked("civics"))) {
            student.civics = _subjectScore;
        } else if (keccak256(abi.encodePacked(subjectName)) == keccak256(abi.encodePacked("english"))) {
            student.english = _subjectScore;
        } else if (keccak256(abi.encodePacked(subjectName)) == keccak256(abi.encodePacked("kiswahili"))) {
            student.kiswahili = _subjectScore;
        } else {
            revert("Invalid subject name");
        }

        // calculateAverageAndGrade(_studentAddress, _term);
    }

    function addSchoolFee(address _studentAddress, uint256 _schoolFee) external {
       Student storage student = students[_studentAddress];
       student.schoolFee += _schoolFee;
       students[_studentAddress] = student;
    }

    function addAccomodationFee(address _studentAddress, uint256 _accomodationFee) external {
       Student storage student = students[_studentAddress];
       student.accomodationFee += _accomodationFee;
       students[_studentAddress] = student;
    }


    // function compareString(string memory a, string memory b) private pure returns (bool) {
    //     return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    // }
}

