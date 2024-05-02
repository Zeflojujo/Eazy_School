// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./AccessControl.sol";

contract Admins is AccessControl {
    /// @dev create system owner structure
    struct SystemOwner {
        address sysOwner;
        string password /*audit*/;
        bool isLogin;
        bool isRegistered;
    }

    struct StudentClass {
        uint256 classId;
        string classLevel;
    }

    struct StudentYear {
        uint256 yearId;
        uint256 year;
    }

    struct FeeCategory {
        uint256 categoryId;
        string feeCategoryName;
    }

    struct FeeAmount {
        uint256 feeAmountId;
        string feeCategoryName;
        string studentClass;
        uint256 amount;
    }

    struct Designation {
        uint256 designationId;
        string designationName;
    }

    struct StudentCombination {
        uint256 combinationId;
        string combinationName;
    }

    struct ExamType {
        uint256 examTypeId;
        string examTypeName;
    }

    struct StudentSubject {
        uint256 subjectId;
        string subjectName;
    }

    struct SubjectDetail {
        uint256 subjectDetailId;
        string classLevel;
        string subjectName;
        uint256 fullMark;
        uint256 passMark;
    }


    SystemOwner private sysowner;

    mapping(address => SystemOwner) private sysOwnerMap;

    mapping(uint256 => StudentClass) private studentClasses;
    mapping(uint256 => StudentYear) private studentYears;
    mapping(uint256 => FeeCategory) private feeCategories;
    mapping(uint256 => FeeAmount) private feeAmounts;
    mapping(uint256 => StudentCombination) private studentCombinations;
    mapping(uint256 => StudentSubject) private studentSubjects;
    mapping(uint256 => SubjectDetail) private subjectDetails;
    mapping(uint256 => Designation) private designations;
    mapping(uint256 => ExamType) private examTypes;

    uint256[] studentClassArray;
    uint256[] feeCategoryArray;
    uint256[] feeAmounArray;
    uint256[] yearArray;
    uint256[] studentCombinationArray;
    uint256[] studentSubjectArray;
    uint256[] subjectDetailArray;
    uint256[] designationArray;
    uint256[] examTypeArray;

    uint256 feeCategoryId;
    uint256 feeAmountID;
    uint256 classId;
    uint256 yearId;
    uint256 combinationId;
    uint256 subjectId;
    uint256 subjectDetailId;
    uint256 designationId;
    uint256 examTypeId;

    constructor() {
        sysowner = SystemOwner(owner, "admin", false, true);
        sysOwnerMap[owner] = sysowner;
    }

    function changeAdmin(address newAdmin) public onlyOwner {
        owner = newAdmin;
    }

    function addStudentClass(string memory _classLevel) external {
        classId++;
        studentClasses[classId] = StudentClass({
            classId: classId,
            classLevel: _classLevel
        });
        studentClassArray.push(classId);
    }

    function getStudentClassArray() external view returns(uint256[] memory) {
        return studentClassArray;
    }

    function getStudentClass(uint256 _classId) external view returns(
        uint256 classID,
        string memory classLevel
    ) {
        StudentClass memory studentClass = studentClasses[_classId];
        classID = studentClass.classId;
        classLevel = studentClass.classLevel;
    }

    function addStudentYear(uint256 _year) external {
        yearId++;
        studentYears[yearId] = StudentYear({
            yearId: yearId,
            year: _year
        });
        yearArray.push(yearId);
    }

    function getStudentYearsArray() external view returns(uint256[] memory) {
        return yearArray;
    }

    function getStudentYears(uint256 _yearId) external view returns(
        uint256 yearID,
        uint256 year
    ) {
        StudentYear memory studentyear = studentYears[_yearId];
        yearID = studentyear.yearId;
        year = studentyear.year;
    }

    function addStudentCombination(string memory _combinationName) external {
        combinationId++;
        studentCombinations[combinationId] = StudentCombination({
            combinationId: combinationId,
            combinationName: _combinationName
        });
        studentCombinationArray.push(combinationId);
    }

    function getStudentCombinationArray() external view returns(uint256[] memory) {
        return studentCombinationArray;
    }

    function getStudentCombination(uint256 _combinationId) external view returns(
        uint256 combinationID,
        string memory combinationName
    ) {
        StudentCombination memory studentCombination = studentCombinations[_combinationId];
        combinationID = studentCombination.combinationId;
        combinationName = studentCombination.combinationName;
    }

    function addStudentSubject(string memory _subjectName) external {
        subjectId++;
        studentSubjects[subjectId] = StudentSubject({
            subjectId: subjectId,
            subjectName: _subjectName
        });
        studentSubjectArray.push(subjectId);
    }

    function getStudentSubjectArray() external view returns(uint256[] memory) {
        return studentSubjectArray;
    }

    function getStudentSubject(uint256 _subjectId) external view returns(
        uint256 subjectID,
        string memory subjectName
    ) {
        StudentSubject memory studentSubject = studentSubjects[_subjectId];
        subjectID = studentSubject.subjectId;
        subjectName = studentSubject.subjectName;
    }

    function addSubjectDetails(
        string memory _classLevel, 
        string memory _subjectName, 
        uint256 _fullMark, 
        uint256 _passMark
    ) external {
        subjectDetailId++;
        subjectDetails[subjectDetailId] = SubjectDetail({
            subjectDetailId: subjectDetailId,
            classLevel: _classLevel,
            subjectName: _subjectName,
            fullMark: _fullMark,
            passMark: _passMark
        });
        subjectDetailArray.push(subjectDetailId);
    }

    function getSubjectDetailsArray() external view returns(uint256[] memory) {
        return subjectDetailArray;
    }

    function getSubjectDetails(uint256 _subjectDetailId) external view returns(
        uint256 subjectDetailID,
        string memory classLevel, 
        string memory subjectName, 
        uint256 fullMark, 
        uint256 passMark
    ) {
        SubjectDetail memory subjectDetail = subjectDetails[_subjectDetailId];
        subjectDetailID = subjectDetail.subjectDetailId;
        classLevel = subjectDetail.classLevel;
        subjectName = subjectDetail.subjectName;
        fullMark = subjectDetail.fullMark;
        passMark = subjectDetail.passMark;
    }

    function addExamType(string memory _examTypeName) external {
        examTypeId++;
        examTypes[examTypeId] = ExamType({
            examTypeId: examTypeId,
            examTypeName: _examTypeName
        });
        examTypeArray.push(examTypeId);
    }

    function getExamTypeArray() external view returns(uint256[] memory) {
        return examTypeArray;
    }

    function getExamType(uint256 _examTypeId) external view returns(
        uint256 examTypeID,
        string memory examTypeName
    ) {
        ExamType memory examType = examTypes[_examTypeId];
        examTypeID = examType.examTypeId;
        examTypeName = examType.examTypeName;
    }

    function addFeeCategory(string memory _feeCategoryName) external {
        feeCategoryId++;
        feeCategories[feeCategoryId] = FeeCategory({
            categoryId: feeCategoryId,
            feeCategoryName: _feeCategoryName
        });
        feeCategoryArray.push(feeCategoryId);
    }

    function getFeeCategoryArray() external view returns(uint256[] memory) {
        return feeCategoryArray;
    }

    function getFeeCategory(uint256 _feeCategoryId) external view returns(
        uint256 feeCategoryID,
        string memory feeCategoryName
    ) {
        FeeCategory memory feeCategory = feeCategories[_feeCategoryId];
        feeCategoryID = feeCategory.categoryId;
        feeCategoryName = feeCategory.feeCategoryName;
    }

    function addFeeAmount(string memory _feeCategoryName, string memory _studentClass, uint256 _amount) external {
        feeAmountID++;
        feeAmounts[feeAmountID] = FeeAmount({
            feeAmountId: feeAmountID,
            feeCategoryName: _feeCategoryName,
            studentClass: _studentClass,
            amount: _amount
        });

        feeAmounArray.push(feeAmountID);
    }

    function getFeeAmountArray() external view returns(uint256[] memory) {
        return feeAmounArray;
    }

    function getFeeAmount(uint256 _feeAmountId) external view returns(
        uint256 feeAmountID,
        string memory categoryName,
        string memory studentClass,
        uint256 amount
    ) {
        FeeAmount memory feeAmount = feeAmounts[_feeAmountId];
        feeAmountID = feeAmount.feeAmountId;
        categoryName = feeAmount.feeCategoryName;
        studentClass = feeAmount.studentClass;
        amount = feeAmount.amount;
    }

    function systemOwnerLogin(address _SOPublicAddress, string memory _password) public onlyOwner {
        require(sysOwnerMap[_SOPublicAddress].isRegistered == true, "Your not registered yet!");
        // require(!medicalsCenters[_SOPublicAddress].isLogin, "You're already logged in");
        require(compareString(sysOwnerMap[_SOPublicAddress].password, _password), "Invalid address or password");

        sysOwnerMap[_SOPublicAddress].isLogin = true;
    }
}