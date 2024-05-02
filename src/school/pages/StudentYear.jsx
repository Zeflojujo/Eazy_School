import Sidebar from "../layouts/SchoolSidebar"
import DashboardHeader from "../layouts/SchoolHeader"
import {
      setGlobalState,
      setLoadingMsg,
      setAlert,
      useGlobalState,
    } from '../../store'
import { useEffect, useState } from 'react'
import { FaCrosshairs, FaInfoCircle, FaTimes, FaUser } from 'react-icons/fa'
import { addStudentYear } from '../../BlockchainService'
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loading"
import swal from "sweetalert";
import { NavLink } from "react-router-dom"
import { MdAccountBalance, MdDashboard } from "react-icons/md"
import { PiStudentBold } from "react-icons/pi"
import { GiTeacher } from "react-icons/gi"
import StudentYearTable from "../components/StudentYearTable"


const StudentYear = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const [modal] = useGlobalState('modal')

    const [isDisabled, setIsDisabled] = useState(true)

    const [user, setUser] = useState({
        year: ""
    })

    const Menus = [
        { title: "Student Class", link: "/school/student-class", icon: <MdDashboard /> },
        { title: "Student Year", link: "/school/year", icon: <FaUser /> },
        { title: "Student Combination", link: "/school/combination", icon: <FaInfoCircle /> },
        { title: "Fee Category", link: "/school/fee-category",dropdown: true, icon: <FaCrosshairs /> },
        { title: "Fee Category Amount", link: "/school/fee-amount", icon: <PiStudentBold /> },
        { title: "Exam Type", link: "/school/exam-type", icon: <GiTeacher /> },
        { title: "Student Subject", link: "/school/student-subject", icon: <MdAccountBalance /> },
    ]

    useEffect(() => {
        if (user.year === "") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
        console.log(user)
    }, [user])

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const handleAddCombinatinModel = () => {
        setGlobalState('modal', 'scale-100')
    }

    const handleAddYear = async (e) => {
        e.preventDefault()

        const studentYearCredentials = {
            year: user.year
        }

        if (user.year === "") return

        setGlobalState('modal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'Registering Class...' })

        try {

            setLoadingMsg('Executing transaction...')
            const result = await addStudentYear(studentYearCredentials)
            console.log(result)

            if (result) {
                resetForm()
                swal({  
                    title: "Good job!",  
                    text: "Year registered successfully...!",  
                    icon: "success",  
                    button: "Okay",  
                });  
                window.location.reload()
                // setAlert('Student is registered successfully...', 'green')
            } else {
                throw Error
            }

        } catch (error) {
            console.log('Error registering medical center file: ', error)
            setAlert('Class registration failed...', 'red')
            // swal({  
            //     title: "FAILED!",  
            //     text: "Fee category registration failed...!",  
            //     icon: "warning",  
            //     button: "Okay",  
            // }); 
        }
    }

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }

    const resetForm = () => {
        setUser({
            year: ""
        })
    }

    return (
        <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
            {/* Sidebar component is included */}
            <div className="relative">
                <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
            <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
                <div className="mb-0">
                    {/* Header component is included */}
                    <DashboardHeader toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>

                <div className="flex flex-row mt-0 dark:bg-[#232b35] py-16 h-full">
                    <div className="flex flex-col w-1/5 shadow-sm shadow-gray-400 dark:bg-[#232b35]">
                        <div className="my-4">
                            <h1 className="text-gray-500 text-center text-xl  md:text-2xl">Setup Management</h1>
                            <hr className="mb-3 mt-3 text-gray-600 border-1 border-gray-500" />
                        </div>
                        <ul className="pt-6 mr-0">
                            {Menus.map((menu, index) => (
                                <li
                                    className={`text-gray-300 text-sm flex items-center gap-x-4 hover:font-semibold hover:text-purple-800
                                            cursor-pointer py-1 rounded-md ${menu.gap ? "mt-9" : "mt-2"
                                        } dark:text-gray-500`}
                                    key={index}
                                >
                                    <NavLink
                                        to={`${menu.link}`}
                                        className={` flex w-full gap-x-4 items-center text-gray-200 px-5 py-3 dark:text-gray-400 dark:hover:text-gray-600 hover:text-gray-600 hover:font-semibold origin-left duration-300`}
                                    >
                                        {/* <span className="text-2xl ">{menu.icon}</span> */}
                                        <span>{menu.title}</span>
                                        {/* {menu.dropdown ? (
                                            <div className={`${!isOpen ? "" : "pl-20"}`}>
                                                <IoIosArrowForward />
                                            </div>
                                        ) : (
                                            ""
                                        )} */}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* ViewFakeProduct page should be created here */}
                <div className="flex flex-col mx-auto w-full ml-8">
                    {/* Header component is included */}

                    {/* <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                        {/* MedicalCenterTable component is included */}
                        <div className="w-4/5">
                            <button
                                // to={"/school/fee-amount"}
                                onClick={handleAddCombinatinModel}
                                className="bg-blue-500 mb-3 text-lg float-end text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
                            >
                                Add Year
                            </button>
                            <StudentYearTable />
                            <Alert />
                            <Loading />
                        </div>            
                    {/* </div>  */}

                    <div
                        className={`fixed top-0 left-0 w-screen h-screen flex items-center
                                    justify-center bg-black bg-opacity-50 transform
                                    transition-transform duration-300 ${modal}`}
                    >
                        <div className="shadow-lg rounded-xl w-11/12 md:w-4/5 h-7/12 p-6 bg-gray-100 shadow-blue-600 dark:bg-[#232b35] dark:shadow-blue-600">
                            
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl md:text-3xl lg:text-3.5xl text-gray-400 mb-4">Add Year</h1>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="border-0 bg-transparent focus:outline-none"
                                >
                                    <FaTimes className="text-gray-400" />
                                </button>
                            </div>
                            <hr className="mb-3 text-gray-600 border-1 w-full border-gray-500" />


                            <form className="text-lg" onSubmit={handleAddYear}>

                                <div className="grid md:grid-cols-1 gap-x-2 mb-4 w-full mt-4">

                                    <div className="mb-4">
                                        <label htmlFor="year" className='text-lg text-gray-500'>Year Name:</label>
                                        <input
                                            id="year"
                                            type="number"
                                            value={user.year}
                                            className="mt-1 px-3 py-1.5 md:py-2 w-full required:* border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                            // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                            onChange={(e) => setUser({ ...user, year: e.target.value })}
                                            placeholder="Enter year"
                                        />
                                    </div>                           
                                </div>

                                <button
                                type="submit"
                                className={`flex gap-1 items-center text-white justify-center bg-purple-500 hover:bg-purple-600 
                                            focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 
                                            py-2.5 text-center me-2 dark:bg-purple-500 dark:hover:bg-purple-600 
                                            dark:focus:ring-purple-300 w-full mt-5 ${isDisabled === true ? 'px-4 py-2 rounded-md cursor-not-allowed opacity-50' : ""}`}
                                disabled={isDisabled}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>


                </div>

                </div>

                
            </div>
        </div>
    )
}

export default StudentYear



