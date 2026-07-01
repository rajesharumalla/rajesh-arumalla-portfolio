import {
  Bot,
  BrainCircuit,
  CircuitBoard,
  Code2,
  Database,
  Github,
  Mail,
  MapPin,
  Network,
  Phone,
  Sparkles,
  Workflow,
} from "lucide-react";

export const profile = {
  name: "Rajesh Arumalla",
  handle: "rajesh-arumalla.tech",
  title: "AI/ML Engineer - Software Developer - Automation Engineer",
  location: "Chennai, Tamil Nadu",
  timezone: "GMT+5:30",
  coordinates: "13.08°N 80.27°E",
  email: "arumallarajesh207@gmail.com",
  phone: "+91 98859 66356",
  github: "https://github.com/rajesharumalla",
  linkedin: "https://linkedin.com/in/arajesh1104",
  summary:
    "B.Tech graduate in Computer Science (AI/Data Science) building production-ready automation pipelines, REST API integrations, rule-based scoring systems, and AI-powered workflows.",
};

export const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "Analytics", href: "#analytics" },
  { label: "Credentials", href: "#credentials" },
  { label: "Timeline", href: "#timeline" },
  { label: "Persona", href: "#persona" },
  { label: "Contact", href: "#contact" },
];

export const heroSkills = [
  "Python",
  "SQL",
  "JavaScript",
  "n8n",
  "Docker",
  "Scikit-learn",
  "Pandas",
  "Power BI",
  "GitHub API",
  "IBM Cloud",
];

export const projects = [
  {
    title: "Job Alerts Automation System",
    description:
      "Scheduled n8n workflow running every 4 hours across SerpAPI Google Jobs, remote boards, and company boards. Normalises API schemas, scores fresher roles, deduplicates alerts, and ships structured Discord notifications.",
    tags: ["n8n", "SerpAPI", "JavaScript", "Webhooks", "State"],
    href: profile.github,
    icon: Workflow,
  },
  {
    title: "n8n GitHub Automation Pipeline",
    description:
      "Two-stage GitHub REST API pipeline that filters top repositories, enriches README metadata, validates with IF-branch routing, and delivers a formatted digest to Discord from a Docker self-hosted workflow.",
    tags: ["Docker", "GitHub API", "REST", "QA", "Discord"],
    href: "https://github.com/rajesharumalla/Automation-QA-Assessment",
    icon: Github,
  },
  {
    title: "Voice Assistant with GPT-3 & IBM Cloud",
    description:
      "Functional voice assistant integrating OpenAI GPT-3 with IBM Cloud services, covering prompt engineering, LLM API calls, and structured output handling inside a practical application.",
    tags: ["OpenAI GPT-3", "IBM Cloud", "LLM APIs", "Prompts"],
    href: profile.github,
    icon: Bot,
  },
  {
    title: "Multi-Protocol Signal Emulator",
    description:
      "Structured C firmware with a multi-level menu state machine, modular driver architecture, I2C LCD/keypad layer, four communication protocols, and flash-backed key-value persistence.",
    tags: ["C", "Firmware", "I2C", "IR/RF/NFC/RFID"],
    href: "https://github.com/rajesharumalla/Multi-protocol-signal-emulator",
    icon: CircuitBoard,
  },
];

export const skillGroups = [
  {
    label: "Languages",
    icon: Code2,
    skills: ["Python", "SQL", "JavaScript", "C", "C++"],
  },
  {
    label: "ML / AI",
    icon: BrainCircuit,
    skills: ["Machine Learning", "Scikit-learn", "NumPy", "Pandas", "Matplotlib", "OpenAI GPT-3"],
  },
  {
    label: "Automation",
    icon: Workflow,
    skills: ["n8n", "Docker", "API Workflow Design", "Conditional Logic", "Scheduled Workflows"],
  },
  {
    label: "Data & BI",
    icon: Database,
    skills: ["Power BI", "IBM Cognos", "Excel", "R Studio", "Data Visualisation"],
  },
  {
    label: "APIs & Tools",
    icon: Network,
    skills: ["GitHub REST API", "SerpAPI", "Discord Webhook", "IBM Cloud", "Postman", "Git"],
  },
  {
    label: "QA & Testing",
    icon: Sparkles,
    skills: ["Test Case Design", "API Testing", "Data Validation", "Rule-based Filtering", "Debugging"],
  },
];

export const timeline = [
  {
    date: "Oct 2022 - May 2026",
    title: "B.Tech, Computer Science Engineering",
    org: "Dr. M.G.R. Educational and Research University, Chennai",
    detail:
      "AI/Data Science specialization with GPA 7.1/10. Coursework: Data Structures, Operating Systems, Computer Architecture, Digital Electronics, and Microprocessors.",
    tags: ["AI/Data Science", "GPA 7.1", "Chennai"],
  },
  {
    date: "2024 - 2026",
    title: "Independent AI Automation Builder",
    org: "Self-directed production projects",
    detail:
      "Designed and shipped complete AI automation and software projects outside the curriculum, including API pipelines, scoring logic, webhook delivery, and data validation systems.",
    tags: ["Automation", "REST APIs", "LLM Integration"],
  },
];

export const certifications = [
  "Python for Data Science - NPTEL/IIT Madras, Jul-Aug 2024",
  "Data Science Course - Intellipaat, Mar 2025",
  "Cloud Application Developer - IBM Career Education Program, May 2024",
  "Introduction to Data Science - Cisco Networking Academy, Apr 2025",
  "Voice Assistant with OpenAI GPT-3 & IBM Cloud - IBM",
  "Business Intelligence - IBM, Dec 2024",
];

export const contactLinks = [
  { label: "Mail", href: `mailto:${profile.email}`, icon: Mail },
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Network },
  { label: "Call", href: "tel:+919885966356", icon: Phone },
  { label: "Chennai", href: "#persona", icon: MapPin },
];
