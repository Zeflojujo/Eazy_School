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
import { FaCrosshairs, FaInfoCircle, FaTimes, FaUser } from 'react-icons/fa'
import { addSubjectDetails, createAnnouncement, registerSubjectDetails } from '../../BlockchainService'
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loading"
import swal from "sweetalert";
import { NavLink } from "react-router-dom"
import { MdAccountBalance, MdDashboard } from "react-icons/md"
import { PiStudentBold } from "react-icons/pi"
import { GiTeacher } from "react-icons/gi"
import AnnouncementsTable from "../components/AnnouncementsTable"

const CreateAnnouncements = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const [modal] = useGlobalState('modal')

    const [isDisabled, setIsDisabled] = useState(true)

    const [user, setUser] = useState({
        title: "",
        description: "",
    })

    useEffect(() => {
        if (user.title === "" || user.description === "") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
        console.log(user)
    }, [user])

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const handleAnnouncementModal = () => {
        setGlobalState('modal', 'scale-100')
    }

    const handleAddAnnouncement = async (e) => {
        e.preventDefault()

        const annuncementCredentials = {
            title: user.title,
            description: user.description,
        }

        if (user.title === "" || user.description === "") return

        setGlobalState('modal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'creating announcement...' })

        try {

            setLoadingMsg('Executing transaction...')
            const result = await createAnnouncement(annuncementCredentials)
            console.log(result)

            if (result) {
                resetForm()
                swal({  
                    title: "Good job!",  
                    text: "Announcement is Created successfully...!",  
                    icon: "success",  
                    button: "Okay",  
                });  
                window.location.reload()
                // setAlert('Announcement is Created successfully...', 'green')
            } else {
                throw Error
            }

        } catch (error) {
            console.log('Error creating announcement file: ', error)
            setAlert('Creating announcement failed...', 'red')
            // swal({  
            //     title: "FAILED!",  
            //     text: "Creating announcement failed...!",  
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
            title: "",
            classLevel: "",
            description: "",
            passMark: ""
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

                <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                    {/* MedicalCenterTable component is included */}
                    <div className="w-4/5">
                        <button
                            onClick={handleAnnouncementModal}
                            className="bg-blue-500 mb-3 text-lg float-end text-white dark:bg-transparent hover:text-white dark:shadow-md dark:shadow-light-white dark:border dark:border-blue-500 dark:text-gray-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-lg top-4 right-4"
                        >
                            Add Announcement
                        </button>
                        <AnnouncementsTable />
                        <Alert />
                        <Loading />
                    </div>
                </div>

                <div
                    className={`fixed top-0 left-0 w-screen h-screen flex items-center
                                justify-center bg-black bg-opacity-50 transform
                                transition-transform duration-300 ${modal}`}
                >
                    <div className="shadow-md rounded-xl w-11/12 md:w-2/5 h-7/12 p-6 bg-gray-100 shadow-blue-600 dark:bg-[#151c25] dark:shadow-blue-600">
                    <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl md:text-3xl lg:text-3.5xl text-gray-400 mb-4">Create Announcement</h1>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="border-0 bg-transparent focus:outline-none"
                                >
                                    <FaTimes className="text-gray-400" />
                                </button>
                            </div>
                            <hr className="mb-3 text-gray-600 border-1 w-full border-gray-500" />
                    <form className="text-lg" onSubmit={handleAddAnnouncement}>

                         <div className="mb-4">
                             <label htmlFor="title" className='text-lg text-gray-500'>Title:</label>
                             <input
                                 id="title"
                                 type="title"
                                 value={user.title}
                                 className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                //   className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                 onChange={(e) => setUser({ ...user, title: e.target.value })}
                                 placeholder="title"
                             />
                         </div>

                         <div className="mb-4">
                             <label htmlFor="description" className='text-lg text-gray-500'>Description:</label>
                             <input
                                 id="description"
                                 type="description"
                                 value={user.description}
                                 className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                 // className="w-full border-2 border-gray-500 focus:border-blue-300 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                                 onChange={(e) => setUser({ ...user, description: e.target.value })}
                                 placeholder="description"
                             />
                         </div>

                         <button
                         type="submit"
                         className={`flex gap-1 items-center text-white justify-center bg-purple-500 hover:bg-purple-600 
                                     focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 
                                     py-2.5 text-center me-2 dark:bg-purple-500 dark:hover:bg-purple-600 
                                     dark:focus:ring-purple-300 w-full mt-5 ${isDisabled === true ? 'px-4 py-2 rounded-md cursor-not-allowed opacity-50' : ""}`}
                         disabled={isDisabled}
                         >
                             Announce
                         </button>
                     </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}

export default CreateAnnouncements
