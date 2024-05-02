import Sidebar from "../layouts/SchoolSidebar"
import DashboardHeader from "../layouts/SchoolHeader"
import {
      setGlobalState,
      setLoadingMsg,
      setAlert,
      useGlobalState,
      truncate,
    } from '../../store'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { registerStudents } from '../../BlockchainService'
import medicalCenter from "../../assets/study.jpg"
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loading"
import StudentTable from "../components/StudentTable"
import swal from "sweetalert";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom"


const RegisterStudents = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const [modal] = useGlobalState('modal')
    const [classLevels] = useGlobalState("studentClasses");
    const [combinations] = useGlobalState("studentCombinations");
    const [years] = useGlobalState("studentYears");
    const [allYears, setAllYears] = useState([])
    const [allClassLevel, setAllClassLevel] = useState([])
    const [allCombination, setAllCombination] = useState([])

    const [isDisabled, setIsDisabled] = useState(true)

    const [user, setUser] = useState({
        studentAddress: "",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        religion: "",
        dob: "",
        classLevel: "",
        combination: "",
        phoneNumber: "",
        studentLocation: "",
        year: "",
    })

    useEffect(() => {
        setAllYears(years)
        setAllCombination(combinations)
        setAllClassLevel(classLevels)
        if (user.publicAddress === "" || user.firstName === "" || user.middleName === "" || user.lastName === "" || user.examNumber === "" || user.gender === ""
            || user.religion === "" || user.dob === "" || !user.classLevel || user.combination === "" || user.phoneNumber === ""  || user.studentLocation === "" || user.year === "") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
        console.log(user)
    }, [user, years])


    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const handleRegisterMedicalStaffModel = () => {
        setGlobalState('modal', 'scale-100')
    }

    const handleStudentRegistration = async (e) => {
        e.preventDefault()

        const registerStudentCredentials = {
            publicAddress: user.publicAddress,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            gender: user.gender,
            religion: user.religion,
            dob: user.dob,
            classLevel: user.classLevel,
            combination: user.combination,
            phoneNumber: user.phoneNumber,
            studentLocation: user.studentLocation,
            year: Number(user.year),
            password: user.lastName
        }

        if (!user.publicAddress === "" || !user.firstName === "" || !user.middleName === "" || !user.lastName === "" || !user.gender === ""
        || !user.religion === "" || !user.dob === "" || !user.classLevel || !user.combination === "" || !user.phoneNumber === ""  || !user.studentLocation === "" || !user.year === "") return

        setGlobalState('modal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'Registering Student...' })

        try {

            setLoadingMsg('Intializing transaction...')
            // const password = user.lastName;
            const result = await registerStudents(registerStudentCredentials)
            console.log(result)

            if (result) {
                resetForm()
                swal({  
                    title: "Good job!",  
                    text: "Student registered successfully...!",  
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
            setAlert('MedicalCenter registration failed...', 'red')
        }
    }

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }

    const resetForm = () => {
        setUser({
            studentAddress: "",
            firstName: "",
            middleName: "",
            lastName: "",
            gender: "",
            religion: "",
            dob: "",
            classLevel: "",
            combination: "",
            phoneNumber: "",
            studentLocation: "",
            year: "",
        })
    }

    return (
        <div className="flex min-h-screen dark:bg-[#212936] dark:text-gray-300">
            {/* Sidebar component is included */}
            <div className="relative">
                <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </div>
            <div className="flex flex-col w-full gap-y-4 text-3xl semibold h-full">
                <div className="mb-16">
                    {/* Header component is included */}
                    <DashboardHeader toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                </div>

                {/* ViewFakeProduct page should be created here */}
                <div className="flex flex-col justify-center items-center mx-auto w-full">
                    {/* Header component is included */}

                    {/* <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                        {/* MedicalCenterTable component is included */}
                        <div className="w-4/5">
                            <button
                                onClick={handleRegisterMedicalStaffModel}
                                className="bg-blue-500 mb-3 text-lg float-end text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
                            >
                                Add Student
                            </button>
                            <StudentTable />
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
                                <h1 className="text-2xl md:text-3xl lg:text-3.5xl text-gray-400 font-semibold mb-4">Student Registration Form</h1>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="border-0 bg-transparent focus:outline-none"
                                >
                                    <FaTimes className="text-gray-400" />
                                </button>
                            </div>
                            <hr className="mb-3 text-gray-600 border-2 border-gray-500" />

                            <form className="text-lg" onSubmit={handleStudentRegistration}>

                                <div className="mb-4">
                                    <h1 className="text-gray-300 text-xl font-semibold md:text-2xl">Account Details:</h1>
                                    <hr className="mb-3 text-gray-600 border-1 border-gray-500" />
                                </div>

                                <div className="grid md:grid-cols-3 gap-x-2 mb-4 w-full mt-4">
                                    <div className="mb-4">
                                        <label htmlFor="publicAddress" className='text-gray-500 text-lg'>Wallet Public Address:</label>
                                        <input
                                        id="publicAddress"
                                        type="publicAddress"
                                        value={user.publicAddress}
                                        className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                        // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                        onChange={(e) => setUser({ ...user, publicAddress: e.target.value })}
                                        placeholder="publicAddress"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="firstName" className='text-gray-500 text-lg'>First Name:</label>
                                        <input
                                        id="firstName"
                                        type="firstName"
                                        value={user.firstName}
                                        className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                        // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                        placeholder="firstName"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="middleName" className='text-gray-500 text-lg'>Middle Name:</label>
                                        <input
                                        id="middleName"
                                        type="middleName"
                                        value={user.middleName}
                                        className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                        // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                        onChange={(e) => setUser({ ...user, middleName: e.target.value })}
                                        placeholder="middleName"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-x-2 mb-4 w-full mt-4">
                                    <div className="mb-4">
                                        <label htmlFor="lastName" className='text-gray-500 text-lg'>Last Name:</label>
                                        <input
                                        id="lastName"
                                        type="lastName"
                                        value={user.lastName}
                                        className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                        // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                        placeholder="lastName"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="religion" className="block text-lg font-medium text-gray-600 dark:text-gray-300">
                                            Student Religion:
                                        </label>
                                        <select
                                            className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                            // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                            name="religion"
                                            type="text"
                                            onChange={(e) => setUser({...user, religion: e.target.value})}
                                            value={user.religion}
                                            required
                                        >
                                            <option value="" disabled>Select Student religion</option>
                                            <option value="Christianity">Christianity</option>
                                            <option value="Islamic">Islamic</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="dob" className='text-lg text-gray-500'>Date of Birth:</label>
                                        <input
                                        id="dob"
                                        type="date"
                                        value={user.dob}
                                        className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                        // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                        onChange={(e) => setUser({ ...user, dob: e.target.value })}
                                        placeholder="dob"
                                        />
                                    </div>
                                    
                                </div>

                                {/* <div className="mb-4">
                                <h1 className="text-gray-300 text-xl font-semibold md:text-2xl">Company Details:</h1>
                                <hr className="mb-3 text-gray-600 border-1 border-gray-500" />
                                </div> */}

                                <div className="grid md:grid-cols-3 gap-x-2 mb-4 w-full mt-4">
                                    <div className="mt-4">
                                        <label htmlFor="classLevel" className="block text-lg font-medium text-gray-600 dark:text-gray-300">
                                            Student Class:
                                        </label>
                                        <select
                                            className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                            // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                            name="classLevel"
                                            type="text"
                                            onChange={(e) => setUser({...user, classLevel: e.target.value})}
                                            value={user.classLevel}
                                            required
                                        >
                                            <option value="" disabled>Select Student classLevel</option>
                                            {allClassLevel.map((classLevel, index) => (
                                                <option key={index} value={classLevel.classLevelName}>{classLevel.classLevel}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="combination" className="block text-lg font-medium text-gray-600 dark:text-gray-300">
                                            Student Combination:
                                        </label>
                                        <select
                                            className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                            name="combination"
                                            type="text"
                                            onChange={(e) => setUser({...user, combination: e.target.value})}
                                            value={user.combination}
                                            required
                                        >
                                            <option value="" disabled>Select Student Combination</option>
                                            {allCombination.map((combination, index) => (
                                                <option key={index} value={combination.combinationName}>{combination.combinationName}</option>
                                            ))}
                                        </select>
                                    </div>
                                
                                    <div className="mb-4">
                                        <label htmlFor="phoneNumber" className='text-lg text-gray-500'>Phone Number:</label>
                                        <input
                                        id="phoneNumber"
                                        type="phoneNumber"
                                        value={user.phoneNumber}
                                        className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                        // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                        onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                                        placeholder="phoneNumber"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-x-2 mb-4 w-full mt-4">
                                    
                                    <div className="mb-4">
                                        <label htmlFor="studentLocation" className='text-lg text-gray-500'>studentLocation:</label>
                                        <input
                                        id="studentLocation"
                                        type="studentLocation"
                                        value={user.studentLocation}
                                        className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                        onChange={(e) => setUser({ ...user, studentLocation: e.target.value })}
                                        placeholder="studentLocation"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="classLevel" className="block text-lg font-medium text-gray-600 dark:text-gray-300">
                                            Student Gender:
                                        </label>
                                        <select
                                            className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                            // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                            name="gender"
                                            type="text"
                                            onChange={(e) => setUser({...user, gender: e.target.value})}
                                            value={user.gender}
                                            required
                                        >
                                            <option value="" disabled>Select Student Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="year" className="block text-lg font-medium text-gray-600 dark:text-gray-300">
                                            Student Year:
                                        </label>
                                        <select
                                            className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                            name="year"
                                            type="number"
                                            onChange={(e) => setUser({...user, year: e.target.value})}
                                            value={user.year}
                                            required
                                        >
                                            <option value="" disabled>Select Year of Study</option>
                                            {years.map((year, index) => (
                                                <option key={index} value={year.year.toString()}>{year.year.toString()}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>

                                <button
                                type="submit"
                                className={`flex gap-1 items-center text-white justify-center bg-blue-500 hover:bg-blue-600 
                                            focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 
                                            py-2.5 text-center me-2 dark:bg-blue-500 dark:hover:bg-blue-600 
                                            dark:focus:ring-blue-300 w-full mt-5 ${isDisabled === true ? 'px-4 py-2 rounded-md cursor-not-allowed opacity-50' : ""}`}
                                disabled={isDisabled}
                                >
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default RegisterStudents



