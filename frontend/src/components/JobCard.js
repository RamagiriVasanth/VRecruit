import React, { useState } from 'react';
import './JobCard.css';

const JobCard = ({ job }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleApply = () => {
    setShowMessage(true);
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Skills Required:</strong> {job.skillsRequired.join(', ')}</p>
      <p>{job.description}</p>
      <div className="apply-container">
        <button className="apply-button" onClick={handleApply}>Demo Apply</button>
        {showMessage && <span className="thank-you-message">🙏 Thank you for using this demo app!</span>}
      </div>
    </div>
  );
};

export default JobCard;
