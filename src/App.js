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
  displayFeeCategories,
  displayAnnouncements,
  displayFirstTermResult,
  displayStudent,
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
import CreateAnnouncements from "./school/pages/CreateAnnouncements";
import Academic from "./students/pages/Academic";
import UploadStudentResult from "./teachers/pages/UploadStudentResult";
import TStudents from "./teachers/pages/TStudents";
import Announcements from "./students/pages/Announcements";
import StudentFinance from "./students/pages/StudentFinance";
import AccountantFinance from "./accountant/pages/AccountantFinance";

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
      await displayAnnouncements();
      // await displayFirstTermResult();
      await displayStudent();
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
        <Route path="/school/announcements" element={<CreateAnnouncements />} />
        
        {/* Teacher Routes */}
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/Students" element={<TStudents />} />
        <Route path="/teacher/upload-result" element={<UploadStudentResult />} />
        
        {/* Student Routes */}
        <Route path="/parent/login" element={<StudentLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/academic" element={<Academic />} />
        <Route path="/student/announcements" element={<Announcements />} />
        <Route path="student/finance" element={<StudentFinance />} />

        {/* Accountant Routes */}
        <Route path="/accountant/login" element={<AccountantLogin />} />
        <Route path="/accountant/dashboard" element={<AccountantDashboard />} />
        <Route path="/accountant/finance" element={<AccountantFinance />} />

        {/* Academic Routes */}
        <Route path="/academic/login" element={<AcademicLogin />} />

        {/* ChatbotApp */}
        <Route path="/assistant" element={<ChatbotApp />} />
      </Routes>
    </Router>
  );
}

export default App;
