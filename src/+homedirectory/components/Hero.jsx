// import Identicon from 'react-identicons'
import { setGlobalState, useGlobalState, truncate } from '../../store'
import System from "../../assets/heroStudent.png"
import { Link } from 'react-router-dom'

const Hero = () => {
    const [connectedAccount] = useGlobalState('connectedAccount')
    const onCreatedNFT = () => {
        setGlobalState('modal', 'scale-100')
    }

    return (
        <div
            className="flex flex-col-reverse md:flex-row w-4/5 md:w-5/6 justify-between 
                items-center mx-auto py-0"
        >
            <div className=" md:w-3/5 w-full mt-30 md:mt-0 overflow-hidden ">
                <img
                    src={System}
                    alt="donate blooc"
                    className="h-1/2 w-full object-cover"
                />
                {/* <div className="flex justify-start items-center mt-10 p-20"> */}
                    {/* <Identicon
            // string={connectedAccount ? connectedAccount : 'Connect Your Wallet'}
            size={50}
            className="h-10 w-10 object-contain rounded-full mr-3"
          /> */}
                    {/* <div>
                        <p className="text-white font-semibold">
                            {connectedAccount
                                ? truncate(connectedAccount, 4, 4, 11)
                                : 'Connect Your Wallet'}
                        </p>
                        <small className="text-pink-800 font-bold">@you</small>
                    </div> */}
                {/* </div> */}
            </div>
            <div className="md:w-3/6 w-full py-10">
                <div>
                    <h1 className="text-gray-900 text-3xl md:text-4xl lg:text-5xl font-bold">
                        Eazy-School <br /> Management System, <br />
                        <span className="text-gradient">SMBS</span> System
                    </h1>
                    <p className="text-gray-700 font-semibold text-sm mt-3">
                        Education is excellences.
                    </p>
                </div>

                <div className="flex flex-row mt-5">
                    <Link
                        to="/student/login"
                        className="shadow-lg shadow-blue-800 text-white bg-blue-600
                                    hover:bg-blue-700
                                    rounded-full cursor-pointer py-2 px-4"
                        onClick={onCreatedNFT}
                    >
                        Apply Now
                    </Link>
                </div>

                <div className="w-3/4 flex justify-between items-center mt-5">
                    <div>
                        <p className="text-white font-bold">2004-2024</p>
                        <small className="text-gray-300">Started</small>
                    </div>
                    <div>
                        <p className="text-white font-bold">23 Tz</p>
                        <small className="text-gray-300">Performance/Position</small>
                    </div>
                    <div>
                        <p className="text-white font-bold">A+</p>
                        <small className="text-gray-300">Quality</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
