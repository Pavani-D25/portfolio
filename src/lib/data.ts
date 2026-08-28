// Central content file — edit this to update anything on the site.
// Swap the placeholder URLs (marked TODO) with your real links.

export const profile = {
  name: "Pavani D",
  role: "AI/ML Engineer & Full-Stack Developer",
  location: "Ooty, India",
  email: "dpavani1125@gmail.com",
  phone: "7010912813",
  linkedin: "https://www.linkedin.com/in/pavani-d-522288297/",
  github: "https://github.com/Pavani-D25",
  githubUsername: "Pavani-D25",
  summary:
    "Driven by a passion for quality and innovation, focused on creating intuitive applications and improving overall system performance.",
};

export const education = [
  {
    school: "Bannari Amman Institute of Technology",
    location: "Sathyamangalam",
    degree: "B.Tech — Artificial Intelligence and Machine Learning",
    detail: "CGPA: 8.37 / 10",
    period: "2022 — 2027",
  },
  {
    school: "Holy Innocents High School and Junior College",
    location: "Ooty",
    degree: "HSC and SSLC",
    detail: "",
    period: "",
  },
];

export const experience = [
  {
    role: "Software Development Intern",
    org: "Canorous Technologies Private Limited",
    location: "Sathyamangalam",
    period: "Jan 2025 — Present",
    description:
      "Built an AI-powered floor plan to 3D visualization web app with Python, React and FastAPI. Integrated a Mask R-CNN inference pipeline with an interactive Three.js frontend for real-time 3D scene generation. Deployed on Vercel and AWS S3.",
  },
  {
    role: "Frontend Developer Intern",
    org: "Cordite Factory",
    location: "Aruvankadu, Ooty",
    period: "Aug 2024 — Sept 2024",
    description:
      "Designed a responsive, user-friendly interface to enhance the overall user experience, collaborating within a team using version control for efficient development.",
  },
  {
    role: "Student Intern",
    org: "Bannari Amman Institute of Technology",
    location: "Sathyamangalam",
    period: "Sept 2023 — Jan 2024",
    description:
      "Hands-on experience in project planning, teamwork and real-world problem-solving, improving technical skills across programming, database management and software workflows.",
  },
];

export const skillsFlat = [
  "Python", "FastAPI", "React", "Three.js", "PyTorch", "Next.js",
  "Mask R-CNN", "Firebase", "TypeScript", "FastAPI", "Node.js", "CUDA",
];

export const skillGroups = [
  {
    label: "AI / ML",
    glow: "#1fb6a4",
    items: ["PyTorch", "Mask R-CNN", "CUDA", "TRELLIS", "Gaussian Splatting", "OpenAI API"],
  },
  {
    label: "Frontend",
    glow: "#b23cf0",
    items: ["React", "Next.js", "TypeScript", "Three.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    glow: "#ff6b6b",
    items: ["Python", "FastAPI", "Node.js", "Firebase", "REST APIs", "AWS S3"],
  },
  {
    label: "Tools",
    glow: "#4bd68c",
    items: ["Git & GitHub", "Blender", "Vercel", "Docker", "LiveKit", "Figma"],
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  description: string;
  highlights: string[];
  period?: string;
  demoUrl?: string;
  category: string;
  glow: string;
};

export const projects: Project[] = [
  {
    slug: "floorplanto3d",
    name: "FloorPlanTo3D",
    tagline: "2D floor plans converted into navigable 3D scenes with deep learning.",
    stack: ["Python", "Mask R-CNN", "FastAPI", "React", "Three.js", "AWS S3"],
    description:
      "Built a deep learning pipeline using Mask R-CNN to detect and segment architectural elements — walls, doors, windows, rooms — from 2D floor plan images, then generated navigable Three.js 3D scenes with photorealistic furniture placement, served via a React frontend and FastAPI backend.",
    highlights: [
      "Built a deep learning pipeline using Mask R-CNN to detect and segment architectural elements — walls, doors, windows, rooms — from 2D floor plan images.",
      "Engineered a 3D scene generation engine converting segmented data into navigable Three.js environments with photorealistic furniture placement.",
      "Designed a React frontend with real-time 3D preview and interactive camera controls, served via a FastAPI backend with AWS S3 asset storage.",
    ],
    demoUrl: "#",
    category: "Computer Vision · 3D Reconstruction",
    glow: "#1fb6a4",
  },
  {
    slug: "pixel-to-mesh",
    name: "PIXEL TO MESH",
    tagline: "A single product photo, turned into a production-ready 3D model.",
    stack: ["Python", "PyTorch", "Blender", "FastAPI", "CUDA", "TRELLIS"],
    period: "2025 — 2026",
    description:
      "AI pipeline converting product photos to production-ready 3D models using Gaussian Splatting and Microsoft TRELLIS — 95%+ shape accuracy, automated PBR texturing and UV unwrapping via headless Blender, GLB/OBJ/FBX/STL export, under 60 seconds per asset on an RTX 3060.",
    highlights: [
      "Built an AI pipeline converting product photos to production-ready 3D models using Gaussian Splatting and Microsoft TRELLIS, reaching 95%+ shape accuracy from a single image.",
      "Automated quad retopology, PBR texturing (base color, roughness, metallic, normal, opacity) and UV unwrapping via the headless Blender Python API, achieving 100% quad mesh output.",
      "Built a FastAPI REST API supporting GLB/OBJ/FBX/STL export with real-time web-based 3D preview.",
      "Cut 3D asset creation time from hours to under 60 seconds using GPU-accelerated inference on an RTX 3060 with CUDA and PyTorch.",
    ],
    category: "Generative AI · Product Pipeline",
    glow: "#b23cf0",
  },
  {
    slug: "mindbloom",
    name: "MindEcho",
    tagline: "A real-time voice-journaling companion for emotional reflection.",
    stack: ["React", "Firebase", "LiveKit", "OpenAI API", "Framer Motion"],
    description:
      "Real-time mental health companion app focused on voice journaling, integrating LiveKit for voice capture and OpenAI/OpenRouter APIs for AI-powered sentiment analysis and personalized suggestions.",
    highlights: [
      "Built a real-time voice-journaling companion for emotional reflection, integrating LiveKit for live voice capture.",
      "Integrated OpenAI and OpenRouter APIs for AI-powered sentiment analysis and personalized suggestions.",
      "Built with React, Firebase and Framer Motion for a smooth, interactive experience across devices.",
    ],
    demoUrl: "https://mind-echo-silk.vercel.app/",
    category: "Voice AI · Wellbeing",
    glow: "#ff6b6b",
  },
  {
    slug: "faceecho",
    name: "FaceEcho",
    tagline: "Real-time facial analysis, right in the browser.",
    stack: ["React", "face-api.js", "Tailwind CSS"],
    description:
      "Facial analysis web app detecting age, gender and facial landmarks in real time using face-api.js, with canvas-based overlays for live webcam detection and visual feedback.",
    highlights: [
      "Built a facial analysis web app detecting age, gender and facial landmarks in real time using face-api.js.",
      "Designed a responsive frontend with canvas-based overlays for live webcam detection and visual feedback.",
    ],
    demoUrl: "https://face-tawny.vercel.app/",
    category: "Computer Vision · Web",
    glow: "#4bd68c",
  },
];

export const certifications = [
  {
    name: "NPTEL — Programming in Java",
    issuer: "Elite — IIT Kharagpur, SWAYAM",
    period: "Jan — Apr 2025",
    detail: "Scored 72% (Assignments 23.5/25, Proctored Exam 48/75) across a 12-week course.",
    id: "NPTEL25CS57S1243602807",
  },
  {
    name: "Git and GitHub",
    issuer: "IBM SkillsBuild — IBM Developer",
    period: "Oct 2025",
    detail: "Version control, branching, and collaborative development workflows.",
    id: "URL-21ABB5C0AD72",
  },
];
