import React, { useEffect, useState } from 'react';
import JobList from './JobList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config';
import './Alljobs.css';  // Assuming you create this CSS file for styles

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/jobs/all`)
      .then(res => {
        setJobs(res.data.jobs);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch all jobs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading all jobs...</p>;

  return (
    <div className="all-jobs-container">
      <button 
        className="back-button" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        ← Back
      </button>
      <h2 className="all-jobs-title">All Available Demo Jobs</h2>
      <JobList jobs={jobs} showMatchedHeading={false} />
    </div>
  );
};

export default AllJobs;
