// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./AccessControl.sol";

contract Teachers is AccessControl{

    event deletedTeacher(address indexed teacherAddress);

    struct Teacher {
        address teacherAddress;
        string name;
        string subjects;
        string email;
        string phoneNumber;
        string password;
        bool isRegistered;
        bool isLogin;
        bool isDeleted;
    }

    mapping(address => Teacher) public teachers;

    address[] private teacherAddressArray;

    function registerTeacher(address _teacherAddress, string memory _name, string memory _subjects, string memory _email, string memory _phoneNumber, string memory _password) public {
        teachers[_teacherAddress] = Teacher({
            teacherAddress: _teacherAddress,
            name: _name,
            subjects: _subjects,
            email: _email,
            phoneNumber: _phoneNumber,
            password: _password,
            isRegistered: true,
            isLogin: false,
            isDeleted: false
        });
        teacherAddressArray.push(_teacherAddress);
    }

    function deleteTeacher(address _teacherAddress) external {
        require(!teachers[_teacherAddress].isDeleted, "Teacher does not exist");
        Teacher storage teacher = teachers[_teacherAddress];
        teacher.isDeleted = true;
        delete(teacher.teacherAddress);
        teachers[_teacherAddress] = teacher;
        emit deletedTeacher(_teacherAddress);
    }

    function  teacherLogin(address _teacherAddress, string memory _password) external {
        require(teachers[_teacherAddress].isRegistered == true, "Your not registered yet!");
        // require(teachers[_teacherAddress].isLogin == false, "Your Already login");
        require(compareString(teachers[_teacherAddress].password, _password), "Invalid address or password");
        
        teachers[_teacherAddress].isLogin = true;
    }

    function getTeacherArray() external view returns(address[] memory) {
        return teacherAddressArray;
    }

    function getTeacher(address _teacherAddress) external view returns(
        address teacherAddress,
        string memory name,
        string memory subjects,
        string memory email,
        string memory phoneNumber,
        bool isDeleted
    ) {
        Teacher memory teacher = teachers[_teacherAddress];
        teacherAddress = teacher.teacherAddress;
        name = teacher.name;
        subjects = teacher.subjects;
        email = teacher.email;
        phoneNumber = teacher.phoneNumber;
        isDeleted = teacher.isDeleted;
    }
}