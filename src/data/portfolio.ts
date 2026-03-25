export const portfolioData = {
  name: "Prince Verma",
  role: "Software Developer",
  about: "Energetic and curious learner pursuing expertise in software development. Skilled in working on projects involving frontend, backend, APIs, and databases. Strong teamwork, communication, and analytical abilities with a passion for building real projects and gaining practical industry exposure.",
  
  skills: {
    programming: ["C", "C++", "Java", "Python"],
    frontend: ["React.js", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "MySQL", "Firebase"],
    web3: ["Solidity", "Ethers.js", "Hardhat", "Wagmi", "Wallet Integration"],
    mobile: ["Flutter", "Android Basics"],
    tools: ["Git", "GitHub", "VScode", "PowerBI", "Docker", "Vercel", "AWS"],
    genai: ["ChatGPT", "Claude", "Cursor", "LangChain", "Midjourney", "Hugging Face"]
  },

  projects: [
    {
      id: "genai-profile",
      title: "Gen AI Profile",
      description: "An AI-powered portfolio generator and assistant that leverages generative models to instantly create, optimize, and interactively present professional developer profiles using intelligent RAG systems.",
      tech: ["Next.js", "OpenAI API", "LangChain", "TypeScript", "Tailwind CSS"],
      link: "#",
      github: "https://github.com/Prince2005v/gen-ai-profile",
      type: "Generative AI"
    },
    {
      id: "evently",
      title: "Event Management System",
      description: "Built a full web platform for creating, managing, and registering for events with user authentication. Implemented real-time event storage and updates using Firebase/MongoDB.",
      tech: ["Next.js", "JavaScript", "Firebase", "MongoDB", "Tailwind CSS"],
      link: "https://event-ly-demo.vercel.app",
      github: "https://github.com/Prince2005v/event-party-system",
      type: "Full Stack"
    },
    {
      id: "flight-fare",
      title: "Flight Price Tracking System",
      description: "Developed a platform where users can search flights and track price changes in real time. Implemented automated price alerts with email/notification triggers using database and cron jobs.",
      tech: ["Next.js", "JavaScript", "RapidAPI", "MongoDB", "Tailwind CSS"],
      link: "#",
      github: "https://github.com/Prince2005v/flight-price-tracker",
      type: "Full Stack"
    },
    {
      id: "zenture",
      title: "Zenture Wellness",
      description: "Developed a student mental health platform providing counseling, self-help resources, peer support, and wellness tools. Integrated REST APIs for dynamic data handling.",
      tech: ["React", "JavaScript", "REST API", "Tailwind CSS"],
      link: "#",
      github: "https://github.com/kartik-270/ZentureWellness",
      type: "Frontend"
    },
    {
      id: "linux-monitor",
      title: "Linux System Monitor",
      description: "Real-time CPU, Memory, Disk monitoring with top 5 CPU-consuming processes. Features configurable CLI flags, CSV/JSON logging, and CPU usage alerts.",
      tech: ["Python", "psutil", "argparse", "Linux"],
      link: "#",
      github: "https://github.com/Prince2005v/linux-system-monitor",
      type: "Python CLI"
    },
    {
      id: "sentinel",
      title: "Sentinel Protocol",
      description: "Decentralized access control system for sensitive documents. Uses NFTs as dynamic keys and IPFS for encrypted storage.",
      tech: ["Solidity", "Hardhat", "IPFS", "Ethers.js"],
      link: "#",
      github: "https://github.com/Prince2005v/sentinel-protocol",
      type: "Web3"
    },
    {
      id: "hr-analytics",
      title: "HR Analytics Dashboard",
      description: "Complex data visualization project in Tableau analyzing employee trends, performance metrics, and attrition patterns.",
      tech: ["Tableau", "Data Analysis", "Visualization"],
      link: "#",
      github: "https://github.com/Prince2005v/hr-analytics",
      type: "Analytics"
    },
    {
      id: "rent-a-ride",
      title: "Rent-a-Ride",
      description: "Peer-to-peer car rental marketplace connecting vehicle owners and renters with a focus on ease of use.",
      tech: ["React", "Vite", "Tailwind CSS"],
      link: "#",
      github: "https://github.com/Prince2005v/rent-a-ride",
      type: "Frontend"
    }
  ],

  experience: [
    {
      company: "Freelance / Open Source",
      role: "Full Stack & Blockchain Contributor",
      duration: "2023 - Present",
      description: "Building production-ready dApps and scalable web services for various clients. Actively contributing to Web3 tooling and open-source projects."
    }
  ],

  contact: {
    email: "8567prince@gmail.com",
    mobile: "7303765801",
    github: "https://github.com/Prince2005v",
    linkedin: "https://www.linkedin.com/in/prince-verma-0ba4732a6",
    twitter: "https://twitter.com/Prince2005v"
  },
  
  payments: {
    upi: "8567prince@okaxis",
    name: "Prince Verma",
    currency: "INR",
    resumePrice: 9
  }
};
