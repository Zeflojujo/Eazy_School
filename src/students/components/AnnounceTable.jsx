import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../../store'
import { MdDelete } from 'react-icons/md';
import { deleteStudent } from '../../BlockchainService';
import swal from "sweetalert";
import { BiEdit } from 'react-icons/bi';

const AnnounceTable = () => {
  const [announcements] = useGlobalState("announcements");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allAnnouncements, setAllAnnouncements] = useState([])
  const [end, setEnd] = useState(6)

  console.log("announcements", announcements)

  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const getAnnouncements = () => {
    return announcements.slice(0, end)
  }

  useEffect(() => {
    setAllAnnouncements(getAnnouncements())
    console.log(announcements)
  }, [announcements, end])

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Announcements Lists</h1>
        </div>

          <div className="py-2">
              <div className="hidden lg:block shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
                  <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
                    <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
                      <tr className='border-none'>
                        <th className="py-2 px-4 border-b text-start text-lg">ID</th>
                        <th className="py-2 px-4 text-center text-lg uppercase">Title</th>
                        <th className="py-2 px-4 text-center text-lg uppercase">Description</th>

                        <th className="py-2 px-4 text-center text-lg flex col-span-2 justify-center uppercase">Actions</th>
                        <th className="py-2 px-4 text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {allAnnouncements.map((announcement, index) => (
                        <tr
                          key={index}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                          <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{announcement.title}</td>
                          <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{announcement.description}</td>

                          <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteStudentSubjectHandler(announcement.announcementIDD)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><BiEdit size={17} />Edit</button></td>
                          <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteStudentSubjectHandler(announcement.announcementIDD)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><MdDelete size={17} />Delete</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              </div>

              {allAnnouncements.map((announcement, index) => (
                  <div className="lg:hidden w-full mx-auto px-4 py-4">
                      <div className="bg-white shadow-md rounded px-4 py-6 mb-4 dark:bg-[#212936] dark:text-gray-300 dark:shadow-md dark:rounded-md dark:shadow-gray-400">
                          <h2 className="text-2xl font-bold mb-2">Announcement: {index + 1}</h2>
                          <hr className="mt-4 mb-4 h-4" />
                          <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <span className="font-bold text-xl">Title:</span>
                                <p className="flex gap-1 text-gray-300 text-lg"><span>{announcement.title}</span></p>
                              </div>
                              <div>
                                <span className="font-bold text-xl">Description:</span>
                                <p className="flex text-gray-200 text-lg gap-3"><span>{announcement.description}</span></p>
                              </div>
                              <div>
                              </div>
                          </div>
                      </div>
                  </div>
              )).reverse()}


          </div>
      </>

  );
};

export default AnnounceTable;