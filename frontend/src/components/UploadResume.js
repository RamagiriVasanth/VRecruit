import './UploadResume.css';
import React, { useState } from 'react';
import axios from 'axios';

const UploadResume = ({ onMatches, onResumeUploaded }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage('Please upload your resume');
      return;
    }

    if (file.type !== 'application/pdf') {
      setErrorMessage('Only PDF files are allowed');
      return;
    }

    setErrorMessage('');
    const formData = new FormData();
    formData.append('resume', file);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/jobs/match', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onMatches(res.data.matches);
      onResumeUploaded();
    } catch (err) {
      setErrorMessage('Failed to fetch jobs');
      console.error(err);
    }
    setLoading(false);
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <div className="upload-row">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          value={file ? undefined : ''}
          className="upload-input"
        />
        <button type="submit" disabled={loading} className="upload-button">
          {loading ? 'Matching...' : 'Upload Resume'}
        </button>
      </div>

      {errorMessage && (
        <p className="error-message">
          <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default UploadResume;
