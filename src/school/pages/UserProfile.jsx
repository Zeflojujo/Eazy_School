import React from 'react'
import { FaEyeSlash } from 'react-icons/fa'

const UserProfile = () => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
      };
  return (
    <div>
         <div className="grid md:grid-cols-2 gap-x-2 mb-4 w-full mt-4">
            <div className="mb-4">
                <label htmlFor="password" className="text-lg text-gray-500">Old Password:</label>
                <div className="flex flex-row justify-end items-center">
                <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={user.password}
                    className="relative w-full border-2 border-gray-500 focus:outline-none focus:border-blue-500 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                />
                {!showPassword ? <FaEyeSlash size={24} onClick={togglePasswordVisibility} className="absolute mr-4 text-gray-500 pt-2" /> : <FaEye size={24} onClick={togglePasswordVisibility} className="absolute mr-4 text-gray-500 pt-2 " />}
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="text-lg text-gray-500">Confirm Password:</label>
                <div className="flex flex-row justify-end items-center">
                <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={user.confirmPassword}
                    className="relative w-full border-2 border-gray-500 focus:outline-none focus:border-blue-500 py-2 px-4 bg-gray-300 mt-2 text-lg text-gray-900 rounded-lg"
                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                    placeholder="confirm password"
                />
                {!showPassword ? <FaEyeSlash size={24} onClick={togglePasswordVisibility} className="absolute mr-4 text-gray-500 pt-2" /> : <FaEye size={24} onClick={togglePasswordVisibility} className="absolute mr-4 text-gray-500 pt-2 " />}
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile