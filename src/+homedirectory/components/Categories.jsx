import { useEffect, useState } from 'react'
import { setGlobalState, useGlobalState } from '../../store'
import school from "../../assets/gradu.jpg"
import teachers from "../../assets/accountant.jpg"
import accountants from "../../assets/teacher.jpg"
import students from "../../assets/friends.jpg"
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight } from 'react-icons/fa'

const Categories = () => {
  // const [donors] = useGlobalState('donors')
  const [end, setEnd] = useState(4)
  // const [count] = useState(4)
  const [collection, setCollection] = useState([])

  // const getCollection = () => {
  //   return donors.slice(0, end)
  // }

  // useEffect(() => {
  //   setCollection(getCollection())
  // }, [donors, end])

  return (
    <div className="bg-gray-200 gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="flex justify-center text-gray-700 text-3xl font-bold uppercase text-gradient">
          School Record Managements
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">

        <div className="w-full shadow-lg shadow-blue-800 rounded-md overflow-hidden bg-gray-200 my-2 p-3">
            <img
              src={school}
              alt="blood"
              className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
            />
            <h4 className="text-gray-700 font-semibold">School</h4>
            <p className="text-gray-600 text-xs my-1">Collect blood units from Donors and ship it to the Authorized Medical Center</p>
            <div className="flex justify-center items-center mt-3 text-gray-700">
              <Link
              to="/school/login"
                className="flex justify-center items-center gap-2 shadow-lg shadow-blue-800 text-white text-sm bg-blue-600
                  hover:bg-blue-700 cursor-pointer rounded-full px-4 py-1"
              >
                Sign In <FaAngleDoubleRight />
              </Link>
            </div>
          </div>

          <div className="w-full shadow-lg shadow-blue-800 rounded-md overflow-hidden bg-gray-200 my-2 p-3">
            <img
              src={teachers}
              alt="SystemImage"
              className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
            />
            <h4 className="text-gray-700 font-semibold">Accountant</h4>
            <p className="text-gray-600 text-xs my-1">Donor who donate blood at the collection point</p>
            <div className="flex justify-center items-center mt-3 text-gray-700">
              <Link
                to="/accountant/login"
                className="flex justify-center items-center gap-2 shadow-lg shadow-blue-800 text-white text-sm bg-blue-600
                  hover:bg-blue-700 cursor-pointer rounded-full px-4 py-1"
              >
                Sign In <FaAngleDoubleRight />
              </Link>
            </div>
          </div>

          <div className="w-full shadow-lg shadow-blue-800 rounded-md overflow-hidden bg-gray-200 my-2 p-3">
            <img
              src={accountants}
              alt="blood"
              className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
            />
            <h4 className="text-gray-700 font-semibold">Teacher</h4>
            <p className="text-gray-600 text-xs my-1">Shipping active blood from one medical center to another</p>
            <div className="flex justify-center items-center mt-3 text-gray-700">

              <Link
              to="/teacher/login"
                className="flex justify-center items-center gap-2 shadow-lg shadow-blue-800 text-white text-sm bg-blue-600
                  hover:bg-blue-700 cursor-pointer rounded-full px-4 py-1"
              //   onClick={setNFT}
              >
                Sign In <FaAngleDoubleRight />
              </Link>
            </div>
          </div>

          <div className="w-full shadow-lg shadow-blue-800 rounded-md overflow-hidden bg-gray-200 my-2 p-3">
            <img
              src={students}
              alt="blood"
              className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
            />
            <h4 className="text-gray-700 font-semibold">Student</h4>
            <p className="text-gray-600 text-xs my-1">Collect Blood Samples from the Authorized collection point and use it in need for patients</p>
            <div className="flex justify-center items-center mt-3 text-gray-700">
              <Link
              to="/student/login"
                className="flex justify-center items-center gap-2 shadow-lg shadow-blue-800 text-white text-sm bg-blue-600
                  hover:bg-blue-700 cursor-pointer rounded-full px-4 py-1"
              >
                Sign In <FaAngleDoubleRight />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Categories
