import Web3 from "web3";
import { setGlobalState, getGlobalState } from "./store";
import studentAbi from "./abis/Students.json";
import accountantAbi from "./abis/Accountants.json";
import teacherAbi from "./abis/Teachers.json";
import adminAbi from "./abis/Admins.json";

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const getEtheriumContract = async () => {
  const web3 = window.web3;
  const networkId = await window.web3.eth.net.getId();
  const networkData = studentAbi.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(accountantAbi.abi, networkData.address);
    return contract;
  } else {
    return null;
  }
};

const getAdminContract = async () => {
  const web3 = window.web3;
  const networkId = await window.web3.eth.net.getId();
  const networkData = adminAbi.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(adminAbi.abi, networkData.address);
    return contract;
  } else {
    return null;
  }
};

const getTeacherContract = async () => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = teacherAbi.networks[networkId];
  
    if (networkData) {
      const contract = new web3.eth.Contract(teacherAbi.abi, networkData.address);
      return contract;
    } else {
      return null;
    }
  };

  const getAccountantContract = async () => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = accountantAbi.networks[networkId];
  
    if (networkData) {
      const contract = new web3.eth.Contract(accountantAbi.abi, networkData.address);
      return contract;
    } else {
      return null;
    }
  };
  
  // const getCollectionPointContract = async () => {
  //   const web3 = window.web3;
  //   const networkId = await web3.eth.net.getId();
  //   const networkData = cpAbi.networks[networkId];
  
  //   if (networkData) {
  //     const contract = new web3.eth.Contract(cpAbi.abi, networkData.address);
  //     return contract;
  //   } else {
  //     return null;
  //   }
  // };
  
  const getStudentContract = async () => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = studentAbi.networks[networkId];
  
    if (networkData) {
      const contract = new web3.eth.Contract(studentAbi.abi, networkData.address);
      return contract;
    } else {
      return null;
    }
  };
  
  // const getTransporterContract = async () => {
  //   const web3 = window.web3;
  //   const networkId = await web3.eth.net.getId();
  //   const networkData = transAbi.networks[networkId];
  
  //   if (networkData) {
  //     const contract = new web3.eth.Contract(transAbi.abi, networkData.address);
  //     return contract;
  //   } else {
  //     return null;
  //   }
  // };

const connectWallet = async () => {
  try {
    if (!ethereum) return console.log("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0].toLowerCase());
  } catch (error) {
    console.log(error);
  }
};

const isWallectConnected = async () => {
  try {
    if (!ethereum) return console.log("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
      await isWallectConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
    } else {
      setGlobalState("connectedAccount", "");
      reportError("Please connect wallet.");
    }
  } catch (error) {
    console.log(error);
  }
};

const verifyPaymentCheck = async ({
  manufacturerAddress
}) => {
  try {

    const contract = await getEtheriumContract();
    const account = getGlobalState("connectedAccount");

    console.log("manufacturer address: ", manufacturerAddress)

    await contract.methods.verifyPaymentCheck(manufacturerAddress).send({from: account, gas: 1000000});

    return true;
    
  } catch (error) {
    console.log(error.message)
  }
}

const registerStudents = async ({
    publicAddress,
    firstName,
    middleName,
    lastName,
    examNumber,
    gender,
    religion,
    dob,
    classLevel,
    combination,
    phoneNumber,
    studentLocation,
    year,
    password
}) => {
  try {
    const contract = await getStudentContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.registerStudent(publicAddress, firstName, middleName, lastName, examNumber, gender, religion, dob, classLevel, combination, phoneNumber, studentLocation, year, password).send({from: account, gas: 1000000})
    
    return true;
  } catch (error) {
      console.log(error.message)
  }
}

const deleteStudent = async ({ studentAddress }) => {
  try {
    const contract = await getStudentContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .deleteStudent(studentAddress)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error.message);
  }
};

const registerTeacher = async ({
  publicAddress,
  name,
  teacherSubject,
  email,
  phoneNumber,
  password
}) => {
  try {
    const contract = await getTeacherContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.registerTeacher(publicAddress, name, teacherSubject, email, phoneNumber, password).send({from: account, gas: 1000000})
    
    return true;
  } catch (error) {
      console.log(error.message)
  }
}

const deleteTeacher = async ({ teacherAddress }) => {
  try {
    const contract = await getTeacherContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .deleteTeacher(teacherAddress)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error.message);
  }
};

const registerAccountant = async ({
  publicAddress,
  name,
  email,
  phoneNumber,
  password
}) => {
  try {
    const contract = await getAccountantContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.registerAccountant(publicAddress, name, email, phoneNumber, password).send({from: account, gas: 1000000})
    
    return true;
  } catch (error) {
      console.log(error.message)
  }
}

const deleteAccountant = async ({ accountantAddress }) => {
  try {
    const contract = await getAccountantContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .deleteAccountant(accountantAddress)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error.message);
  }
};

const addStudentClass = async ({
  classLevel
}) => {
  try {
    const contract = await getAdminContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.addStudentClass(classLevel).send({from: account, gas: 1000000})
    
    return true;
  } catch (error) {
      console.log(error.message)
  }
}

  const addStudentYear = async ({
    year,
  }) => {
    try {
      const contract = await getAdminContract();
      const account = getGlobalState("connectedAccount");
  
      await contract.methods.addStudentYear( year ).send({from: account, gas: 1000000})
      
      return true;
    } catch (error) {
        console.log(error.message)
    }
  }

const addStudentCombination = async ({
  combination
}) => {
  try {
    const contract = await getAdminContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.addStudentCombination(combination).send({from: account, gas: 1000000})
    
    return true;
  } catch (error) {
      console.log(error.message)
  }
}

const addStudentSubject = async ({
  subjectName
}) => {
  try {
    const contract = await getAdminContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.addStudentSubject(subjectName).send({from: account, gas: 1000000})
    
    return true;
  } catch (error) {
      console.log(error.message)
  }
}

const addSubjectDetails = async ({
  subjectName
}) => {
  try {
    const contract = await getAdminContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.addSubjectDetails(subjectName).send({from: account, gas: 1000000})
    
    return true;
  } catch (error) {
      console.log(error.message)
  }
}

const addExamType = async ({
  examType
}) => {
  try {
    const contract = await getAdminContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.addExamType(examType).send({from: account, gas: 1000000})
    
    return true;
  } catch (error) {
      console.log(error.message)
  }
}

const addFeeCategory = async ({
  categoryName
}) => {
  try {
    const contract = await getAdminContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.addFeeCategory(categoryName).send({from: account, gas: 1000000})
    
    return true;
  } catch (error) {
      console.log(error.message)
  }
}

const addFeeCategoryAmount = async ({
  feeCategory,
  classLevel,
  amount
}) => {
  try {
    const contract = await getAdminContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.addFeeAmount(feeCategory,classLevel,amount).send({from: account, gas: 1000000})
    
    return true;
  } catch (error) {
      console.log(error.message)
  }
}

const systemOwnerLogin = async ({ publicAddress, password }) => {
  try {
    const contract = await getAdminContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods
      .systemOwnerLogin(publicAddress, password)
      .send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const studentLogin = async ({ publicAddress, password }) => {
  try {
    const contract = await getStudentContract();
    const account = getGlobalState("connectedAccount");

    const passwordHash = window.web3.utils.sha3(password);

    await contract.methods.studentLogin(publicAddress, passwordHash).send({ from: account, gas: 1000000 });

    return true;
  } catch (error) {
    console.log(error);
  }
};

const teacherLogin = async ({ publicAddress, password }) => {
    try {
      const contract = await getTeacherContract();
      const account = getGlobalState("connectedAccount");
  
      const passwordHash = window.web3.utils.sha3(password);
  
      await contract.methods.teacherLogin(publicAddress, passwordHash).send({ from: account, gas: 1000000 });
  
      return true;
    } catch (error) {
      console.log(error);
    }
  };

const displayManufacturersData = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getEtheriumContract();
        const account = getGlobalState("connectedAccount");
    
        const manufacturerArray = await contract.methods.getManufacturerArray().call();
    
        const manufacturersData = [];
        // console.log("manufacturerArray: ", manufacturerArray)
    
        if (manufacturerArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < manufacturerArray.length; i++) {
          const manufacturerAddress = manufacturerArray[i];

          const _manufacturer = await contract.methods.getManufacturer(manufacturerAddress).call();
          // console.log("let me see manufacturer details: ",_manufacturer);

          manufacturersData.push(_manufacturer);
        }
    
        setGlobalState("manufacturers", manufacturersData);
      } catch (error) {
        console.log(error);
      }
    };

    const retrieveManufacturerData = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getEtheriumContract();
        const manufacturerAddress = getGlobalState("connectedAccount");

          const manufacturerData = await contract.methods.getManufacturer(manufacturerAddress).call();
          // console.log("let me see manufacturer details: ", manufacturerData);

        setGlobalState("manufacturer", manufacturerData);
        return manufacturerData;
      } catch (error) {
        console.log(error);
      }
    };

    const displayQrCodeData = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getEtheriumContract();
        const account = getGlobalState("connectedAccount");
    
        const qrCodeHashArray = await contract.methods.getManfItemIDList().call();
    
        const qrCodeData = [];
        console.log("QrCodeData: ", qrCodeHashArray)
    
        if (qrCodeHashArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < qrCodeHashArray.length; i++) {
          const qrCodeHashID = qrCodeHashArray[i];

          const _qrCodeHash = await contract.methods.getQrHashAndID(account, qrCodeHashID).call();
          console.log("let me see qrCode details: ",_qrCodeHash);

          if ( _qrCodeHash.qrHash !== "" ) {
              qrCodeData.push(_qrCodeHash);
            }
        }
    
        setGlobalState("qrCodes", qrCodeData);
      } catch (error) {
        console.log(error);
      }
    };

    const displayStudentClass = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getAdminContract();
    
        const studentClassArray = await contract.methods.getStudentClassArray().call();
    
        const studentClassData = [];
        // console.log("productsArray: ", productsArray)
    
        if (studentClassArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < studentClassArray.length; i++) {
          const studentClass = studentClassArray[i];

          const _studentClassDetails = await contract.methods.getStudentClass(studentClass).call();
          // console.log("let me see product details: ",_studentClassDetails);
          if (!_studentClassDetails.isDeleted) {
            studentClassData.push(_studentClassDetails);
          }
        }
    
        setGlobalState("studentClasses", studentClassData);
      } catch (error) {
        console.log(error);
      }
    }

    const displayStudentYear = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getAdminContract();
    
        const studentYearArray = await contract.methods.getStudentYearsArray().call();
    
        const studentYearData = [];
        // console.log("productsArray: ", productsArray)
    
        if (studentYearArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < studentYearArray.length; i++) {
          const studentYear = studentYearArray[i];

          const _studentYearDetails = await contract.methods.getStudentYears(studentYear).call();
          // console.log("let me see product details: ",_studentYearDetails);
          if (!_studentYearDetails.isDeleted) {
            studentYearData.push(_studentYearDetails);
          }
        }
    
        setGlobalState("studentYears", studentYearData);
      } catch (error) {
        console.log(error);
      }
    }
    

    const displayFeeCategoryAmount = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getAdminContract();
    
        const studentFeeAmountArray = await contract.methods.getFeeAmountArray().call();
    
        const studentFeeAmountData = [];
        // console.log("productsArray: ", productsArray)
    
        if (studentFeeAmountArray.length === 0) {
          console.log("DATA HAKUNA");
        }
    
        for (let i = 0; i < studentFeeAmountArray.length; i++) {
          const studentFeeAmount = studentFeeAmountArray[i];

          const _studentFeeAmountDetails = await contract.methods.getFeeAmount(studentFeeAmount).call();
          // console.log("let me see product details: ",_studentFeeAmountDetails);
          // if (!_studentFeeAmountDetails.isDeleted) {
            studentFeeAmountData.push(_studentFeeAmountDetails);
          // }
        }
    
        setGlobalState("studentFeeAmounts", studentFeeAmountData);
      } catch (error) {
        console.log(error);
      }
    }

    const displayStudentCombination = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getAdminContract();
    
        const studentCombinationArray = await contract.methods.getStudentCombinationArray().call();
    
        const studentCombinationData = [];
        // console.log("studentCombinationArray: ", studentCombinationArray)
    
        if (studentCombinationArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < studentCombinationArray.length; i++) {
          const studentCombination = studentCombinationArray[i];

          const _studentCombinationDetails = await contract.methods.getStudentCombination(studentCombination).call();
          // console.log("let me see product details: ",_studentCombinationDetails);
          // if (!_studentCombinationDetails.isDeleted) {
            studentCombinationData.push(_studentCombinationDetails);
          // }
        }
    
        setGlobalState("studentCombinations", studentCombinationData);
      } catch (error) {
        console.log(error);
      }
    }

    const displayExamType = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getAdminContract();
    
        const studentExamTypeArray = await contract.methods.getExamTypeArray().call();
    
        const studentExamTypeData = [];
        console.log("studentExamTypeArray: ", studentExamTypeArray)
    
        if (studentExamTypeArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < studentExamTypeArray.length; i++) {
          const studentExamType = studentExamTypeArray[i];

          const _studentExamTypeDetails = await contract.methods.getExamType(studentExamType).call();
          // console.log("let me see product details: ",_studentExamTypeDetails);
          // if (!_studentExamTypeDetails.isDeleted) {
            studentExamTypeData.push(_studentExamTypeDetails);
          // }
        }
    
        setGlobalState("studentExamTypes", studentExamTypeData);
      } catch (error) {
        console.log(error);
      }
    }

    const displayStudentSubject = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getAdminContract();
    
        const studentSubjectArray = await contract.methods.getStudentSubjectArray().call();
    
        const studentSubjectData = [];
        // console.log("studentSubjectArray: ", studentSubjectArray)
    
        if (studentSubjectArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < studentSubjectArray.length; i++) {
          const studentSubject = studentSubjectArray[i];

          const _studentSubjectDetails = await contract.methods.getStudentSubject(studentSubject).call();
          // console.log("let me see product details: ",_studentSubjectDetails);
          // if (!_studentSubjectDetails.isDeleted) {
            studentSubjectData.push(_studentSubjectDetails);
          // }
        }
    
        setGlobalState("studentSubjects", studentSubjectData);
      } catch (error) {
        console.log(error);
      }
    }

    const displaySubjectDetails = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getAdminContract();
    
        const studentSubjectDetailArray = await contract.methods.getSubjectDetailsArray().call();
    
        const studentSubjectDetailData = [];
        // console.log("studentSubjectDetailArray: ", studentSubjectDetailArray)
    
        if (studentSubjectDetailArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < studentSubjectDetailArray.length; i++) {
          const studentSubjectDetail = studentSubjectDetailArray[i];

          const _studentSubjectDetailDetails = await contract.methods.getSubjectDetail(studentSubjectDetail).call();
          // console.log("let me see product details: ",_studentSubjectDetailDetails);
          // if (!_studentSubjectDetailDetails.isDeleted) {
            studentSubjectDetailData.push(_studentSubjectDetailDetails);
          // }
        }
    
        setGlobalState("studentSubjectDetails", studentSubjectDetailData);
      } catch (error) {
        console.log(error);
      }
    }

    const displayFeeCategories = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getAdminContract();
    
        const feeCategoryArray = await contract.methods.getFeeCategoryArray().call();
    
        const feeCategoryData = [];
        // console.log("feeCategoryArray: ", feeCategoryArray)
    
        if (feeCategoryArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < feeCategoryArray.length; i++) {
          const feeCategory = feeCategoryArray[i];

          const _feeCategoryDetails = await contract.methods.getFeeCategory(feeCategory).call();
          // console.log("let me see product details: ",_feeCategoryDetails);
          // if (!_feeCategoryDetails.isDeleted) {
            feeCategoryData.push(_feeCategoryDetails);
          // }
        }
    
        setGlobalState("feeCategories", feeCategoryData);
      } catch (error) {
        console.log(error);
      }
    }

    const displayStudents = async () => {
      try {
        // if (!ethereum) return console.log("Please install Metamask");
    
        const contract = await getStudentContract();
        const account = getGlobalState("connectedAccount");
    
        const studentsArray = await contract.methods.getStudentArray().call();
    
        const studentsData = [];
        // console.log("productsArray: ", productsArray)
    
        if (studentsArray.length === 0) {
          console.log("NO DATA");
        }
    
        for (let i = 0; i < studentsArray.length; i++) {
          const student = studentsArray[i];

          const _studentDetails = await contract.methods.getStudent(student).call();
          // console.log("let me see product details: ",_studentDetails);
          if (!_studentDetails.isDeleted) {
            studentsData.push(_studentDetails);
          }
        }
    
        setGlobalState("students", studentsData);
      } catch (error) {
        console.log(error);
      }
    }

    const displayTeachers = async () => {
        try {
          // if (!ethereum) return console.log("Please install Metamask");
      
          const contract = await getTeacherContract();
          const account = getGlobalState("connectedAccount");
      
          const teachersArray = await contract.methods.getTeacherArray().call();
      
          const teachersData = [];
          // console.log("teachersArray: ", teachersArray)
      
          if (teachersArray.length === 0) {
            console.log("NO DATA");
          }
      
          for (let i = 0; i < teachersArray.length; i++) {
            const teacher = teachersArray[i];
  
            const _teacherDetails = await contract.methods.getTeacher(teacher).call();
            // console.log("let me see product details: ",_teacherDetails);
            if (!_teacherDetails.isDeleted) {
              teachersData.push(_teacherDetails);
            }
          }
      
          setGlobalState("teachers", teachersData);
        } catch (error) {
          console.log(error);
        }
      }

      const displayAccountants = async () => {
        try {
          // if (!ethereum) return console.log("Please install Metamask");
      
          const contract = await getAccountantContract();
          const account = getGlobalState("connectedAccount");
      
          const accountantsArray = await contract.methods.getAccountantArray().call();
      
          const accountantsData = [];
          // console.log("accountantsArray: ", accountantsArray)
      
          if (accountantsArray.length === 0) {
            console.log("NO DATA");
          }
      
          for (let i = 0; i < accountantsArray.length; i++) {
            const accountant = accountantsArray[i];
  
            const _accountantDetails = await contract.methods.getAccountant(accountant).call();
            // console.log("let me see product details: ",_accountantDetails);
            if (!_accountantDetails.isDeleted) {
              accountantsData.push(_accountantDetails);
            }
          }
      
          setGlobalState("accountants", accountantsData);
        } catch (error) {
          console.log(error);
        }
      }

    // const displayFeeCategory = async (feeCategoryId) => {
    //   try {
    //     // if (!ethereum) return console.log("Please install Metamask");
    
    //     const contract = await getAdminContract();
    //     const feeCat = getGlobalState("connectedAccount");
    
    //     const feeCategoryDetails = await contract.methods.getFeeCategory(feeCategoryId).call();
    //     // console.log("Fee Category :", feeCategoryDetails);
    
    //     setGlobalState("feeCategory", feeCategoryDetails);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

  

  



  




  

//   const displayBloodSupplied = async () => {
//     try {
//       // if (!ethereum) return console.log("Please install Metamask");
  
//       const contract = await getEtheriumContract();
  
//       const transactionIdArray = await contract.methods
//         .getDonationTransactionArr()
//         .call();
  
//       console.log("list of transactionID", transactionIdArray);
  
//       const donationTransactionData = [];
  
//       if (transactionIdArray.length === 0) {
//         console.log("NO DATA");
//       }
  
//       for (let i = 0; i < transactionIdArray.length; i++) {
//         const transactionId = transactionIdArray[i];
//         // console.log(`the registration number is: ${voterRegNumber}`);
//         const _donationTransaction = await contract.methods
//           .getAllDonationTransaction(transactionId)
//           .call();
//         console.log(
//           "donation of blood for specific medical center: ",
//           _donationTransaction
//         );
//         if (
//           _donationTransaction.bloodTestResult === "ACCEPTED" &&
//           _donationTransaction.status === 1n && _donationTransaction.supplyStatus !== 2n && _donationTransaction.isSupplied === true
//         ) {
//           donationTransactionData.push(_donationTransaction);
//         }
//         console.log("Supplied Transaction :", donationTransactionData);
//       }
  
//       setGlobalState("bloodSupplied", donationTransactionData);
//     } catch (error) {
//       console.log(error);
//     }
//   };



export {
    connectWallet,
    isWallectConnected,
    systemOwnerLogin,
    studentLogin,
    teacherLogin,
    verifyPaymentCheck,
    registerStudents,
    registerTeacher,
    addStudentClass,
    addStudentYear,
    addStudentCombination,
    addStudentSubject,
    addSubjectDetails,
    addExamType,
    addFeeCategory,
    addFeeCategoryAmount,
    registerAccountant,
    displayStudents,
    displayTeachers,
    displayAccountants,
    displayStudentClass,
    displayStudentYear,
    displayStudentCombination,
    displayStudentSubject,
    displaySubjectDetails,
    displayFeeCategories,
    // displayFeeCategory,
    displayExamType,
    displayFeeCategoryAmount,
    deleteStudent,
    deleteTeacher,
    deleteAccountant,
  };