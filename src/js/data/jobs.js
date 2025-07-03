// Job listings data - ES6 Module Export
export const JOBS_DATA = {
  1: {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: "Hybrid",
    posted: "2024-01-15",
    deadline: "2024-02-15",
    salary: {
      min: 120000,
      max: 160000,
      currency: "USD",
      period: "annual"
    },
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=80&h=80&fit=crop&crop=center",
    description: "We are seeking a talented Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining scalable web applications that serve millions of users worldwide.",
    responsibilities: [
      "Design and develop high-quality, scalable web applications",
      "Collaborate with cross-functional teams to define and implement new features",
      "Optimize application performance and ensure code quality",
      "Mentor junior developers and contribute to technical decisions",
      "Participate in code reviews and maintain technical documentation"
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience in software development",
      "Proficiency in JavaScript, Python, or Java",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Strong understanding of database design and optimization",
      "Excellent problem-solving and communication skills"
    ],
    preferredQualifications: [
      "Master's degree in Computer Science",
      "Experience with microservices architecture",
      "Knowledge of containerization (Docker, Kubernetes)",
      "Previous experience in a senior or lead developer role"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "401(k) retirement plan with company matching",
      "Flexible work arrangements and unlimited PTO",
      "Professional development opportunities",
      "State-of-the-art equipment and modern office space"
    ],
    companyInfo: {
      size: "500-1000 employees",
      industry: "Technology",
      founded: "2015",
      website: "https://techcorp.com",
      description: "TechCorp Solutions is a leading technology company focused on building innovative software solutions that transform how businesses operate in the digital age."
    },
    applicationCount: 45,
    views: 1250
  },
  2: {
    id: 2,
    title: "Frontend Developer",
    company: "Design Studios Inc",
    location: "New York, NY",
    type: "Full-time",
    remote: "Remote",
    posted: "2024-01-10",
    deadline: "2024-02-10",
    salary: {
      min: 80000,
      max: 110000,
      currency: "USD",
      period: "annual"
    },
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=center",
    description: "Join our creative team as a Frontend Developer and help craft beautiful, intuitive user experiences. You'll work closely with designers and backend engineers to bring innovative designs to life.",
    responsibilities: [
      "Develop responsive and interactive user interfaces",
      "Collaborate with UX/UI designers to implement pixel-perfect designs",
      "Optimize applications for maximum speed and scalability",
      "Ensure cross-browser compatibility and mobile responsiveness",
      "Write clean, maintainable, and well-documented code"
    ],
    requirements: [
      "3+ years of experience in frontend development",
      "Proficiency in HTML5, CSS3, and JavaScript (ES6+)",
      "Experience with modern frameworks (React, Vue.js, or Angular)",
      "Understanding of responsive design principles",
      "Familiarity with version control systems (Git)",
      "Strong attention to detail and design sensibility"
    ],
    preferredQualifications: [
      "Experience with TypeScript",
      "Knowledge of state management libraries (Redux, Vuex)",
      "Understanding of build tools and bundlers (Webpack, Vite)",
      "Experience with testing frameworks (Jest, Cypress)"
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Health and wellness benefits package",
      "Remote work flexibility",
      "Creative freedom and collaborative environment",
      "Learning and development budget",
      "Modern tech stack and tools"
    ],
    companyInfo: {
      size: "50-100 employees",
      industry: "Design & Creative",
      founded: "2018",
      website: "https://designstudios.com",
      description: "Design Studios Inc is a creative agency specializing in digital design and user experience. We work with startups and Fortune 500 companies to create engaging digital experiences."
    },
    applicationCount: 78,
    views: 2100
  },
  3: {
    id: 3,
    title: "Product Manager",
    company: "InnovateTech",
    location: "Seattle, WA",
    type: "Full-time",
    remote: "Hybrid",
    posted: "2024-01-08",
    deadline: "2024-02-08",
    salary: {
      min: 130000,
      max: 170000,
      currency: "USD",
      period: "annual"
    },
    logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=80&h=80&fit=crop&crop=center",
    description: "We're looking for an experienced Product Manager to drive the vision and strategy for our flagship products. You'll work with engineering, design, and business teams to deliver exceptional user experiences.",
    responsibilities: [
      "Define product strategy and roadmap based on market research",
      "Collaborate with engineering and design teams to deliver features",
      "Analyze user feedback and data to inform product decisions",
      "Work with stakeholders to prioritize features and requirements",
      "Monitor product performance and iterate based on insights"
    ],
    requirements: [
      "4+ years of product management experience",
      "Strong analytical and problem-solving skills",
      "Experience with agile development methodologies",
      "Excellent communication and presentation skills",
      "Understanding of user experience principles",
      "Bachelor's degree in Business, Engineering, or related field"
    ],
    preferredQualifications: [
      "MBA or advanced degree",
      "Experience in B2B or SaaS products",
      "Technical background with ability to work closely with engineers",
      "Experience with product analytics tools"
    ],
    benefits: [
      "Competitive compensation and equity",
      "Comprehensive benefits package",
      "Flexible work environment",
      "Career growth opportunities",
      "Conference and learning stipend",
      "Team building and company events"
    ],
    companyInfo: {
      size: "200-500 employees",
      industry: "Software",
      founded: "2012",
      website: "https://innovatetech.com",
      description: "InnovateTech is a fast-growing software company that builds productivity tools for modern businesses. Our mission is to help teams work more efficiently and effectively."
    },
    applicationCount: 32,
    views: 890
  },
  4: {
    id: 4,
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Austin, TX",
    type: "Full-time",
    remote: "Remote",
    posted: "2024-01-12",
    deadline: "2024-02-12",
    salary: {
      min: 110000,
      max: 145000,
      currency: "USD",
      period: "annual"
    },
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop&crop=center",
    description: "Join our data science team to extract insights from complex datasets and build machine learning models that drive business decisions. You'll work on challenging problems across various domains.",
    responsibilities: [
      "Analyze large datasets to identify trends and patterns",
      "Build and deploy machine learning models",
      "Create data visualizations and reports for stakeholders",
      "Collaborate with engineering teams to implement data solutions",
      "Research and evaluate new data science techniques and tools"
    ],
    requirements: [
      "Master's degree in Data Science, Statistics, or related field",
      "3+ years of experience in data science or analytics",
      "Proficiency in Python or R for data analysis",
      "Experience with SQL and database systems",
      "Knowledge of machine learning algorithms and frameworks",
      "Strong statistical analysis and modeling skills"
    ],
    preferredQualifications: [
      "PhD in quantitative field",
      "Experience with cloud platforms (AWS, GCP, Azure)",
      "Knowledge of big data technologies (Spark, Hadoop)",
      "Experience with deep learning frameworks (TensorFlow, PyTorch)"
    ],
    benefits: [
      "Competitive salary and stock options",
      "Comprehensive health coverage",
      "Flexible working hours and remote work",
      "Professional development and conference attendance",
      "Cutting-edge technology and research opportunities",
      "Collaborative and innovative work environment"
    ],
    companyInfo: {
      size: "100-200 employees",
      industry: "Analytics & Data",
      founded: "2019",
      website: "https://analyticspro.com",
      description: "Analytics Pro helps businesses make data-driven decisions through advanced analytics and machine learning solutions. We work with clients across healthcare, finance, and retail industries."
    },
    applicationCount: 56,
    views: 1750
  },
  5: {
    id: 5,
    title: "UX/UI Designer",
    company: "Creative Labs",
    location: "Los Angeles, CA",
    type: "Contract",
    remote: "Hybrid",
    posted: "2024-01-14",
    deadline: "2024-02-14",
    salary: {
      min: 70,
      max: 95,
      currency: "USD",
      period: "hourly"
    },
    logo: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=80&h=80&fit=crop&crop=center",
    description: "We're seeking a talented UX/UI Designer to create exceptional user experiences for our digital products. You'll work on diverse projects ranging from mobile apps to web platforms.",
    responsibilities: [
      "Design user-centered interfaces for web and mobile applications",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Collaborate with product managers and developers",
      "Maintain and evolve design systems and style guides"
    ],
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)",
      "Strong understanding of user-centered design principles",
      "Experience with prototyping and user testing",
      "Portfolio demonstrating design process and thinking",
      "Excellent visual design and typography skills"
    ],
    preferredQualifications: [
      "Degree in Design, HCI, or related field",
      "Experience with front-end development (HTML, CSS)",
      "Knowledge of accessibility standards",
      "Experience with design systems and component libraries"
    ],
    benefits: [
      "Competitive hourly rate",
      "Flexible schedule and work arrangement",
      "Opportunity to work on diverse projects",
      "Creative freedom and professional growth",
      "Access to design tools and resources",
      "Collaborative team environment"
    ],
    companyInfo: {
      size: "25-50 employees",
      industry: "Design & Marketing",
      founded: "2020",
      website: "https://creativelabs.com",
      description: "Creative Labs is a boutique design agency that partners with innovative companies to create beautiful and functional digital experiences. We believe great design drives business success."
    },
    applicationCount: 89,
    views: 3200
  }
};

// Helper function to get all jobs as an array
export const getAllJobs = () => Object.values(JOBS_DATA);

// Helper function to get job by ID
export const getJobById = (id) => JOBS_DATA[id];

// Helper function to get jobs by company
export const getJobsByCompany = (company) => 
  getAllJobs().filter(job => job.company.toLowerCase().includes(company.toLowerCase()));

// Helper function to get jobs by location
export const getJobsByLocation = (location) => 
  getAllJobs().filter(job => job.location.toLowerCase().includes(location.toLowerCase()));

// Helper function to get remote jobs
export const getRemoteJobs = () => 
  getAllJobs().filter(job => job.remote === 'Remote');