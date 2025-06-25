require('dotenv').config();
const mongoose = require('mongoose');

// Job schema
const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  skillsRequired: [String]
});

const Job = mongoose.model('Job', jobSchema);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Expanded job list
    const jobs = [
      {
        title: 'Full Stack Developer',
        company: 'Tech Corp',
        location: 'Remote',
        description: 'Build web apps using React and Node.js',
        skillsRequired: ['react', 'node', 'javascript']
      },
      {
        title: 'Python Developer',
        company: 'AI Solutions',
        location: 'Bangalore',
        description: 'Develop machine learning tools using Python',
        skillsRequired: ['python', 'ml', 'data science']
      },
      {
        title: 'DevOps Engineer',
        company: 'CloudOps Inc',
        location: 'Remote',
        description: 'Manage CI/CD pipelines using Docker and Kubernetes',
        skillsRequired: ['docker', 'kubernetes', 'ci/cd']
      },
      {
        title: 'Frontend Developer',
        company: 'WebWorks',
        location: 'San Francisco, CA',
        description: 'Build responsive and user-friendly interfaces using HTML, CSS, and JavaScript',
        skillsRequired: ['html', 'css', 'javascript', 'react', 'redux']
      },
      {
        title: 'Backend Developer',
        company: 'Data Hub',
        location: 'London, UK',
        description: 'Design and implement RESTful APIs and microservices in Node.js and Express',
        skillsRequired: ['node', 'express', 'javascript', 'mongodb', 'api design']
      },
      {
        title: 'Data Scientist',
        company: 'DataTech',
        location: 'New York, NY',
        description: 'Analyze data and build predictive models using Python and machine learning libraries',
        skillsRequired: ['python', 'pandas', 'scikit-learn', 'tensorflow', 'data visualization']
      },
      {
        title: 'Machine Learning Engineer',
        company: 'DeepAI',
        location: 'Remote',
        description: 'Develop AI models using deep learning frameworks such as TensorFlow and PyTorch',
        skillsRequired: ['python', 'tensorflow', 'pytorch', 'deep learning', 'ai']
      },
      {
        title: 'Full Stack Engineer',
        company: 'Innovatech',
        location: 'Toronto, Canada',
        description: 'Build and maintain end-to-end software solutions using JavaScript, Node.js, and MongoDB',
        skillsRequired: ['javascript', 'node.js', 'mongodb', 'express', 'react']
      },
      {
        title: 'Cybersecurity Analyst',
        company: 'SecuTech',
        location: 'Austin, TX',
        description: 'Monitor network security and perform vulnerability assessments to protect company data',
        skillsRequired: ['network security', 'firewalls', 'penetration testing', 'linux', 'cybersecurity']
      },
      {
        title: 'Cloud Engineer',
        company: 'SkyNet Technologies',
        location: 'Seattle, WA',
        description: 'Design and implement cloud infrastructures using AWS, Azure, and GCP',
        skillsRequired: ['aws', 'azure', 'google cloud', 'docker', 'terraform']
      },
      {
        title: 'iOS Developer',
        company: 'Apple Inc',
        location: 'Cupertino, CA',
        description: 'Develop and maintain iOS apps using Swift and Objective-C',
        skillsRequired: ['swift', 'ios', 'objective-c', 'xcode']
      },
      {
        title: 'Android Developer',
        company: 'TechMobile',
        location: 'Berlin, Germany',
        description: 'Design and develop Android applications using Kotlin and Java',
        skillsRequired: ['kotlin', 'java', 'android', 'xml', 'firebase']
      },
      {
        title: 'UI/UX Designer',
        company: 'DesignWorks',
        location: 'Los Angeles, CA',
        description: 'Design intuitive and visually appealing user interfaces for mobile and web apps',
        skillsRequired: ['figma', 'adobe xd', 'sketch', 'ux design', 'ui design']
      },
      {
        title: 'QA Engineer',
        company: 'SoftWareX',
        location: 'San Francisco, CA',
        description: 'Write and execute automated tests to ensure software quality and reliability',
        skillsRequired: ['javascript', 'selenium', 'jest', 'cypress', 'manual testing']
      },
      {
        title: 'Site Reliability Engineer',
        company: 'TechOps',
        location: 'Remote',
        description: 'Maintain and improve the reliability, scalability, and performance of production systems',
        skillsRequired: ['aws', 'docker', 'kubernetes', 'sre', 'python']
      },
      {
        title: 'Blockchain Developer',
        company: 'Crypto Solutions',
        location: 'Remote',
        description: 'Develop and deploy decentralized applications (DApps) using blockchain technology',
        skillsRequired: ['solidity', 'ethereum', 'web3', 'blockchain', 'cryptocurrency']
      },
      {
        title: 'Game Developer',
        company: 'GameWorks Studio',
        location: 'Austin, TX',
        description: 'Develop engaging video games for multiple platforms using Unity and Unreal Engine',
        skillsRequired: ['unity', 'unreal engine', 'c#', 'game design', 'gaming']
      },
      {
        title: 'Technical Writer',
        company: 'TechDocs',
        location: 'Remote',
        description: 'Create clear and concise documentation for technical products and systems',
        skillsRequired: ['writing', 'technical writing', 'documentation', 'markdown', 'git']
      },
      {
        title: 'Salesforce Developer',
        company: 'CloudForce',
        location: 'Chicago, IL',
        description: 'Develop custom Salesforce applications and integrate them with other systems',
        skillsRequired: ['salesforce', 'apex', 'visualforce', 'lightning', 'crm']
      },
      {
        title: 'AR/VR Developer',
        company: 'NextGen Tech',
        location: 'San Francisco, CA',
        description: 'Build augmented and virtual reality experiences using Unity and ARKit/ARCore',
        skillsRequired: ['unity', 'augmented reality', 'virtual reality', 'c#', 'arcore']
      }
    ];

    await Job.deleteMany(); // Clean existing jobs
    await Job.insertMany(jobs);
    console.log('Sample jobs inserted');

    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error connecting:', err);
  });
