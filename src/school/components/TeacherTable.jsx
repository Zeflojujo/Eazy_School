import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { truncate, useGlobalState } from '../../store'
import { MdDelete } from 'react-icons/md';
import swal from "sweetalert";
import { deleteTeacher } from '../../BlockchainService';


const TeacherTable = () => {
  const [teachers] = useGlobalState("teachers");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allTeachers, setAllTeachers] = useState([])
  const [end, setEnd] = useState(6)

  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const getTeachers = () => {
    return teachers.slice(0, end)
  }

  useEffect(() => {
    setAllTeachers(getTeachers())
    console.log(teachers)
  }, [teachers, end])

  const deleteTeacherHandler = async (teacherAddress) => {
    console.log("donor deleted public address is: ", teacherAddress)

    try {

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then(async (willDelete) => {
          if (willDelete) {
            const result = await deleteTeacher({ teacherAddress })
  
            if (result) {
              swal("Poof! Teacher has been deleted!", {
                icon: "success",
              });
              window.location.reload()
            } else {
              throw Error
            }
            console.log("Teacher deleted public address is: ", teacherAddress)
          } else {
            swal("Your imaginary file is safe!", {
              icon: 'info'
            });
          }
        });
      
    } catch (error) {
      console.log(error);
    }

    

  }

  return (
    <>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Teachers Lists</h1>
      </div>

      <div className="p-4">



        {/* <CreateNewsModal showModal={isModalOpen} closeModal={closeModal} /> */}


        <div className="shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
          <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
            <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
              <tr className='border-none'>
                <th className="py-2 px-4 border-b text-start text-lg">ID</th>
                <th className="py-2 px-4 border-b text-start text-lg">Public Address</th>
                <th className="py-2 px-4 border-b text-start text-lg uppercase">Name</th>
                <th className="py-2 px-4 border-b text-start text-lg uppercase">Subjects</th>
                <th className="py-2 px-4 border-b text-start text-lg uppercase">Email</th>
                <th className="py-2 px-4 border-b text-start text-lg uppercase">Phone Number</th>

                <th className="py-2 px-4 border-b text-start text-lg flex col-span-2 justify-center uppercase">Actions</th>
                <th className="py-2 px-4 border-b text-start"></th>
              </tr>
            </thead>
            <tbody>
              {allTeachers.map((teacher, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                  <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{truncate(teacher.teacherAddress, 7, 7, 17)}</td>
                  <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{teacher.name}</td>
                  <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{teacher.subjects}</td>
                  <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{teacher.email}</td>
                  <td className={`py-2 px-4 text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{teacher.phoneNumber}</td>

                  <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteTeacherHandler(teacher.teacherAddress)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><MdDelete size={17} />Delete</button></td>
                  {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><MdDelete size={17} />Delete</button></td> */}
                  {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteNewsHandler(item.id)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-red-500'>Delete</button></td> */}
                  {/* <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => UpdataNewsHandler(item.id)} className='border border-solid bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 dark:border-cyan-400'>Update</button></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>

  );
};

export default TeacherTable;