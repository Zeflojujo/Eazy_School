import React from "react"
// import { FaAngleLeft } from "react-icons/fa6";
import { MdAnnouncement, MdBloodtype, MdDashboard } from "react-icons/md"
// import { FaBook } from "react-icons/fa"
import { IoIosArrowForward } from "react-icons/io"
import { NavLink } from "react-router-dom"
import { AiFillInsurance } from "react-icons/ai"

// import "./Sidebar.css"

const ACSidebar = ({ isOpen, toggleSidebar }) => {
    // const [open, setOpen] = useState(true);
    // const [selected, setSelected] = useState(true);

    const Menus = [
        { title: "Dashboard", link: "/accountant/dashboard", icon: <MdDashboard /> },
        // { title: "Academic", link: "/accountant/academic", icon: <FaBook /> },
        { title: "Finance", link: "/accountant/finance", icon: <AiFillInsurance /> },
        // { title: "Announcements", link: "/accountant/announcements", icon: <MdAnnouncement /> },
    ]

    return (
        <div className="flex relative h-full">
            <div
                className={`self-start sticky32 top-0 inset-y-0 left-0 ${isOpen ? "w-72" : "w-20"
                    } text-lg font-semibold h-full duration-300 pt-8 bg-blue-600 dark:bg-[#212936] dark:shadow-md dark:shadow-gray-600`}
            >
                <div className="flex items-center border-b-2 border-b-gray-300 pb-3 border-opacity-35">
                    <span>
                        <MdBloodtype
                            className={`cursor-pointer mx-5 duration-500 text-4xl text-red-800`}
                        />
                    </span>
                    <h1
                        className={`text-white origin-left font-medium text-2xl duration-300 ${!isOpen && "scale-0"
                            } dark:text-gray-300`}
                    >
                        Eazy-School
                    </h1>
                </div>
                <ul className="pt-6 mr-0">
                    {Menus.map((menu, index) => (
                        <li
                            className={`text-gray-300 text-md flex items-center gap-x-4 hover:font-semibold hover:text-purple-800
                                cursor-pointer py-1 rounded-md ${menu.gap ? "mt-9" : "mt-2"
                                } dark:text-gray-500`}
                            key={index}
                        >
                            <NavLink
                                to={`${menu.link}`}
                                className={` flex w-full gap-x-4 items-center text-gray-200 px-5 py-3 dark:text-gray-400 dark:hover:text-gray-600 hover:text-gray-600 hover:font-semibold origin-left duration-300`}
                            >
                                <span className="text-2xl ">{menu.icon}</span>
                                <span className={`${!isOpen && "hidden"}`}>{menu.title}</span>
                                {menu.dropdown ? (
                                    <div className={`${!isOpen ? "" : "pl-20"}`}>
                                        <IoIosArrowForward />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ACSidebar