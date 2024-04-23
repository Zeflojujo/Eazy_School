import { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./+homedirectory/pages/Home";

import {
  displayStudents,
  isWallectConnected,
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
import Student from "./school/pages/RegisterStudent";
import RegisterStudent from "./school/pages/RegisterStudent";
import RegisterTeacher from "./school/pages/RegisterTeacher";
import ChatbotApp from "./chatbot/ChatbotApp";

function App() {
  const [connectedAccount] = useGlobalState("connectedAccount")
  const [connctAccount, setConntAccount] = useState("")
  const [medicalCenter, setMedicalCenter] = useState("");

  useEffect(() => {
    const isConnected = async () => {
      await isWallectConnected();
      await displayStudents();
    };
    isConnected();
  }, [connectedAccount, connctAccount, medicalCenter]);

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
        <Route path="/school/teacher" element={<RegisterTeacher />} />
        
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
