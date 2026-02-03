import { ProfileData } from './types';

export const PORTFOLIO_DATA: ProfileData = {
  name: "Mansoju Vivekananda",
  title: "Civil Engineer & Robotics Enthusiast",
  tagline: "Building Autonomous Systems & Integrating AI with Hardware",
  about: "I am a sophomore pursuing a B.Tech in Civil Engineering at the Indian Institute of Technology Kanpur, with a strong passion for Aerial Robotics, Robotics, and Machine Learning. I actively explore the integration of AI with hardware systems to create autonomous and intelligent robotic solutions.",
  socials: {
    linkedin: "https://www.linkedin.com/in/m-vivekananda-77b922284/",
    github: "https://github.com/CODER-7777",
    email: ["vivekanandamansoju@gmail.com", "mvivek24@iitk.ac.in"],
    phone: "+91 8333831294"
  },
  education: [
    {
      id: "edu-1",
      degree: "B.Tech in Civil Engineering",
      institution: "Indian Institute of Technology Kanpur",
      period: "2024 - 2028",
      // score: "CGPA: 7.9 (Till 2nd Sem)", // Hidden as requested
      board: "IITK"
    },
    {
      id: "edu-2",
      degree: "Senior Secondary",
      institution: "Narayana Educational Institutions",
      period: "2022 - 2024",
      score: "98.6%",
      board: "TSBIE"
    },
    {
      id: "edu-3",
      degree: "Matriculation",
      institution: "Vignan's Prabodhananda Prashanti Niketan",
      period: "2022",
      score: "98.2%",
      board: "CBSE"
    }
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Content Creator – Mathematics",
      company: "Set2Score",
      period: "Mar 2025 – Jul 2025",
      location: "Remote",
      description: [
        "Created educational video content focused on JEE Mathematics, simplifying advanced concepts through visual explanations.",
        "Scripted, designed, and animated JEE-level topics using Manim, covering calculus, coordinate geometry, and algebra.",
        "Produced and edited both short-form and long-form educational videos with high engagement and clarity."
      ]
    }
  ],
  projects: [
    {
      id: "proj-eternal",
      title: "Eternal - Fully Autonomous Warehouse Scanning Robot",
      subtitle: "Inter IIT Tech Meet 14.0 (Gold Medal)",
      period: "Nov 2025 – Dec 2025",
      description: [
        "Developed an autonomous robot for warehouse inventory management achieving 100% QR detection and <2cm localization accuracy using EKF sensor fusion.",
        "Implemented SLAM mapping, obstacle-aware path planning, and MPC (ACADO Toolkit) for smooth trajectory tracking.",
        "Fine-tuned YOLOv11 for QR detection and built a React-based HMI with detailed telemetry and Google Gemini voice control."
      ],
      techStack: ["ROS 2", "Python/C++", "SLAM/EqKF", "YOLOv11", "React", "Gemini API"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "proj-1",
      title: "ACA253 - Movie Booking Platform",
      subtitle: "Personal Project, ACA Dept. of CSE",
      period: "Jun 2025 – Aug 2025",
      description: [
        "Developed a movie booking platform using HTML, CSS, and JavaScript for the frontend, with MongoDB Atlas for backend data management.",
        "Implemented RESTful APIs and integrated routing, authentication, and persistent database handling."
      ],
      techStack: ["HTML/CSS", "JavaScript", "MongoDB Atlas", "RESTful APIs"],
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "proj-2",
      title: "ROBOTHON - B.O.O.K.S.",
      subtitle: "Robotics Club, IIT Kanpur",
      period: "Mar 2025 – Apr 2025",
      description: [
        "Proposed and presented the idea of B.O.O.K.S. — an autonomous library bot that retrieves books using LiDAR-based navigation.",
        "Built a PS4-controlled battlebot using ESP32, L298N, and DC motors, programmed with Pygame.",
        "Secured first place in the ideation stage and second place in the BattleBot round."
      ],
      techStack: ["ESP32", "LiDAR", "Pygame", "DC Motors"],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "proj-3",
      title: "FINAL DESTINATION",
      subtitle: "High Prep Takneek’25–26, SnT Council IITK",
      period: "Aug 2025 – Sep 2025",
      description: [
        "Built a manually controlled bot that computes the displacement vector between initial and final points in 3D space without GPS.",
        "Used IMU, wheel encoders, Bluetooth module, TB6612FNG driver, Arduino Mega, and I2C LCD.",
        "Programmed using Arduino IDE and Adafruit libraries. Secured first place."
      ],
      techStack: ["Arduino Mega", "IMU", "Bluetooth", "C++"],
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "proj-4",
      title: "GANFORGE",
      subtitle: "Summer Project, ACA Dept. of CSE",
      period: "Jun 2025 – Aug 2025",
      description: [
        "Explored AI, Machine Learning, and Deep Learning concepts through a guided research project.",
        "Implemented CycleGANs for artistic style transfer, generating creative outputs such as a Picasso-style Mona Lisa."
      ],
      techStack: ["Python", "Deep Learning", "CycleGANs", "AI"],
      image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=800&auto=format&fit=crop"
    }
  ],
  skills: [
    { name: "C", level: 90, category: "Languages" },
    { name: "C++", level: 90, category: "Languages" },
    { name: "Python", level: 95, category: "Languages" },
    { name: "HTML/CSS", level: 85, category: "Languages" },
    { name: "LaTeX", level: 80, category: "Languages" },
    { name: "OpenCV", level: 85, category: "Frameworks/Libraries" },
    { name: "NumPy", level: 90, category: "Frameworks/Libraries" },
    { name: "Matplotlib", level: 85, category: "Frameworks/Libraries" },
    { name: "Manim", level: 95, category: "Frameworks/Libraries" },
    { name: "Scikit-learn", level: 80, category: "Frameworks/Libraries" },
    { name: "Blender", level: 75, category: "Software/Tools" },
    { name: "AutoCAD", level: 85, category: "Software/Tools" },
    { name: "AutoCAD Inventor", level: 85, category: "Software/Tools" },
    { name: "Autodesk Fusion 360", level: 85, category: "Software/Tools" },
    { name: "Docker & Git", level: 80, category: "Software/Tools" },
    { name: "ROS", level: 80, category: "Software/Tools" },
    { name: "Gazebo", level: 70, category: "Software/Tools" },
    { name: "Linux", level: 85, category: "Operating Systems" },
    { name: "Windows", level: 90, category: "Operating Systems" }
  ],
  leadership: [
    {
      id: "lead-1",
      role: "Secretary",
      organization: "Robotics Club, IIT Kanpur",
      period: "May 2025 – Present"
    },
    {
      id: "lead-2",
      role: "Secretary",
      organization: "Design and Animation Club, IIT Kanpur",
      period: "Apr 2025 – Present"
    },
    {
      id: "lead-3",
      role: "Junior Team Member",
      organization: "Aerial Robotics IITK",
      period: "Mar 2025 – Present"
    },
    {
      id: "lead-4",
      role: "Academic Mentor",
      organization: "PHY112 (Classical Dynamics), IIT Kanpur",
      period: "Jul 2025 – Present"
    }
  ],
  certifications: [
    { name: "IIT Kanpur Certificate Program on AI and ML", link: "https://drive.google.com/file/d/1F44zBHNOvUMRRpk6Vyrek2ZEWjnQqBkT/view?usp=sharing" },
    { name: "Content Creation Internship – Set2Score", link: "https://drive.google.com/file/d/1UcUfyO5hWxUvHabUbXs6K9j-uE3Ibekp/view?usp=sharing" },
    { name: "Supervised Machine Learning: Regression and Classification", link: "https://coursera.org/share/7d343a8f3c1fe5debaf6d5752ee5f8b0" },
  ],
  artwork: [
    // --- PLACEHOLDER 1 ---
    {
      id: "art-1",
      title: "Security Drone",
      type: "video", // or "image"
      url: "/artworks/video1.mp4", // Put file in public/artworks/video1.mp4
      thumbnail: "/artworks/thumb1.png", // Optional: Put thumbnail in public/artworks/
      description: "A Futuristic Autonomous Security Drone"
    },
    /*
    // --- PLACEHOLDER 2 ---
    {
      id: "art-2",
      title: "Forest Low poly scene",
      type: "video",
      url: "/artworks/video2.mp4",
      thumbnail: "/artworks/thumb2.png",
      description: "Low poly style forest scene"
    },
    // --- PLACEHOLDER 3 ---
    {
      id: "art-3",
      title: "Artwork Title 3",
      type: "video",
      url: "/artworks/video3.mp4",
      thumbnail: "/artworks/thumb3.jpg",
      description: "Description for artwork 3"
    },
    // --- PLACEHOLDER 4 ---
    {
      id: "art-4",
      title: "Artwork Title 4",
      type: "video",
      url: "/artworks/video4.mp4",
      thumbnail: "/artworks/thumb4.jpg",
      description: "Description for artwork 4"
    },
    // --- PLACEHOLDER 5 ---
    {
      id: "art-5",
      title: "Artwork Title 5",
      type: "video",
      url: "/artworks/video5.mp4",
      thumbnail: "/artworks/thumb5.jpg",
      description: "Description for artwork 5"
    },
    // --- PLACEHOLDER 6 ---
    {
      id: "art-6",
      title: "Artwork Title 6",
      type: "video",
      url: "/artworks/video6.mp4",
      thumbnail: "/artworks/thumb6.jpg",
      description: "Description for artwork 6"
    }
    */
  ]
};