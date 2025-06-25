import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadResume from './components/UploadResume';
import JobList from './components/JobList';
import AllJobs from './components/AllJobs';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

function Home({ matchedJobs, setMatchedJobs }) {
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="app-container">
      <h1 className="app-title">VRecruit – Job Matcher</h1>

      <p className="app-description">
        VRecruit helps you find job opportunities based on your resume. 
        Simply upload your resume and the app will show you jobs that match your qualifications. 
        You can also view all available jobs in the system.
      </p>

      <p className="app-description">
        <strong>How to use:</strong>
      </p>

      <div className="flowchart-wrapper">
        <div className="flowchart-container">
          <div className="flowchart-step">
            <div className="flowchart-box">Choose File</div>
            <span className="arrow">→</span>
          </div>
          <div className="flowchart-step">
            <div className="flowchart-box">Upload Resume</div>
            <span className="arrow">→</span>
          </div>
          <div className="flowchart-step">
            <div className="flowchart-box">View Matched Jobs</div>
            <span className="arrow">→</span>
          </div>
          <div className="flowchart-step">
            <div className="flowchart-box">View All Available Jobs</div>
          </div>
        </div>

        <div className="button-container">
          <div className="upload-btn-container">
            <UploadResume 
              onMatches={setMatchedJobs} 
              onResumeUploaded={() => setIsResumeUploaded(true)} 
              onError={setErrorMessage}
            />
            {errorMessage && (
              <p className="flow-error-message">
                <i className="fa fa-exclamation-triangle"></i> {errorMessage}
              </p>
            )}
          </div>

          <div className="show-jobs-btn-container">
            <button className="show-all-jobs-btn">
              <Link to="/all-jobs" style={{ textDecoration: 'none', color: 'inherit' }}>
                <i className="fa fa-list"></i> View All Available Jobs
              </Link>
            </button>
          </div>
        </div>
      </div>

      <hr className="divider" />
      <JobList 
        jobs={matchedJobs} 
        isResumeUploaded={isResumeUploaded} 
        showMatchedHeading={true} 
      />
    </div>
  );
}

function App() {
  const [matchedJobs, setMatchedJobs] = useState([]);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Home matchedJobs={matchedJobs} setMatchedJobs={setMatchedJobs} />} 
        />
        <Route path="/all-jobs" element={<AllJobs />} />
      </Routes>
    </Router>
  );
}

export default App;
