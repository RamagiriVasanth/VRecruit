const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { handleJobMatch, getAllJobs } = require('../controllers/jobController');

// Configure multer to save uploaded files in 'uploads/' directory
const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });

// POST /jobs/match - upload resume and process job matching
router.post('/match', upload.single('resume'), handleJobMatch);

// NEW ROUTE: GET /jobs/all - fetch all jobs
router.get('/all', getAllJobs);

module.exports = router;
