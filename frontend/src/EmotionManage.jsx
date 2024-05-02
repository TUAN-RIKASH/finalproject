import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmotionManage = () => {
  const [emotions, setEmotions] = useState([]);
  const [employees, setEmployees] = useState({}); // store employee info here

  useEffect(() => {
   

    fetchEmotions();
  }, []);

  const fetchEmotions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/api/emotion/all');
      setEmotions(response.data);
    } catch (error) {
      console.error("Failed to fetch emotions:", error);
    }
  };

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      emotions.forEach(async (record) => {
        console.log(record.date);
        try {
          const response = await axios.get(`http://127.0.0.1:3001/api/employee/get/${record.employee.$oid}`);
          setEmployees((prevEmployees) => ({ ...prevEmployees, [record.employee.$oid]: response.data.name }));
        } catch (error) {
          console.error(`Failed to fetch employee info for ${record.employee.$oid}:`, error);
        }
      });
    };
  
    fetchEmployeeInfo();
  }, [emotions]);

  const deleteEmotionRecord = async (id) => {
    console.log(id.$oid);
    try {
      const response = await axios.delete(`http://127.0.0.1:3001/api/emotion/${id.$oid}`);
      setEmotions(emotions.filter((record) => record._id.$oid !== id.$oid));
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#F5F5DC', // cream color
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
      }}
    >
      <h1 className="text-2xl font-bold text-center mb-4">History</h1>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left bg-gray-700 text-white">
          <thead className="text-xs bg-gray-800">
            <tr>
              <th scope="col" className="py-3 px-6">Date</th>
              <th scope="col" className="py-3 px-6">Employee Name</th>
              <th scope="col" className="py-3 px-6">Emotion</th>
              <th scope="col" className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {emotions.map((record) => (
              <tr key={record._id.$oid} className="bg-gray-800 border-b dark:bg-zinc-800 dark:border-zinc-700">
                <td className="py-4 px-6">{new Date(record.date.$date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                <td className="py-4 px-6">{employees[record.employee.$oid]}</td>
                <td className="py-4 px-6">{record.status}</td>
                <td className="py-4 px-6">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    onClick={() => deleteEmotionRecord(record._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmotionManage;