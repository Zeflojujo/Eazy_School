// import timelessLogo from '../assets/timeless.png'
import { Link } from 'react-router-dom'
import { connectWallet } from '../../BlockchainService'
import { useGlobalState, truncate } from '../../store'
import zeflotechLogo from '../../assets/zeflojujoLogo.png'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <nav className="w-4/5 flex md:justify-center justify-between items-center py-4 mx-auto">
      <div className="flex-row md:flex-[0.5] flex-initial justify-center items-center">
         <span className="text-gray-900 text-2xl font-bold">Ezy-School</span>
      </div>

      <ul
        className="md:flex-[0.5] text-gray-600 md:flex
        hidden list-none flex-row justify-center gap-8 
        items-center flex-initial text-lg"
      >
        <li className="mx-4 cursor-pointer"><Link className='text-blue-500 font-bold border-b-4 border-blue-500 border-spacing-1 hover:text-blue-500' to="/teacher/login">Home</Link></li>
        <li className="mx-4 cursor-pointer"><Link className='text-gray-600 font-bold hover:text-blue-500 hover:border-b-4 hover:border-blue-500 hover:border-spacing-1' to="/teacher/login">Teacher</Link></li>
        <li className="mx-4 cursor-pointer"><Link className='text-gray-600 font-bold hover:text-blue-500 hover:border-b-4 hover:border-blue-500 hover:border-spacing-1' to="/student/login">Student</Link></li>
        <li className="mx-4 cursor-pointer"><Link className='text-gray-600 font-bold hover:text-blue-500 hover:border-b-4 hover:border-blue-500 hover:border-spacing-1' to="/accountant/login">Accountant</Link></li>
        <li className="mx-4 cursor-pointer"><Link className='text-gray-600 font-bold hover:text-blue-500 hover:border-b-4 hover:border-blue-500 hover:border-spacing-1' to="/assistant">Assistant</Link></li>
      </ul>

      {connectedAccount ? (
        <button
          className="shadow-lg shadow-blue-800 text-white
        bg-blue-600 hover:bg-blue-700 md:text-xs py-2 px-4
          rounded-full cursor-pointer"
        >
          {truncate(connectedAccount, 4, 5, 12)}
        </button>
      ) : (
        <button
          className="shadow-lg shadow-blue-800 text-white
        bg-blue-600 hover:bg-blue-700 md:text-xs p-2
          rounded-full cursor-pointer"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </nav>
  )
}

export default Header
