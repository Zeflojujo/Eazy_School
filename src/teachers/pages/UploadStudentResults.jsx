import { useState } from 'react';
// import { addTermResult, getUploadedResult } from '../../BlockchainService'; // Assume you have functions to interact with the blockchain
import Sidebar from "../layouts/TSidebar";
import DashboardHeader from "../layouts/THeader";
import Alert from "../../+homedirectory/components/Alert";
import Loading from "../../+homedirectory/components/Loading";

const UploadStudentResult = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [studentAddress, setStudentAddress] = useState('');
    const [term, setTerm] = useState(1);
    const [scores, setScores] = useState({
        biology: 0,
        physics: 0,
        mathematics: 0,
        chemistry: 0,
        geography: 0,
        history: 0,
        civics: 0,
        english: 0,
        kiswahili: 0,
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [results, setResults] = useState(null);

    const handleScoreChange = (e) => {
        const { name, value } = e.target;
        setScores({
            ...scores,
            [name]: Number(value),
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     try {
    //         await addTermResult(studentAddress, term, ...Object.values(scores));
    //         setAlert({ type: 'success', message: 'Scores uploaded successfully!' });
    //     } catch (error) {
    //         setAlert({ type: 'error', message: 'Error uploading scores. Please try again.' });
    //     }
    //     setLoading(false);
    // };

    // const handleFetchResults = async () => {
    //     setLoading(true);
    //     try {
    //         const fetchedResults = await getUploadedResult(studentAddress, term);
    //         setResults(fetchedResults);
    //     } catch (error) {
    //         setAlert({ type: 'error', message: 'Error fetching results. Please try again.' });
    //     }
    //     setLoading(false);
    // };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <DashboardHeader isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="p-4">
                    {loading && <Loading />}
                    {alert && <Alert type={alert.type} message={alert.message} />}
                    {/* <form onSubmit={handleSubmit}> */}
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700">Student Address:</label>
                            <input
                                type="text"
                                value={studentAddress}
                                onChange={(e) => setStudentAddress(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Term:</label>
                            <select
                                name='term'
                                value={term}
                                onChange={(e) => setTerm(Number(e.target.value))}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value={1}>First Term</option>
                                <option value={2}>Mid Term</option>
                                <option value={3}>Third Term</option>
                            </select>
                        </div>
                        {Object.keys(scores).map((subject) => (
                            <div className="mb-4" key={subject}>
                                <label className="block text-gray-700">{subject.charAt(0).toUpperCase() + subject.slice(1)}:</label>
                                <input
                                    type="number"
                                    name={subject}
                                    value={scores[subject]}
                                    onChange={handleScoreChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        ))}
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Upload Result</button>
                    </form>
                    <button
                        // onClick={handleFetchResults}
                        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                    >
                        Fetch Results
                    </button>
                    {results && (
                        <div className="mt-4">
                            <h2 className="text-lg font-bold">Results:</h2>
                            <ul>
                                {Object.entries(results).map(([subject, value]) => (
                                    <li key={subject} className="mt-2">
                                        <strong>{subject.charAt(0).toUpperCase() + subject.slice(1)}:</strong> {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadStudentResult;
