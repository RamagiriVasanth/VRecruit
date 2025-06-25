import React from 'react';
import { FaFileUpload, FaSearch, FaRegSadTear } from 'react-icons/fa'; // Icons for Upload, Search, Sad face
import JobCard from './JobCard'; // Assuming you have a JobCard component
import './JobList.css';

const JobList = ({ jobs, isResumeUploaded, showMatchedHeading }) => {
  // If no jobs are found, display appropriate message based on resume upload status
  if (jobs.length === 0) {
    return (
      <div className="no-jobs-message">
        {isResumeUploaded ? (
          <>
            <FaRegSadTear className="no-jobs-icon" />
            <p>No matching jobs found.</p>
          </>
        ) : (
          <>
            <FaFileUpload className="upload-icon" />
            <p>Upload resume to see matching jobs</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="job-list">
      {showMatchedHeading && (
        <h2 className="matched-jobs-heading">
          <FaSearch className="matched-jobs-icon" />
          Matched Demo Jobs
        </h2>
      )}
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
