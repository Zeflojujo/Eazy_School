import Sidebar from "../layouts/STSidebar"
import DashboardHeader from "../layouts/STHeader"
import {
      setGlobalState,
      setLoadingMsg,
      setAlert,
      useGlobalState,
      truncate,
    } from '../../store'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { addAccomodationFee, addSchoolFee } from '../../BlockchainService'
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loading"
import swal from "sweetalert";
import { Link } from "react-router-dom"
import FinanceTable from "../components/FinanceTable"


const StudentFinance = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const [modal] = useGlobalState('modal')
    const [modal2] = useGlobalState('modal2')
    const [years] = useGlobalState("studentYears");

    const [isDisabled, setIsDisabled] = useState(true)

    const [user, setUser] = useState({
        studentAddress: "",
        schoolFee: "",
        accomodationFee: "",
    })

    useEffect(() => {
        if (user.publicAddress === "") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
        console.log(user)
    }, [user, years])


    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const handleSchoolFeeModel = () => {
        setGlobalState('modal2', 'scale-100')
    }

    const handleAccomodationModel = () => {
        setGlobalState('modal', 'scale-100')
    }

    const handleAddAccomodationFee = async (e) => {
        e.preventDefault()

        const accomodationFeeCredentials = {
            publicAddress: user.publicAddress,
            accomodationFee: user.accomodationFee,
        }

        if (!user.publicAddress === "" || !user.accomodationFee === "") return

        setGlobalState('modal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'Registering Student...' })

        try {

            setLoadingMsg('Executing transaction...')
            // const password = user.lastName;
            const result = await addAccomodationFee(accomodationFeeCredentials)
            console.log(result)

            if (result) {
                resetForm()
                swal({  
                    title: "Good job!",  
                    text: "Accomodation Fee Added successfully...!",  
                    icon: "success",  
                    button: "Okay",  
                });  
                window.location.reload()
                // setAlert('Student is registered successfully...', 'green')
            } else {
                throw Error
            }

        } catch (error) {
            console.log('Error registering student file: ', error)
            setAlert('Student registration failed...', 'red')
        }
    }

    const handleAddSchoolFee = async (e) => {
        e.preventDefault()

        const schoolFeeCredentials = {
            publicAddress: user.publicAddress,
            schoolFee: user.schoolFee,
        }

        if (!user.publicAddress === "" || !user.schoolFee === "") return

        setGlobalState('modal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'School Fee is added...' })

        try {

            setLoadingMsg('Executing transaction...')
            // const password = user.lastName;
            const result = await addSchoolFee(schoolFeeCredentials)
            console.log(result)

            if (result) {
                resetForm()
                swal({  
                    title: "Good job!",  
                    text: "School Fee Added successfully...!",  
                    icon: "success",  
                    button: "Okay",  
                });  
                window.location.reload()
                // setAlert('Student is registered successfully...', 'green')
            } else {
                throw Error
            }

        } catch (error) {
            console.log('Error registering student file: ', error)
            setAlert('Student registration failed...', 'red')
        }
    }

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }

    const closeModal2 = () => {
        setGlobalState('modal2', 'scale-0')
        resetForm()
    }

    const resetForm = () => {
        setUser({
            studentAddress: "",
            schoolFee: "",
            accomodationFee: "",
            
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
                            <div className="flex flex-row gap-4 justify-end items-end">
                                <button
                                    onClick={handleSchoolFeeModel}
                                    className="bg-blue-500 mb-3 text-lg float-end text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
                                >
                                    Add School Fee
                                </button>
                                <button
                                    onClick={handleAccomodationModel}
                                    className="bg-blue-500 mb-3 text-lg float-end text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
                                >
                                    Add Accomodation
                                </button>
                            </div>
                            
                            <FinanceTable />
                            <Alert />
                            <Loading />
                        </div>            
                    {/* </div>  */}
                    <div
                        className={`fixed top-0 left-0 w-screen h-screen flex items-center
                                    justify-center bg-black bg-opacity-50 transform
                                    transition-transform duration-300 ${modal2}`}
                    >

                        <div className="shadow-md rounded-xl w-11/12 md:w-4/5 h-7/12 p-6 bg-gray-100 shadow-blue-600 dark:bg-[#232b35] dark:shadow-blue-600">
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl md:text-3xl lg:text-3.5xl text-gray-400 font-semibold mb-4">Add School Fee</h1>
                                <button
                                    type="button"
                                    onClick={closeModal2}
                                    className="border-0 bg-transparent focus:outline-none"
                                >
                                    <FaTimes className="text-gray-400" />
                                </button>
                            </div>
                            <hr className="mb-3 text-gray-600 border-2 border-gray-500" />

                            <form className="text-lg" onSubmit={handleAddSchoolFee}>

                                <div className="grid md:grid-cols-1 gap-x-2 mb-4 w-full mt-4">
                                    <div className="mb-4">
                                        <label htmlFor="publicAddress" className='text-gray-400 text-lg'>Wallet Public Address:</label>
                                        <input
                                            id="publicAddress"
                                            type="publicAddress"
                                            value={user.publicAddress}
                                            className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-400 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                            // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                            onChange={(e) => setUser({ ...user, publicAddress: e.target.value })}
                                            placeholder="publicAddress"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="schoolFee" className='text-gray-400 text-lg'> Amount:</label>
                                        <input
                                            id="schoolFee"
                                            type="schoolFee"
                                            value={user.schoolFee}
                                            className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-400 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                            // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                            onChange={(e) => setUser({ ...user, schoolFee: e.target.value })}
                                            placeholder="schoolFee"
                                        />
                                    </div>
                                   
                                </div>

                                

                                {/* <div className="mb-4">
                                <h1 className="text-gray-300 text-xl font-semibold md:text-2xl">Company Details:</h1>
                                <hr className="mb-3 text-gray-600 border-1 border-gray-500" />
                                </div> */}

                                

                                <button
                                type="submit"
                                className={`flex gap-1 items-center text-white justify-center bg-green-500 hover:bg-green-600 
                                            focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 
                                            py-2.5 text-center me-2 dark:bg-green-500 dark:hover:bg-green-600 
                                            dark:focus:ring-green-300 w-32 mt-5 ${isDisabled === true ? 'px-4 py-2 rounded-md cursor-not-allowed opacity-50' : ""}`}
                                disabled={isDisabled}
                                >
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>

                    <div
                        className={`fixed top-0 left-0 w-screen h-screen flex items-center
                                    justify-center bg-black bg-opacity-50 transform
                                    transition-transform duration-300 ${modal}`}
                    >

                        <div className="shadow-md rounded-xl w-11/12 md:w-4/5 h-7/12 p-6 bg-gray-100 shadow-blue-600 dark:bg-[#232b35] dark:shadow-blue-600">
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl md:text-3xl lg:text-3.5xl text-gray-400 font-semibold mb-4">Add Accomodation Fee</h1>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="border-0 bg-transparent focus:outline-none"
                                >
                                    <FaTimes className="text-gray-400" />
                                </button>
                            </div>
                            <hr className="mb-3 text-gray-600 border-2 border-gray-500" />

                            <form className="text-lg" onSubmit={handleAddAccomodationFee}>

                                <div className="grid md:grid-cols-1 gap-x-2 mb-4 w-full mt-4">
                                    <div className="mb-4">
                                        <label htmlFor="publicAddress" className='text-gray-400 text-lg'>Wallet Public Address:</label>
                                        <input
                                            id="publicAddress"
                                            type="publicAddress"
                                            value={user.publicAddress}
                                            className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-400 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                            // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                            onChange={(e) => setUser({ ...user, publicAddress: e.target.value })}
                                            placeholder="publicAddress"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="accomodationFee" className='text-gray-400 text-lg'>Amount:</label>
                                        <input
                                            id="accomodationFee"
                                            type="accomodationFee"
                                            value={user.accomodationFee}
                                            className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-400 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                            // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                            onChange={(e) => setUser({ ...user, accomodationFee: e.target.value })}
                                            placeholder="accomodationFee"
                                        />
                                    </div>
                                   
                                </div>

                                

                                {/* <div className="mb-4">
                                <h1 className="text-gray-300 text-xl font-semibold md:text-2xl">Company Details:</h1>
                                <hr className="mb-3 text-gray-600 border-1 border-gray-500" />
                                </div> */}

                                

                                <button
                                type="submit"
                                className={`flex gap-1 items-center text-white justify-center bg-green-500 hover:bg-green-600 
                                            focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 
                                            py-2.5 text-center me-2 dark:bg-green-500 dark:hover:bg-green-600 
                                            dark:focus:ring-green-300 w-32 mt-5 ${isDisabled === true ? 'px-4 py-2 rounded-md cursor-not-allowed opacity-50' : ""}`}
                                disabled={isDisabled}
                                >
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default StudentFinance



