import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
} from "../assets";

// Single source of truth for every piece of page copy. Kept in sync with
// public/pawan-bhatta-cv.pdf — update both together.

export const profile = {
  name: "Pawan Bhatta",
  role: "Full Stack Developer",
  email: "pawanbhatta00@gmail.com",
  phone: "+977 9865606077",
  location: "Mahadevsthan, Koteshwor-32, Kathmandu, Nepal",
  github: "https://github.com/pawanbhatta",
  resume: "/pawan-bhatta-cv.pdf",
  summary:
    "I'm a proactive full-stack developer who turns UX/UI files into fast, responsive web and mobile frontends, then builds and integrates the backend APIs behind them to ship a complete application.",
};

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full Stack Developer",
    icon: web,
  },
  {
    title: "React & Next.js",
    icon: creator,
  },
  {
    title: "React Native (iOS & Android)",
    icon: mobile,
  },
  {
    title: "Node.js & .NET APIs",
    icon: backend,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

// Ordered oldest-first: VerticalTimeline renders in array order.
const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "Chand Innovation Labs",
    icon: backend,
    iconBg: "#383E56",
    date: "March 2022 - August 2023",
    points: [
      "Built an EVM-based cross-chain crypto wallet for the Metapolis platform, integrating Zilliqa, Ethereum, Polygon and Binance to settle in-metaverse transactions.",
      "Wrote the data communication layer between the browser extension and the underlying blockchain logic, shipping both full-screen and extension-window UIs.",
      "Delivered an XRP NFT marketplace for buying and selling metaverse NFTs, from API design through frontend integration.",
      "Built Launch-Pad, a blockchain fundraising app, including the form-submission and participation modules.",
      "Stack: React, Ethers, Zil, Node.js, Express.js, MongoDB, React Query.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "Dailo Technologies",
    icon: mobile,
    iconBg: "#E6DEDD",
    date: "August 2023 - May 2024",
    points: [
      "Shipped a full restaurant management platform serving multiple restaurants with real-time dine-in, delivery and takeaway orders, plus its customer and delivery-rider mobile apps.",
      "Implemented real-time order processing for riders over SignalR and RabbitMQ, with Google Maps for routing and live tracking.",
      "Built a taxation portal for local government covering asset registration and public tax payments, integrating eSewa and Khalti payment gateways.",
      "Delivered the Kaligandaki Krishi Market app, letting local growers list and sell produce, fruit, meat and cattle under municipal rules.",
      "Stack: React, React Native, Expo, .NET, MySQL, Redux Toolkit, SignalR, Material UI, Tailwind CSS.",
    ],
  },
  {
    title: "Freelance Developer",
    company_name: "Freelance",
    icon: creator,
    iconBg: "#383E56",
    date: "October 2023 - February 2024",
    points: [
      "Built a performance management system for recording and evaluating employee performance across a chosen fiscal year.",
      "Designed separate dashboards for super admin, office admin and employee roles, each scoped to what that role may see and do.",
      "Scored employees from their logged activity over any given period, so reviews run off recorded data rather than recollection.",
      "Stack: React, Django, PostgreSQL, Redux Toolkit, Material UI.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "Binaytara Foundation",
    icon: web,
    iconBg: "#E6DEDD",
    date: "May 2024 - Present",
    points: [
      "Building a learning management system that awards CMA accreditation to doctors and practitioners, owning both the backend APIs and the interactive frontend.",
      "Built and maintain the Binaytara Foundation's main organisation website on a Strapi CMS with a Supabase database.",
      "Deliver Oncoblast, the LMS module that tracks exams, questionnaires, examinees and the reporting dashboard.",
      "Work end to end: convert design to code, write the Node.js APIs, and integrate the two.",
      "Stack: React, Node.js, Supabase, Strapi CMS, Redux Toolkit, Material UI, Tailwind CSS, Google Maps.",
    ],
  },
];

const education = [
  {
    degree: "Bachelor in Computer Engineering",
    institution: "IOE, Purwanchal Campus, Dharan, Sunsari",
    date: "September 2017 - August 2022",
  },
  {
    degree: "Intermediate in Science",
    institution: "Kailali Multiple Campus, Dhangadhi, Kailali",
    date: "May 2015 - June 2017",
  },
];

// No client testimonials are published yet. The Feedbacks section renders
// nothing while this is empty rather than showing placeholder quotes.
const testimonials = [];

const projects = [
  {
    name: "Learning Management System",
    description:
      "A platform that awards CMA accreditation to doctors and practitioners, covering enrolment, coursework and credit tracking. I own both the backend APIs and the interactive frontend that consumes them.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "supabase",
        color: "pink-text-gradient",
      },
    ],
    image: null,
    source_code_link: "",
  },
  {
    name: "Oncoblast",
    description:
      "The LMS module that tracks exams, questionnaires and examinees, with a reporting dashboard for administrators. Built from design handoff through to the Node.js APIs behind it.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "redux-toolkit",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: null,
    source_code_link: "",
  },
  {
    name: "Restaurant Management System",
    description:
      "A complete restaurant solution serving multiple restaurants with real-time dine-in, delivery and takeaway orders, wired to eSewa and Khalti for payments and SignalR for live order state.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "dotnet",
        color: "green-text-gradient",
      },
      {
        name: "signalr",
        color: "pink-text-gradient",
      },
    ],
    image: null,
    source_code_link: "",
  },
  {
    name: "Delivery Rider App",
    description:
      "The rider-facing mobile app for that platform: accept, process and complete online delivery orders in real time, with RabbitMQ-backed dispatch and Google Maps routing.",
    tags: [
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
      {
        name: "expo",
        color: "green-text-gradient",
      },
      {
        name: "rabbitmq",
        color: "pink-text-gradient",
      },
    ],
    image: null,
    source_code_link: "",
  },
  {
    name: "Cross-Chain Crypto Wallet",
    description:
      "An EVM-based wallet for the Metapolis platform spanning Zilliqa, Ethereum, Polygon and Binance, shipped as both a full-screen app and a browser extension, including the extension-to-chain communication layer.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "ethers",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "pink-text-gradient",
      },
    ],
    image: null,
    source_code_link: "",
  },
  {
    name: "NFT Marketplace",
    description:
      "A marketplace for buying and selling XRP NFT tokens minted for a metaverse, covering the APIs, the frontend build from design, and the integration between them.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "express",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "pink-text-gradient",
      },
    ],
    image: null,
    source_code_link: "",
  },
];

export {
  services,
  technologies,
  experiences,
  education,
  testimonials,
  projects,
};
