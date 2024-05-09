import Sidebar from "../layouts/SchoolSidebar"
import DashboardHeader from "../layouts/SchoolHeader"
import { useState } from 'react'
import AnnounceTable from "../components/AnnounceTable"

const Announcements = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true)

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
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
                        <AnnounceTable />
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}

export default Announcements
