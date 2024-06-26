import React, { useState } from "react"
import Sidebar from "../layouts/STSidebar"
import DashboardHeader from "../layouts/STHeader"
import { useGlobalState } from "../../store";

const StudentDashboard = () => {
    const [student] = useGlobalState("student");
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    console.log("student session data", student)

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    return (
        // const RetailersLists = ({ isLogin }) => {
        <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
            {/* Manufacturers Sidebar component is included */}
            <div className="fized">
                <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
            <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
                <div className="mb-16">
                    {/* Manufacturers Header component is included */}
                    <DashboardHeader toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>

                {/* Manufactuerers ViewFakeProduct page should be created here */}
                <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                    {/* Manufacturers RetailerTable component is included */}
                    <div className="w-3/4 max-h-screen mt-8 py-8 flex flex-col z-0 overflow-hidden items-center justify-center shadow-md bg-white dark:bg-transparent dark:border dark:border-blue-500 dark:shadow-md dark:rounded-md dark:shadow-gray-400">
                        <h1 className="hidden md:flex text-2xl text-gradient justify-center md:text-3xl lg:text-4xl font-bold mb-4">
                            Welcome to the Student Dashboard
                        </h1>
                    </div>
                    <div className="w-3/4 mx-auto px-4 py-8">
                        <div className="bg-white shadow-md rounded px-8 py-6 mb-4 dark:bg-[#212936] dark:text-gray-300 dark:shadow-md dark:rounded-md dark:shadow-gray-400">
                            <h2 className="text-2xl font-bold mb-2">Student Information</h2>
                            <hr className="mt-4 mb-4 h-4" />
                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="flex gap-3 text-gray-600 text-xl"><span className=" font-bold ">Public Address:</span><span>{student.studentAddress}</span></p>
                                </div>
                                <div>
                                    <p className="flex gap-3 text-gray-600 text-xl"><span className="font-bold ">Name:</span><span>{student.name}</span></p>
                                </div>
                                <div>
                                    <p className="flex gap-3 text-gray-600 text-xl"><span className="font-bold ">Phone Number:</span><span>{student.phoneNumber}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default StudentDashboard
