import React, { useState, useEffect } from 'react';
// import swal from 'sweetalert';
import { useGlobalState } from '../../store'
import { MdDelete } from 'react-icons/md';
import { deleteStudent } from '../../BlockchainService';
import swal from "sweetalert";
import { BiEdit } from 'react-icons/bi';

const FeeCategoryTable = () => {
  const [feeCategories] = useGlobalState("feeCategories");
  const [studentFeeAmounts] = useGlobalState("studentFeeAmounts");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [allFeeAmounts, setAllFeeAmounts] = useState([])
  const [end, setEnd] = useState(6)

  const handleMouseEnter = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const getFeeAmounts = () => {
    return studentFeeAmounts.slice(0, end)
  }

  useEffect(() => {
    setAllFeeAmounts(getFeeAmounts())
    console.log(studentFeeAmounts)
  }, [studentFeeAmounts, end])

  const deleteFeeAmountsHandler = async (feeCategorieId) => {
    console.log("The feeCategorieId deleted is: ", feeCategorieId)

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          swal("Poof! Your data has been deleted!", {
            icon: "success",
          });
          const result = await deleteStudent({ feeCategorieId })

          if (result) {
            window.location.reload()
          } else {
            throw Error
          }
          console.log("The feeCategorieId deleted is: ", feeCategorieId)
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-400">Student Fee Category Lists</h1>
      </div>

      <div className="p-4">



        {/* <CreateNewsModal showModal={isModalOpen} closeModal={closeModal} /> */}


        <div className="shadow-md overflow-x-auto" style={{ zIndex: '-999' }}>
          <table className="min-w-full overflow-x-auto  bg-white border-b border-gray-700 dark:bg-[#212936] dark:text-gray-300 dark:border-gray-700">
            <thead className='bg-gray-50 border-b-2 border-gray-200 dark:bg-gray-900 dark:gray-300'>
              <tr className='border-none'>
                <th className="py-2 px-4 border-b text-center text-lg">ID</th>
                <th className="py-2 px-4 border-b text-center text-lg uppercase">Category Name</th>

                <th className="py-2 px-4 border-b text-center text-lg flex col-span-2 justify-center uppercase">Actions</th>
                <th className="py-2 px-4 border-b text-center"></th>
              </tr>
            </thead>
            <tbody>
              {allFeeAmounts.map((feeAmount, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{index + 1}</td>
                  <td className={`py-2 px-4 text-center text-gray-700 text-base border-b dark:text-gray-500 ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}>{feeAmount.feeAmountName}</td>

                  <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteFeeAmountsHandler(feeAmount.feeAmountID)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><BiEdit size={17} />Edit</button></td>
                  <td className={`w-20 py-2 px-4 text-gray-700 text-base border-b ${hoveredRow === index ? 'bg-gray-200 dark:bg-gray-900' : ''}`}><button onClick={() => deleteFeeAmountsHandler(feeAmount.feeAmountID)} className='border border-solid bg-red-400 hover:bg-red-500 active:bg-red-400 px-3 py-1 border-r-2 text-white dark:bg-transparent dark:text-gray-500 gap-1 flex items-center dark:border-red-500'><MdDelete size={17} />Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>

  );
};

export default FeeCategoryTable;