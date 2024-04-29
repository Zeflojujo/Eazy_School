import { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./+homedirectory/pages/Home";
import "./index.css";

import {
  isWallectConnected,
  displayStudents,
  displayTeachers,
  displayAccountants,
  displayStudentClass,
  displayStudentYear,
  displayStudentCombination,
  displayStudentSubject,
  displaySubjectDetails,
  displayExamType,
  displayFeeCategoryAmount,
  displayFeeCategories
} from "./BlockchainService";

import { useGlobalState } from "./store";
import StudentLogin from "./students/pages/authentication/StudentLogin";
import StudentDashboard from "./students/pages/StudentDashboard";
import TeacherLogin from "./teachers/pages/authentication/TeacherLogin";
import TeacherDashboard from "./teachers/pages/TeacherDashboard";
import AcademicLogin from "./academic/pages/authentication/AcademicLogin";
import AcademicDashboard from "./academic/pages/AcademicDashboard";
import AccountantLogin from "./accountant/pages/authentication/AccountantLogin";
import AccountantDashboard from "./accountant/pages/AccountantDashboard";
import SchoolLogin from "./school/pages/authentication/SchoolLogin";
import SchoolDashboard from "./school/pages/SchoolDashboard";
import RegisterStudent from "./school/pages/RegisterStudent";
import RegisterTeacher from "./school/pages/RegisterTeacher";
import ChatbotApp from "./chatbot/ChatbotApp";
import RegisterAccountant from "./school/pages/RegisterAccountant";
import RegisterStudents from "./school/pages/RegisterStudents";
import FeeCategoryAmount from "./school/pages/FeeCategoryAmount";
import FeeCategory from "./school/pages/FeeCategory";
import StudentClass from "./school/pages/StudentClass";
import StudentCombination from "./school/pages/StudentCombination";
import StudentYear from "./school/pages/StudentYear";
import ExamType from "./school/pages/ExamType";
import StudentSubject from "./school/pages/StudentSubject";

function App() {
  const [connectedAccount] = useGlobalState("connectedAccount")
  const [connctAccount, setConntAccount] = useState("")

  useEffect(() => {
    const isConnected = async () => {
      await isWallectConnected();
      await displayStudents();
      await displayTeachers();
      await displayAccountants();
      await displayStudentClass();
      await displayStudentYear();
      await displayStudentCombination();
      await displayStudentSubject();
      await displaySubjectDetails();
      await displayFeeCategories();
      await displayExamType();
      await displayFeeCategoryAmount();
    };
    isConnected();
  }, [connectedAccount, connctAccount]);

  useEffect(()=> {
    setConntAccount(connectedAccount);
  })

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* school Routes */}
        <Route path="/school/login" element={<SchoolLogin />} />
        <Route path="/school/dashboard" element={<SchoolDashboard />} />
        <Route path="/school/student" element={<RegisterStudent />} />
        <Route path="/school/students" element={<RegisterStudents />} />
        <Route path="/school/teacher" element={<RegisterTeacher />} />
        <Route path="/school/accountant" element={<RegisterAccountant />} />
        <Route path="/school/fee-amount" element={<FeeCategoryAmount />} />
        <Route path="/school/fee-category" element={<FeeCategory />} />
        <Route path="/school/student-class" element={<StudentClass />} />
        <Route path="/school/combination" element={<StudentCombination />} />
        <Route path="/school/year" element={<StudentYear />} />
        <Route path="/school/exam-type" element={<ExamType />} />
        <Route path="/school/student-subject" element={<StudentSubject />} />
        
        {/* teacher Routes */}
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        
        {/* Student Routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Accountant Routes */}
        <Route path="/accountant/login" element={<AccountantLogin />} />
        <Route path="/accountant/dashboard" element={<AccountantDashboard />} />

        {/* Academic Routes */}
        <Route path="/academic/login" element={<AcademicLogin />} />
        <Route path="/academic/dashboard" element={<AcademicDashboard />} />

        {/* ChatbotApp */}
        <Route path="/assistant" element={<ChatbotApp />} />
      </Routes>
    </Router>
  );
}

export default App;
