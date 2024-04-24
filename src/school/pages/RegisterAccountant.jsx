import Sidebar from "../layouts/SchoolSidebar"
import DashboardHeader from "../layouts/SchoolHeader"
import {
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
} from '../../store'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { registerStudent, registerTeacher } from '../../BlockchainService'
import medicalCenter from "../../assets/background.jpg"
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loading"
import swal from "sweetalert";
import AccountantTable from "../components/AccountantTable"

const RegisterAccountant = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const [modal] = useGlobalState('modal')
    const [publicAddress, setPublicAddress] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

   

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const handleRegisterMedicalStaffModel = () => {
        setGlobalState('modal', 'scale-100')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!publicAddress || !name || !email || !phoneNumber) return

        setGlobalState('modal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'Registering Student...' })

        try {

            setLoadingMsg('Intializing transaction...')
            const password = "12345678"
            const result = await registerTeacher({ publicAddress, name, email, phoneNumber, password })
            console.log("result: ", result)

            if (result) {
                resetForm()
                swal({  
                    title: "Good job!",  
                    text: "Teacher registered successfully...!",  
                    icon: "success",  
                    button: "Okay",  
                }); 
                window.location.reload();
                // setAlert('Teacher registration completed...', 'green')
            } else {
                throw Error
            }

        } catch (error) {
            console.log('Error registering teacher: ', error);
            setAlert('Teacher registration failed...', 'red')
        }
    }

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }

    const resetForm = () => {
        setPublicAddress('')
        setName('')
        setPhoneNumber('')
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

                    <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                        {/* MedicalCenterTable component is included */}
                        <div className="w-4/5">
                            <button
                                onClick={handleRegisterMedicalStaffModel}
                                className="bg-blue-500 mb-3 text-lg float-end text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
                            >
                                Add Accountant
                            </button>
                            <AccountantTable />
                            <Alert />
                            <Loading />
                        </div>
                    </div>

                    <div
                        className={`fixed top-0 left-0 w-screen h-screen flex items-center
                                    justify-center bg-black bg-opacity-50 transform
                                    transition-transform duration-300 ${modal}`}
                    >
                        <div className="shadow-lg rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 bg-gray-100 shadow-blue-600 dark:bg-[#151c25] dark:shadow-[#e32970]">
                            <form className="flex flex-col">
                                <div className="flex flex-row justify-center items-center rounded-xl mt-5">
                                    <div className="shrink-0 rounded-xl overflow-hidden h-32 w-full mb-8">
                                        <img
                                            alt="medicalCenter"
                                            className="h-full w-full object-cover cursor-pointer"
                                            src={medicalCenter}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between items-center">
                                    <p className="font-semibold text-gray-600">Register Accountant</p>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="border-0 bg-transparent focus:outline-none"
                                    >
                                        <FaTimes className="text-gray-400" />
                                    </button>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="MCPublicAddress" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Public Address:
                                    </label>
                                    <input
                                        className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                        type="text"
                                        name="publicAddress"
                                        placeholder="publicAddress"
                                        onChange={(e) => setPublicAddress(e.target.value)}
                                        value={publicAddress}
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="MCPublicAddress" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Accountant Name:
                                    </label>
                                    <input
                                        className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                        type="text"
                                        name="name"
                                        placeholder="name"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        required
                                    />
                                </div>
                                
                                <div className="mt-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Email:
                                    </label>
                                    <input
                                        className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                        type="text"
                                        name="email"
                                        placeholder="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                <label htmlFor="MCPublicAddress" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Phone Number:
                                    </label>
                                    <input
                                        className="mt-1 px-3 py-1.5 md:py-2 w-full border dark:border-solid dark:border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding"
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="phoneNumber"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        value={phoneNumber}
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 justify-center items-center">
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="flex flex-row justify-center items-center
                                        w-3/4 text-white text-base md:text-lg bg-blue-700 dark:bg-blue-600
                                        hover:bg-blue-600 py-2 px-5 rounded-lg drop-shadow-xl border border-transparent
                                        hover:bg-transparent hover:text-blue-600 hover:border hover:border-blue-600
                                        focus:outline-none focus:ring mt-5"
                                    >
                                        Register
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex flex-row justify-center items-center
                                        w-1/4 text-white text-base md:text-lg bg-orange-700 dark:bg-orange-600
                                        py-2 px-5 rounded-lg drop-shadow-xl border border-transparent
                                        hover:bg-transparent hover:text-orange-600 hover:border hover:border-orange-600
                                        focus:outline-none focus:ring mt-5"
                                    >
                                        Reset
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RegisterAccountant

