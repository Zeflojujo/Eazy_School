import React, { useState, useEffect } from 'react';
import { truncate, useGlobalState } from '../../store'
import { MdDelete } from 'react-icons/md';
import { deleteStudent } from '../../BlockchainService';
import swal from "sweetalert";
import { BiEdit } from 'react-icons/bi';

const StudentTable = () => {
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

  useEffect(() => {
    setAllStudents(getStudents())
    console.log(students)
  }, [students, end])

  const deleteStudentHandler = async (studentAddress) => {
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Students Lists</h1>
      </div>

      <div className="p-4">

        {/* <CreateNewsModal showModal={isModalOpen} closeModal={closeModal} /> */}


        <div className="shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
          <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
            <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
              <tr className='border-none'>
              <th className="py-2 px-4 text-start text-lg">ID</th>
                 <th className="py-2 px-4 text-start text-lg">Public Address</th>
                 <th className="py-2 px-4 text-start text-lg uppercase">Student Name</th>
                 <th className="py-2 px-4 text-start text-lg uppercase">Class Level</th>
                 <th className="py-2 px-4 text-start text-lg uppercase">Combination</th>
                 <th className="py-2 px-4 text-start text-lg uppercase">gender</th>
                 <th className="py-2 px-4 text-start text-lg uppercase">Exam Number</th>
                 <th className="py-2 px-4 text-start text-lg uppercase">Date of Birth</th>
                 <th className="py-2 px-4 text-start text-lg uppercase">Religion</th>

                 <th colSpan={2} className="py-2 px-4 text-start text-lg flex justify-center uppercase">Actions</th>
                 <th className="py-2 px-4 text-start"></th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map((student, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                    <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                    <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(student.studentAddress, 7, 7, 17)}</td>
                    <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{student.firstName + " " + student.middleName + " " + student.lastName}</td>
                    <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{student.classLevel}</td>
                    <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{student.combination}</td>
                    <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{student.gender}</td>
                    <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{student.examNumber}</td>
                    <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{student.dob}</td>
                    <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{student.religion}</td>
 
                    <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteStudentHandler(student.studentAddress)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><MdDelete size={17} />Delete</button></td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>

  );
};

export default StudentTable;