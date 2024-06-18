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
import { uploadStudentScore } from '../../BlockchainService'
import Alert from "../../+homedirectory/components/Alert"
import Loading from "../../+homedirectory/components/Loading"
import swal from "sweetalert";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom"

import { MdDelete } from 'react-icons/md';
import { deleteStudent } from '../../BlockchainService';


const AcademicTable = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const [modal] = useGlobalState('modal')
    const [studentSubjects] = useGlobalState("studentSubjects");
    const [studentFirstTermResults] = useGlobalState("studentFirstTermResults");
    const [years] = useGlobalState("studentYears");
    const [allFirstTermResult, setAllFirstTermResult] = useState([])

    const [students] = useGlobalState("students");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allStudents, setAllStudents] = useState([])
  const [end, setEnd] = useState(6)

  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const getStudents = () => {
    return students.slice(0, end)
  }

  const getFirstTermResult = () => {
    return studentFirstTermResults.slice(0, end)
  }

  useEffect(() => {
    setAllStudents(getStudents())
    setAllFirstTermResult(getFirstTermResult())
    console.log(students)
  }, [students, end])

  const deletefirstTermResultHandler = async (publicAddress) => {
    console.log("donor deleted public address is: ", publicAddress)

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          const result = await deleteStudent({ publicAddress })

          if (result) {
            window.location.reload()
          } else {
            throw Error
          }
          console.log("donor deleted public address is: ", publicAddress)
        } else {
          swal("Your imaginary file is safe!", {
            icon: 'info'
          });
        }
      });

  }




    console.log("subject:", studentSubjects);

    const [isDisabled, setIsDisabled] = useState(true)

    const [score, setScore] = useState({
        publicAddress: "",
        term: "",
        subjectName: "",
        marks: "",
    })

    useEffect(() => {
        
        if (score.publicAddress === "" || score.term === "" || score.subjectName === ""|| score.marks === "") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
        console.log(score)
    }, [score, years])


    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const handleRegisterMedicalStaffModel = () => {
        setGlobalState('modal', 'scale-100')
    }

    const handleUploadSubjectScore = async (e) => {
        e.preventDefault()

        const studentScore = {
            publicAddress: score.publicAddress,
            term: score.term,
            subjectName: score.subjectName,
            marks: score.marks,
        }

        if (score.publicAddress === "" || score.term === "" || score.subjectName === ""|| score.marks === "") return

        setGlobalState('modal', 'scale-0')
        setGlobalState('loading', { show: true, msg: 'Registering Student...' })

        try {

            setLoadingMsg('Executing transaction...')
            // const password = score.lastName;
            const result = await uploadStudentScore(studentScore)
            console.log(result)

            if (result) {
                resetForm()
                swal({  
                    title: "Good job!",  
                    text: "Score Uploaded successfully...!",  
                    icon: "success",  
                    button: "Okay",  
                });  
                window.location.reload()
                // setAlert('Student is registered successfully...', 'green')
            } else {
                throw Error
            }

        } catch (error) {
            console.log('Error Uploading student score file: ', error)
            setAlert('Student Score uploading failed...', 'red')
        }
    }

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }

    const resetForm = () => {
        setScore({
            publicAddress: "",
            term: "",
            subjectName: "",
            marks: "",
        })
    }

    return (
        
        <>
          <div className="flex flex-col justify-center items-center w-full">
              {/* Header component is included */}

              {/* <div className="flex flex-col justify-center items-center mx-1 md:mx-4 overflow-hidden z-0 my-11 w-full">
                  {/* MedicalCenterTable component is included */}
                  <div className="w-5/6">
                   
                      <div>
                          <div className="mb-4">
                              <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Students Results</h1>
                          </div>

                          <div className="p-4 overflow-hidden">

                          {/* <CreateNewsModal showModal={isModalOpen} closeModal={closeModal} /> */}


                          <div className="shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
                              <table className="min-w-full bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
                              <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
                                  <tr className='border-none'>
                                  <th className="py-2 px-4 text-start text-lg">ID</th>
                                      <th className="py-2 px-4 text-start text-lg">Public Address</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">StudentName</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">Mathematics</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">Physics</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">Chemistry</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">Biology</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">Geography</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">History</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">Civics</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">English</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">kiswahili</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">Average</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">Grade</th>
                                      <th className="py-2 px-4 text-start text-lg uppercase">Status</th>

                                      <th colSpan={2} className="py-2 px-4 text-start text-lg flex justify-center uppercase">Actions</th>
                                      <th className="py-2 px-4 text-start"></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {allFirstTermResult.map((firstTermResult, index) => (
                                  <tr
                                      key={index}
                                      onMouseEnter={() => handleMouseEnter(index)}
                                      onMouseLeave={handleMouseLeave}
                                  >
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(firstTermResult.firstTermResultAddress, 7, 7, 17)}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{firstTermResult.firstName + " " + firstTermResult.middleName + " " + firstTermResult.lastName}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{firstTermResult.mathematics}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{firstTermResult.physics}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{firstTermResult.chemistry}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{firstTermResult.geography}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{firstTermResult.history}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{firstTermResult.civics}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{firstTermResult.english}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{firstTermResult.kiswahili}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{firstTermResult.average}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{firstTermResult.grade}</td>
                                      <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>Pass</td>

                                      <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => handleRegisterMedicalStaffModel} className='border border-solid bg-green-400 hover:bg-green-500 active:bg-green-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-green-500'><MdDelete size={17} />Uploads</button></td>
                                      <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deletefirstTermResultHandler(firstTermResult.publicAddress)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><MdDelete size={17} />Delete</button></td>

                                  </tr>
                                  ))}
                              </tbody>
                              </table>
                          </div>
                          </div>
                      </div>
                      <Alert />
                      <Loading />
                  </div>            
              {/* </div>  */}
              <div
                  className={`fixed top-0 left-0 w-screen h-screen flex items-center
                              justify-center bg-black bg-opacity-50 transform
                              transition-transform duration-300 ${modal}`}
              >

                  <div className="shadow-md rounded-xl w-11/12 md:w-4/5 h-7/12 p-6 bg-gray-100 shadow-blue-600 dark:bg-[#232b35] dark:shadow-blue-600">
                      <div className="flex flex-row justify-between items-center">
                          <h1 className="text-2xl md:text-3xl lg:text-3.5xl text-gray-400 font-semibold mb-4">Upload Student Result</h1>
                          <button
                              type="button"
                              onClick={closeModal}
                              className="border-0 bg-transparent focus:outline-none"
                          >
                              <FaTimes className="text-gray-400" />
                          </button>
                      </div>
                      <hr className="mb-3 text-gray-600 border-2 border-gray-500" />

                      <form className="text-lg" onSubmit={handleUploadSubjectScore}>

                          <div className="mb-4">
                              <h1 className="text-gray-400 text-xl font-semibold md:text-2xl mb-2">Student Details:</h1>
                              <hr className="mb-3 text-gray-600 border-1 border-gray-500" />
                          </div>

                          <div className="grid md:grid-cols-1 gap-x-2 mb-4 w-full mt-4">
                              <div className="mb-4">
                                  <label htmlFor="publicAddress" className='text-gray-400 text-lg'>Student Public Address:</label>
                                  <input
                                      id="publicAddress"
                                      type="publicAddress"
                                      value={score.publicAddress}
                                      className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-400 rounded-md dark:bg-transparent text-gray-700 bg-clip-padding appearance-none"
                                      onChange={(e) => setScore({ ...score, publicAddress: e.target.value })}
                                      placeholder="publicAddress"
                                  />
                              </div>
                              <div className="mt-4">
                                  <label htmlFor="subjectName" className="block text-lg font-medium text-gray-600 dark:text-gray-400">
                                      Subject Name:
                                  </label>
                                  <select
                                      className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-400 bg-clip-padding appearance-none"
                                      name="subjectName"
                                      type="text"
                                      onChange={(e) => setScore({...score, subjectName: e.target.value})}
                                      value={score.subjectName}
                                      required
                                  >
                                      <option value="" disabled>Select Student subjectName</option>
                                      <option value={"Mathematics"}>Mathematics</option>
                                      <option value={"Physics"}>Physics</option>
                                      <option value={"Chemistry"}>Chemistry</option>
                                      <option value={"Biology"}>Biology</option>
                                      <option value={"Geography"}>Geography</option>
                                  </select>
                              </div>
                          </div>

                          <div className="grid md:grid-cols-1 gap-x-2 mb-4 w-full mt-4">
                              
                              <div className="mb-4 mt-4">
                                  <label htmlFor="term" className="block text-lg font-medium text-gray-600 dark:text-gray-400">
                                      Term:
                                  </label>
                                  <select
                                      name="term"
                                      type="text"
                                      value={score.term}
                                      onChange={(e) => setScore({...score, term: Number(e.target.value)})}
                                      className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-400 bg-clip-padding appearance-none"
                                      required
                                  >
                                      <option value={1}>First Term</option>
                                      <option value={2}>Mid Term</option>
                                      <option value={3}>Third Term</option>
                                  </select>
                              </div>

                              <div className="mb-4 mt-4">
                                  <label htmlFor="marks" className='text-lg text-gray-400'>Marks:</label>
                                  <input
                                      id="marks"
                                      type="marks"
                                      value={score.marks}
                                      className="mt-1 px-3 py-1.5 md:py-2 w-full border border-solid border-gray-600 rounded-md dark:bg-transparent text-gray-400 bg-clip-padding appearance-none"
                                      onChange={(e) => setScore({ ...score, marks: e.target.value })}
                                      placeholder="marks"
                                  />
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
                              Submit
                          </button>
                      </form>
                  </div>
              </div>
          </div>
        </>

    )
}

export default AcademicTable
