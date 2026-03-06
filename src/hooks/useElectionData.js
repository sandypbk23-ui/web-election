import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useElectionData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/results');
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      // Fallback for demo purposes if backend isn't running
      setData({
        summary: { totalSeats: 275, countedSeats: 150, updatedAt: new Date().toISOString() },
        provinceResults: [
          { id: '1', name: 'Koshi', winner: 'Nepali Congress', seats: 14, color: '#1E40AF' },
          { id: '2', name: 'Madhesh', winner: 'CPN-UML', seats: 12, color: '#DC2626' },
          { id: '3', name: 'Bagmati', winner: 'Nepali Congress', seats: 18, color: '#1E40AF' },
          { id: '4', name: 'Gandaki', winner: 'CPN-UML', seats: 9, color: '#DC2626' },
          { id: '5', name: 'Lumbini', winner: 'CPN-Maoist', seats: 11, color: '#991B1B' },
          { id: '6', name: 'Karnali', winner: 'CPN-Maoist', seats: 6, color: '#991B1B' },
          { id: '7', name: 'Sudurpashchim', winner: 'Nepali Congress', seats: 8, color: '#1E40AF' }
        ],
        partyResults: [
          { party: 'NC', seats: 50, color: '#1E40AF', votes: '1.2M' },
          { party: 'UML', seats: 45, color: '#DC2626', votes: '1.1M' },
          { party: 'Maoist', seats: 25, color: '#991B1B', votes: '0.6M' },
          { party: 'RSP', seats: 15, color: '#0EA5E9', votes: '0.4M' },
          { party: 'RPP', seats: 10, color: '#F59E0B', votes: '0.3M' },
          { party: 'Others', seats: 5, color: '#64748B', votes: '0.2M' }
        ],
        breakingNews: [
          { title: 'Counting continues in Kathmandu-4', source: 'Kantipur', time: '5m ago' },
          { title: 'Final results announced for Lalitpur-3', source: 'Hamro Patro', time: '15m ago' }
        ]
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refresh: fetchData };
};
