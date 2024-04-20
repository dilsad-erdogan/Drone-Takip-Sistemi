import { useEffect, useState } from 'react';
import Search from '../../ui/commonUsage/search.jsx';
import LogModel from '../../../../../Back-end/connections/log.js';
const logModel = new LogModel();

const logDashboard = () => {
    const [logs, setLogs] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const fetchLog = async () => {
            try{
                await logModel.fetchLogData();
                const log = logModel.getLogs();

                setLogs(log);
            } catch(error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchLog();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSearchValue(params.get("q") || "");
    }, [location.search]);

    const filteredData = logs.filter((type) =>
        type.message.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className='topPanel'>
            <div className='top'>
                <Search placeholder="Search for a log message"></Search>
            </div>

            <table className='dataTable'>
                <thead>
                    <tr>
                        <td>Level</td>
                        <td>Message</td>
                        <td>Time stamp</td>
                    </tr>
                </thead>

                <tbody>
                    {filteredData.map((log) => (
                        <tr key={log._id}>
                            <td>{log.level}</td>
                            <td>{log.message}</td>
                            <td>{log.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default logDashboard
