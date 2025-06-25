const Job = require('../models/Job');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.handleJobMatch = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Resume required' });

  const resumePath = path.join(__dirname, '../uploads/', req.file.filename);
  const pythonScript = path.join(__dirname, '../services/resumeParser.py');

  const python = spawn('python', [pythonScript, resumePath]);

  let data = '';
  let errorData = '';

  python.stdout.on('data', chunk => {
    data += chunk.toString();
  });

  python.stderr.on('data', chunk => {
    errorData += chunk.toString();
  });

  python.on('close', async (code) => {
    if (code !== 0) {
      console.error('Python script error:', errorData);
      cleanupFile(resumePath);
      return res.status(500).json({ error: 'Resume parsing failed' });
    }

    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch (e) {
      console.error('Error parsing JSON from Python:', e);
      cleanupFile(resumePath);
      return res.status(500).json({ error: 'Invalid resume parsing output' });
    }

    if (!parsed.skills || !Array.isArray(parsed.skills)) {
      cleanupFile(resumePath);
      return res.status(400).json({ error: 'No skills found in resume' });
    }

    try {
      const allJobs = await Job.find({});
      const matchedJobs = allJobs.filter(job =>
        job.skillsRequired.some(skill =>
          parsed.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        )
      );
      res.json({ matches: matchedJobs });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }

    cleanupFile(resumePath);
  });
};

// New function to get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json({ jobs });
  } catch (err) {
    console.error('Failed to fetch jobs:', err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// Helper to delete file safely
function cleanupFile(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error('Error deleting file:', err);
  }
}
