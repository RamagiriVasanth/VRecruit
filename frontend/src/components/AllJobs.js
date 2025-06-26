import React, { useEffect, useState } from 'react';
import JobList from './JobList';
import axios from 'axios';
import BASE_URL from '../config';
const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Correct API endpoint to fetch all jobs
    axios.get(`${BASE_URL}/jobs/all`)
      .then(res => {
        setJobs(res.data.jobs); // Ensure we're extracting the jobs from the response
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch all jobs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading all jobs...</p>;

  return (
    <div>
      <h2>All Available Demo Jobs</h2>
      {/* Pass showMatchedHeading={false} to hide the "Matched Jobs" heading */}
      <JobList jobs={jobs} showMatchedHeading={false} />
    </div>
  );
};

export default AllJobs;
