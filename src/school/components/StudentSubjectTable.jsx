import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { useGlobalState } from '../../store'
import { MdDelete } from 'react-icons/md';
import { deleteStudent } from '../../BlockchainService';
import swal from "sweetalert";
import { BiEdit } from 'react-icons/bi';

const StudentSubjectTable = () => {
  const [studentSubjects] = useGlobalState("studentSubjects");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allStudentSubjects, setAllStudentSubjects] = useState([])
  const [end, setEnd] = useState(6)

  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const getStudentSubjects = () => {
    return studentSubjects.slice(0, end)
  }

  useEffect(() => {
    setAllStudentSubjects(getStudentSubjects())
    console.log(studentSubjects)
  }, [studentSubjects, end])

  const deleteStudentSubjectHandler = async (studentAddress) => {
    console.log("donor deleted public address is: ", studentAddress)

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
          const result = await deleteStudent({ studentAddress })

          if (result) {
            window.location.reload()
          } else {
            throw Error
          }
          console.log("donor deleted public address is: ", studentAddress)
        } else {
          swal("Your imaginary file is safe!", {
            icon: 'info'
          });
        }
      });

  }

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Student Subjects Lists</h1>
      </div>

      <div className="p-4">



        {/* <CreateNewsModal showModal={isModalOpen} closeModal={closeModal} /> */}


        <div className="shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
          <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
            <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
              <tr className='border-none'>
                <th className="py-2 px-4 border-b text-center text-lg">ID</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Subject Name</th>

                <th className="py-2 px-4 border-b text-center text-lg flex col-span-2 justify-center uppercase">Actions</th>
                <th className="py-2 px-4 border-b text-center"></th>
              </tr>
            </thead>
            <tbody>
              {allStudentSubjects.map((studentSubject, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                  <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{studentSubject.subjectName}</td>

                  <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteStudentSubjectHandler(studentSubject.studentAddress)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><BiEdit size={17} />Edit</button></td>
                  <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteStudentSubjectHandler(studentSubject.studentAddress)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><MdDelete size={17} />Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>

  );
};

export default StudentSubjectTable;