import Web3 from "web3";
import { setGlobalState, getGlobalState } from "./store";
import studentAbi from "./abis/Students.json";
import qrcodeAbi from "./abis/Accountants.json";
import teacherAbi from "./abis/Teachers.json";

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const getEtheriumContract = async () => {
  const web3 = window.web3;
  const networkId = await window.web3.eth.net.getId();
  const networkData = studentAbi.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(qrcodeAbi.abi, networkData.address);
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

const registerStudent = async ({
  publicAddress,
  name,
  examNumber,
  classLevel,
  age,
  phoneNumber,
  password
}) => {
  try {
    const contract = await getStudentContract();
    const account = getGlobalState("connectedAccount");

    await contract.methods.registerStudent(publicAddress, name, examNumber, classLevel, age, phoneNumber, password).send({from: account, gas: 1000000})
    
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

const systemOwnerLogin = async ({ publicAddress, password }) => {
  try {
    const contract = await getStudentContract();
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

    await contract.methods.manufacturerLogin(publicAddress, passwordHash).send({ from: account, gas: 1000000 });

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
  
      await contract.methods.manufacturerLogin(publicAddress, passwordHash).send({ from: account, gas: 1000000 });
  
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

          studentsData.push(_studentDetails);
        }
    
        setGlobalState("students", studentsData);
      } catch (error) {
        console.log(error);
      }
    }

    const displayTeachers = async () => {
        try {
          // if (!ethereum) return console.log("Please install Metamask");
      
          const contract = await getEtheriumContract();
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
  
            teachersData.push(_teacherDetails);
          }
      
          setGlobalState("products", teachersData);
        } catch (error) {
          console.log(error);
        }
      }

    // const displayDetailsForScannedItem = async (qrHash) => {
    //   try {
    //     // if (!ethereum) return console.log("Please install Metamask");
    
    //     const contract = await getEtheriumContract();
    //     const medicalCenterAddress = getGlobalState("connectedAccount");
    
    //     const detailsForScannedItem = await contract.methods
    //       .getProduct(qrHash)
    //       .call();
    //     // console.log("Medical Center :", _medicalCenter);
    
    //     setGlobalState("detailsForScannedItem", detailsForScannedItem);
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
    registerStudent,
    displayStudents,
    displayTeachers,
    deleteStudent,
  };