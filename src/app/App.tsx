import React, { useState, useCallback, useRef, useEffect, useLayoutEffect } from "react";
import { Github, Linkedin, Mail, ArrowRight, Download, ExternalLink, Contact } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const NAV_ITEMS = [
  { label: "About",      path: "/about",      tr: ["介绍", "소개", "แนะนำตัว", "Introducción"] },
  { label: "Projects",   path: "/projects",   tr: ["项目", "프로젝트", "โครงการ", "Proyectos"] },
  { label: "Experience", path: "/experience", tr: ["经历", "경험", "ประสบการณ์", "Experiencia"] },
  { label: "Skills",     path: "/skills",     tr: ["技能", "기능", "ทักษะ", "Habilidades"] },
  { label: "Beyond",     path: "/beyond",     tr: ["业余兴趣", "취미", "งานอดิเรก", "interés"] },
  { label: "Contact",    path: "/contact",    tr: ["联系", "연락처", "ติดต่อ", "Contacto"] },
] as const;

const PROJECTS = [
  {
    title: "TrustPath",
    slug: "trustpath",
    sub: "Making probation easier to navigate",
    image: "/imports/trustpathCover.png",
    gallery: ["/imports/trustpath1.png", "/imports/trustpath2.png", "/imports/trustpath3.png", "/imports/trustpath4.png"],
    desc: "ECC Chicago App Accelerator - social impact app that helps youth on probation stay organized through mentorship, reminders, and clear guidance to reduce technical violations.",
    overview: "TrustPath is an iOS app designed to help youth successfully navigate probation and parole. By combining peer mentorship, shared scheduling, reminders, and simplified legal guidance, the app provides consistent support for young people during re-entry while helping them avoid preventable technical violations.",
    tags: ["App Accelerator", "Social Impact", "Product Design", "Entrepreneurship"],
    tech: ["Swift", "SwiftUI", "Firebase", "Xcode", "Figma"],
    contrib: [
      { a: "UI/UX",      v: 10 },
      { a: "Frontend", v: 9 },
      { a: "Research", v: 7 },
      { a: "Presentation", v: 7 },
      { a: "Backend", v: 3 },
      { a: "Collaboration", v: 10 }
    ],
    bg: "#F2EEFF",
    ac: "#B7A6FF",
    why: "Our team focused on youth recidivism after learning that nearly 80% of youth reincarcerations in Illinois stem from technical violations, such as missed appointments or curfew violations, rather than new crimes. Through interviews with re-entry professionals, we discovered that many youth struggle with executive-function challenges, inconsistent support systems, and a lack of trust in government institutions. We wanted to design a solution that makes probation more understandable, supportive, and achievable.",
    challenge: "The biggest challenge was designing for users who often face cognitive overload, unstable support networks, and distrust of existing systems. We needed to create an experience that balanced accountability with empathy while making legal requirements easy to understand. Through user research and interviews with probation experts, we refined the product around three principles: building trusted human support, reducing confusion, and helping users stay on top of important responsibilities.",
    features: [
      {
        title: "Mentor Matching",
        detail:
          "Matches youth with volunteer mentors based on shared interests and values, allowing users to build trusted relationships, schedule introductions, and switch mentors if needed.",
      },
      {
        title: "Shared Calendar & Smart Reminders",
        detail:
          "A collaborative calendar keeps both mentors and youth informed about court dates, probation check-ins, and meetings, with reminders sent to both for added accountability.",
      },
      {
        title: "Guidance Center",
        detail:
          "Translates complex probation and parole terminology into plain language, making legal requirements easier to understand and reducing confusion.",
      },
      {
        title: "Progress Tracker",
        detail:
          "Displays a probation completion countdown and personalized encouragement messages from onboarding to motivate users throughout their journey.",
      },
    ],
    impact: "Launched 2 versions of it on App Store and pitched it to an audience of 80+, including related government representatives. We're also trying to get a pilot up for this app. Beyond building the app, this project gave me experience thinking like a product founder. I learned how to identify meaningful problems, validate them through research, prioritize features with limited time, and communicate both the product vision and its social impact through presentations and pitches.",
    link: "https://www.eccchicago.org/2025-app-accelerator.html#trustpath",
    github: "",
  },
  {
    title: "grami",
    slug: "grami",
    sub: "AI-powered cooking assistant",
    image: "/imports/gramiCover.png",
    gallery: ["/imports/grami1.png", "/imports/grami2.png", "/imports/grami3.png", "/imports/grami4.png"],
    desc: "Built at Columbia University's DevFest 2026 - grami is a smart cooking companion that tracks personal fridge inventory and suggests recipes based on available ingredients, minimizing food waste.",
    overview: "An AI cooking assistant that guides users through recipes step-by-step using what they already have at home.",
    tags: ["Hackathon", "AI/ML", "Sustainability", "Computer Vision"],
    tech: ["Python", "HTML/CSS", "Firebase", "YOLOv8", "Tesseract OCR", "Dedalus AI", "ElevenLabs", "Figma"],
    contrib: [
      { a: "UI/UX",      v: 9 },
      { a: "Frontend", v: 8 },
      { a: "AI",      v: 8 },
      { a: "Presentation", v: 4 },
      { a: "Collaboration", v: 7 }
    ],
    bg: "#EEF5FF",
    ac: "#7AA6FF",
    why: "Having started college last fall, our team was inspired by our shared curiosity and desire to start cooking our own meals. Cooking felt daunting at first, so we wanted to make it feel more approachable.",
    challenge: "Getting voice inputs and AI assistant responses to work functionally and display real-time. Integrating multiple AI systems that weren't originally designed to work together. Since our food detection model was limited by a small training dataset, we focused on making the app flexible so users could easily review and edit their inventory whenever needed.",
    features: [
      {
        title: "Voice-guided recipe assistant",
        detail: "grami, with a lowercase g, responds to commands like \"grami send next\" (to read the next step) or \"grami send repeat,\" (to repeat the previous step) allowing users to navigate recipes entirely by voice. This makes cooking more convenient when users are away from their device or have messy hands.",
      },
      {
        title: "Fridge inventory tracking (receipt + fridge scanning)",
        detail: "Users can upload grocery receipts to log data on food purchased as well as expected expiration dates. If the user has not previously uploaded any receipts, there's an alternative option to scan their fridge, detecting and autonomously adding contents to the same database. The app allows the user to adjust the list manually: to remove items, correct the expiration date, or add items.",
      },
      {
        title: "Personalized ingredient-based suggestions",
        detail: "The inventory orders the food items by expiration date and accordingly prioritizes soon-to-expire ingredients when generating recipes. This improves sustainability by making the user aware of which foods are about to expire and ultimately reducing food waste.",
      },
    ],
    impact: "My initial experience with hackathons, looking to participate in more! It turned a stressful kitchen experience into something encouraging and practical, especially for beginners.",
    link: "https://devpost.com/software/grami-18m75d",
    github: "https://github.com/gjcho/DevFest26",
  },
  {
    title: "Balanced Health",
    slug: "balanced-health",
    sub: "iOS wellness tracker with ML",
    image: "/imports/balancedhealthCover.jpg",
    gallery: ["/imports/balancedhealthCover.jpg"],
    desc: "ECC Chicago iOS + ML Program — personalized health app using CoreML to surface insights and track habit patterns for a healthier daily routine.",
    overview: "A wellness app that uses on-device machine learning to surface meaningful health patterns without requiring constant internet access.",
    tags: ["iOS", "Machine Learning"],
    tech: ["Swift", "SwiftUI", "CoreML", "Xcode", "FoundationModels"],
    contrib: [
      { a: "UI/UX",    v: 10 },
      { a: "Frontend", v: 9 },
      { a: "Pitching", v: 7 },
      { a: "Backend",  v: 5 },
      { a: "Research", v: 6 },
      { a: "Collaboration", v: 8 },
    ],
    bg: "#E8FBF4",
    ac: "#7FE3C5",
    why: "It started with my own struggle to maintain a healthy sleep schedule and manage screen time. During the start of the program when everyone pitched their ideas on the theme \"healthier society\", I found my teammate Bu's idea to be a more comprehensive approach to wellness tracking. So we decided to merge ideas to create a solution that could help us understand our habits better and make small, sustainable improvements to our wellness.",
    challenge: "This was my first time making an app, so there was a lot to learn about the development process (Figma wireframing, Github collaboration, coding in Swift). At first, I wanted to track the user's screentime using Apple's system, but there seems to be privacy concerns that made it difficult to get screentime data from Apple. Under time constraints, we ended up putting that feature aside. Some other challenges were learning how to connect and retrieve user inputs from our database using Firebase and working to integrate every feature together. Balancing independent problem-solving with tight collaboration helped me grow both as a developer and a teammate.",
    features: [
      {
        title: "Pet reward system",
        detail: "Users are greeted by Dreamsprite, a virtual pet that grows alongside their healthy habits. Completing personalized tasks earns experience points, making it more rewarding to build consistent routines over time.",
      },
      {
        title: "Mental health & habit tracking",
        detail: "Users can schedule breaks, set sleep and screen-time goals, and log their daily mood. By connecting these habits together, the app helps users better understand what affects their well-being while encouraging healthier routines through reminders and rewards.",
      },
      {
        title: "Personalized wellness insights",
        detail: "Instead of generic recommendations, users receive daily tasks generated from their own health data using machine learning. Interactive progress charts also help them visualize changes in areas like mood over time.",
      },
      {
        title: "Food scanner & nutrition tracking",
        detail: "Simply snap a photo of your meal to identify foods, estimate nutritional information, and automatically log calories. This makes healthy eating easier without the hassle of manual tracking.",
      },
      {
        title: "AI fitness coach",
        detail: "Users can chat with an AI fitness assistant to receive exercise recommendations based on the muscle group they want to target, making it easy to discover workouts tailored to their goals and available equipment."
      }
    ],
    impact: "My first app development experience, learned how to incorporate ML image recognition into an iOS app. Pitched our prototype to an audience of 40+ people.",
    link: "https://github.com/antares-v/balancedhealth",
    github: "",
  },
];

const ARCHIVE = [
  { title: "PhinTrack",         sub: "Financial Management Desktop App",  tech: ["Python", "PyQt6"] },
  { title: "Steel Egg Factory", sub: "2D Strategy Game",     tech: ["HTML5"] },
  { title: "WeChat Drafts",     sub: "Draft Box WebApp for WeChat Moments",    tech: ["TypeScript", "CSS", "HTML", "JavaScript"] },
  { title: "FuSSO Website",     sub: "Nonprofit Organization's Website",     tech: ["Wix", "JavaScript"] },
];

const EXPERIENCE = [
  {
    org: "Everyone Can Code",
    role: "App Accelerator",
    period: "Fall 2025",
    bullets: [
      "Collaborated in a team of 4 to develop TrustPath, an iOS app reducing recidivism among justice-involved youth",
      "Designed and Implemented frontend features including interest-based mentor matching system, shared calendar with reminders, progress tracking, and in-app probation guidance",
      "Conducted stakeholder interviews with probation officers and youth to validate user needs and refine app direction + features based on real-world feedback",
      "Pitched TrustPath across 3 demo days to 80+ audience members, including related government representative, and published 2 feature-updated versions on App Store",
      "Attended daily meeting and workshops to build skills in app development, product thinking, and entrepreneurship"
    ],
    tech: ["Swift", "iOS", "Project Management", "Entrepreneurship"],
  },
  {
    org: "Everyone Can Code",
    role: "Summer Intern",
    period: "Summer 2025",
    bullets: [
      "Collaborated with a team of 4 to build prototype of Balanced Health, an iOS app implementing machine learning to promote healtier habits, and pitched to 50+ audience members",
      "Developed the app's mental wellness features (mood tracking, sleep and screen time monitoring, bbreak scheduling, pet reward system)",
      "Designed and implemented frontend of the app using SwiftUI, including interactive charts, onboarding flow, various tabs, and user profile",
      "Worked with Apple's team to create digital assets, coordinate event logistics, and document the Everyone Can Code + Create showcase at Apple Michigan Avenue Store & IIT Ed Kaplan Institute as videographer"
    ],
    tech: ["Swift", "iOS", "Machine Learning", "Project Management", "Event Planning"],
  },
  {
    org: "Columbia University",
    role: "B.S. Computer Science",
    period: "Fall 2025 – Present",
    bullets: [
      "Relevant coursework: Advanced Programming, Data Structures & Algorithms in Java, Multivariable Calculus for Engineers, Linear Algebra and Probability, Intro to CS (Python), Frontiers in Operations Research and Data Analytics",
      "Clubs: Women in Computer Science, DivHacks Organizing Committee (Hacker Experience), Columbia Undergraduate Math Initiative",
    ],
    tech: ["Algorithms", "Projects", "Education"],
  },
  {
    org: "Future Science Scholar Organization",
    role: "President of Operations / Fu-Edu Department Leader",
    period: "Summer 2023 - Summer 2025",
    bullets: [
      "Connected a community of 2500+ members interested in STEM",
      "Guided the operation process of advanced programs (Education + Research), basic programs (News + Popular Science), and staff departments through biweekly meetings",
      "Led the Fu-Edu advanced program, hosted 10+ academic debates, seminars, and the development of self-paced courses",
      "Regularly updated website features, improved SEO and website accessibility, doubling the number of impressions within 2 weeks",
      "Edited and published vlogs of events and videos of popular science knowledge across multiple platforms"
    ],
    tech: ["Leadership", "Project Management", "Event Planning", "Video Editing", "Web Development", "Communication", "Collaboration"]
  }
];

const SKILLS_GROUPS: Record<string, string[]> = {
  Languages:  ["Java", "Python", "Swift", "JavaScript", "TypeScript", "Haskell", "Racket"],
  Design:     ["Figma", "Canva", "Wix", "CapCut", "Premiere Pro", "Hypic"],
  Tools:      ["GitHub", "Xcode", "VSCode", "Copilot"],
};

const SPOKEN = [
  { code: "EN", name: "English",   flag: "🇺🇸", hello: "Hello!" },
  { code: "ZH", name: "Mandarin",  flag: "🇨🇳", hello: "你好！" },
  { code: "yue-CN", name: "Cantonese", flag: "🇭🇰", hello: "你好！" },
  { code: "TH", name: "Thai",      flag: "🇹🇭", hello: "สวัสดี!" },
  { code: "KO", name: "Korean",    flag: "🇰🇷", hello: "안녕하세요!" },
  { code: "ES", name: "Spanish",   flag: "🇪🇸", hello: "¡Hola!" },
];

const BEYOND = [
  { icon: "🐈", label: "Cats",          fact: "I have two cats named Potato and Gray. I love all stuff cats: phone case, card holder, photobooks, etc", image: "/imports/cats.jpg" },
  { icon: "🎬", label: "Video Editing", fact: "Once spent 6 hours perfecting a 40-second clip. Totally worth it - 1.5M views and 50k+ likes! \n\n Accumulated 2.5M views and 90k+ likes across all videos.", video: "/imports/edit.mp4", poster: "/imports/editPoster.png" },
  { icon: "🌏", label: "Languages",     fact: "My love for learning a language stems from wanting to understand tv-series without subtitles. 6 languages so far, if you count programming languages too - that's even more :P", image: "/imports/lang.jpg" },
  { icon: "🍳", label: "Cooking",       fact: "Simple dishes, the \"right\" amount of seasoning, and a willingness to improvise.", image: "/imports/cook.jpg" },
  { icon: "🎮", label: "Games",         fact: "Honor of Kings (Grandmaster), PUBG Mobile (Ace), Sky, QQ Racing, LinkedIn Games, Roblox. Also interested in game development.", video: "/imports/game.mp4" },
  { icon: "✂️", label: "Crafts",        fact: "Piecing parts together", image: "/imports/craft.jpg" },
];

const HIGHLIGHTS = [
  "NCWIT Honorable Mention",
  "QuestBridge Scholar",
  "Everyone Can Code Intern",
];

// ═══════════════════════════════════════════════════════════
// HOOK: paw print effect
// ═══════════════════════════════════════════════════════════

function usePawPrint() {
  const [paws, setPaws] = useState<{ id: number; x: number; y: number }[]>([]);
  const ctr = useRef(0);

  const onEnter = useCallback((e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const id1 = ++ctr.current;
    const id2 = ++ctr.current;
    setPaws(p => [
      ...p,
      { id: id1, x: x - 12, y: y - 6 },
      { id: id2, x: x + 6,  y: y + 2  },
    ]);
    setTimeout(() => setPaws(p => p.filter(q => q.id !== id1 && q.id !== id2)), 480);
  }, []);

  const PawEls = paws.map(({ id, x, y }) => (
    <svg
      key={id}
      width="14" height="14"
      viewBox="0 0 32 32"
      className="fixed pointer-events-none animate-paw"
      style={{ left: x, top: y, zIndex: 9999 }}
      aria-hidden="true"
    >
      <circle cx="16" cy="22" r="7"   fill="rgba(148,163,184,0.6)" />
      <circle cx="7"  cy="13" r="4.5" fill="rgba(148,163,184,0.6)" />
      <circle cx="25" cy="13" r="4.5" fill="rgba(148,163,184,0.6)" />
      <circle cx="11" cy="7"  r="3.5" fill="rgba(148,163,184,0.6)" />
      <circle cx="21" cy="7"  r="3.5" fill="rgba(148,163,184,0.6)" />
    </svg>
  ));

  return { onEnter, PawEls };
}

// ═══════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════

function NavItem({ item, onNavigate }: { item: (typeof NAV_ITEMS)[number]; onNavigate: (path: string) => void }) {
  const [trans, setTrans] = useState("");
  const [show,  setShow]  = useState(false);

  const enter = () => {
    setTrans(item.tr[Math.floor(Math.random() * item.tr.length)]);
    setShow(true);
  };

  return (
    <a
      href={item.path}
      className="relative text-[13px] font-semibold text-gray-500 hover:text-gray-900 transition-colors duration-150"
      onMouseEnter={enter}
      onMouseLeave={() => setShow(false)}
      onClick={e => {
        e.preventDefault();
        onNavigate(item.path);
      }}
    >
      {item.label}
      <span
        className="absolute left-1/2 top-full mt-0.35 whitespace-nowrap pointer-events-none transition-all duration-200"
        style={{
          color: "#B7A6FF",
          fontSize: "9px",
          transform: "translateX(-50%)",
          opacity: show ? 1 : 0,
        }}
      >
        {trans}
      </span>
    </a>
  );
}

function SectionLabel({ eyebrow, heading, className = "" }: { eyebrow: string; heading: string; className?: string }) {
  return (
    <div className={`mb-6 ${className}`.trim()}>
      <p
        className="text-[9px] font-black uppercase tracking-[0.2em] mb-1.5"
        style={{ color: "#B7A6FF" }}
      >
        {eyebrow}
      </p>
      <h2
        className="font-extrabold text-3xl text-gray-900"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {heading}
      </h2>
      <div className="w-8 h-0.5 mt-2 rounded-full" style={{ background: "#7AA6FF" }} />
    </div>
  );
}

function Header({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(250,250,247,0.88)", backdropFilter: "blur(14px)", borderColor: "rgba(0,0,0,0.07)" }}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <button onClick={() => onNavigate("/")} className="text-base font-extrabold tracking-tighter text-gray-900 shrink-0" style={{ fontFamily: "'Nunito', sans-serif" }}>
          molly<span style={{ color: "#7AA6FF" }}>.</span>
        </button>
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {NAV_ITEMS.map(item => <NavItem key={item.label} item={item} onNavigate={onNavigate} />)}
        </div>
      </div>
    </nav>
  );
}

function SectionPageShell({
  children,
  eyebrow,
  heading,
  onNavigate,
}: {
  children: React.ReactNode;
  eyebrow: string;
  heading: string;
  onNavigate: (path: string) => void;
}) {
  return (
    <div className="min-h-screen" style={{ background: "#FAFAF7", fontFamily: "'Inter', sans-serif", color: "#1C1C1C" }}>
      <style>{`
        * { -ms-overflow-style: none; scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Header onNavigate={onNavigate} />
      <main className="pt-14">
        <section className="max-w-5xl mx-auto px-6 py-10">
          <div className={eyebrow === "Project spotlight" ? "pl-1 sm:pl-1" : ""}>
            <SectionLabel eyebrow={eyebrow} heading={heading} />
          </div>
          {children}
        </section>
      </main>
      <footer className="py-6 text-center text-[11px] text-gray-400" style={{ background: "#FAFAF7" }}>
        Designed &amp; built with care by Molly 🐈
      </footer>
    </div>
  );
}

function ContribBars({ contrib, color }: { contrib: { a: string; v: number }[]; color: string }) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-2.5">My contribution</p>
      <div className="space-y-2">
        {contrib.map(({ a, v }) => (
          <div key={a} className="flex items-center gap-3">
            <span className="text-[10px] text-gray-400 w-14 shrink-0 font-medium">{a}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2 rounded-[2px] transition-all duration-300"
                  style={{ backgroundColor: i < v ? color : "#E9ECF0" }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[8px] text-gray-300 mt-1.5 italic">Represents where I spent the most effort</p>
    </div>
  );
}

function ProjectCard({ project, onNavigate }: { project: (typeof PROJECTS)[number]; onNavigate: (path: string) => void }) {
  const { onEnter: btbEnter, PawEls: btbPaws } = usePawPrint();

  return (
    <div className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
      style={{ borderColor: "rgba(0,0,0,0.07)" }}>
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${project.ac}, ${project.ac}88)` }} />
      <div className="p-5">
        <div className="flex gap-1.5 flex-wrap mb-2">
          {project.tags.map(t => (
            <span
              key={t}
              className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: project.bg, color: project.ac }}
            >
              {t}
            </span>
          ))}
        </div>
        <h3
          className="font-extrabold text-lg text-gray-900 leading-tight mb-1"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {project.title}
        </h3>
        <p className="text-[10px] text-gray-400 mb-3">{project.sub}</p>
        <img src={project.image} alt={project.title} className="w-full h-auto rounded-lg mb-3" />
        <p className="text-[11px] text-gray-600 leading-relaxed">{project.desc}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {project.tech.map(t => (
            <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-gray-500">
              {t}
            </span>
          ))}
        </div>
        <ContribBars contrib={project.contrib} color={project.ac} />
        <div className="flex items-center gap-3 mt-3">
          <button
            className="text-[10px] font-semibold text-gray-400 hover:text-gray-700 transition-colors duration-200"
            onMouseEnter={btbEnter}
            onClick={() => onNavigate(`/projects/${project.slug}`)}
          >
            View details →
          </button>
          {btbPaws}
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-0.5 text-[10px] font-bold ml-auto transition-colors duration-200"
            style={{ color: project.ac }}
          >
            View <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectMediaGallery({ project }: { project: (typeof PROJECTS)[number] }) {
  const mediaItems = [project.image, ...(project.gallery ?? [])].filter(Boolean) as string[];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [project.slug]);

  if (!mediaItems.length) {
    return null;
  }

  const activeMedia = mediaItems[activeIndex];
  const showPrev = () => setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  const showNext = () => setActiveIndex((prev) => (prev + 1) % mediaItems.length);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {mediaItems.length > 1 ? (
          <button
            onClick={showPrev}
            className="hidden font-thin text-[20px] sm:flex h-10 w-10 shrink-0 items-center justify-center text-lg text-gray-700 transition hover:-translate-y-0.5 hover:text-shadow-md"
            aria-label="Previous media"
          >
            ❮
          </button>
        ) : null}

        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white" style={{ aspectRatio: "3 / 2" }}>
          <img
            key={`${project.slug}-image-${activeIndex}`}
            src={activeMedia}
            alt={`${project.title} media ${activeIndex + 1}`}
            className="max-h-full max-w-full object-contain bg-white"
          />
        </div>

        {mediaItems.length > 1 ? (
          <button
            onClick={showNext}
            className="hidden font-thin text-[20px] sm:flex h-10 w-10 shrink-0 items-center justify-center text-lg text-gray-700 transition hover:-translate-y-0.5 hover:text-shadow-md"
            aria-label="Next media"
          >
            ❯
          </button>
        ) : null}
      </div>

      {mediaItems.length > 1 ? (
        <div className="flex items-center justify-center gap-2">
          {mediaItems.map((_, index) => (
            <button
              key={`${project.slug}-dot-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${index === activeIndex ? "bg-gray-800" : "bg-gray-300"}`}
              aria-label={`Go to media ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProjectDetailPage({ project, onNavigate }: { project: (typeof PROJECTS)[number]; onNavigate: (path: string) => void }) {
  const [openFeatures, setOpenFeatures] = useState<number[]>([]);

  useLayoutEffect(() => {
    setOpenFeatures([]);

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();

    window.addEventListener("load", resetScroll);
    window.addEventListener("pageshow", resetScroll);

    return () => {
      window.removeEventListener("load", resetScroll);
      window.removeEventListener("pageshow", resetScroll);
    };
  }, [project.slug]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 ml-1.5 mt-1">
        <div className="-mt-1.5 -mb-1.5">
          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">{project.overview}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[3fr_1fr] gap-7 ">
        <div className="bg-white rounded-xl border p-6 shadow-sm" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map(tag => (
              <span key={tag} className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: project.bg, color: project.ac }}>
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-extrabold text-2xl text-gray-900 mb-2 ml-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 mb-4.5 ml-1">{project.sub}</p>
          <div className="mb-5">
            <ProjectMediaGallery project={project} />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed ml-2 mt-1">{project.desc}</p>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-2">Why I built it</p>
              <p className="text-sm text-gray-600 leading-relaxed">{project.why}</p>
            </div>
            <div className="rounded-2xl border p-4" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-2">Biggest challenge</p>
              <p className="text-sm text-gray-600 leading-relaxed">{project.challenge}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border p-4" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Features</p>
            <div className="space-y-2">
              {project.features.map((feature, index) => {
                const isOpen = openFeatures.includes(index);
                return (
                  <div key={feature.title} className="rounded-md border border-gray-100 bg-gray-50/60">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFeatures(prev =>
                          prev.includes(index) ? prev.filter(item => item !== index) : [...prev, index]
                        )
                      }
                      className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left"
                    >
                      <span className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <span className="shrink-0" style={{ color: project.ac }}>✦</span>
                        {feature.title}
                      </span>
                      <span className="text-xs text-gray-400">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen ? (
                      <div className="px-3 pb-3 pl-4.5 text-sm text-gray-600 leading-relaxed">
                        {feature.detail}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border p-4" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-2">Impact</p>
            <p className="text-sm text-gray-600 leading-relaxed">{project.impact}</p>
          </div>
        </div>

        <aside className="space-y-4 -mr-1">
          <div className="bg-white rounded-xl border p-5 shadow-sm" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-3">My contribution</p>
            <ContribBars contrib={project.contrib} color={project.ac} />
          </div>

          <div className="bg-white rounded-xl border p-5 shadow-sm" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Tech</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map(tech => (
                <span key={tech} className="text-[9px] px-2 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-500">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.01]"
            style={{ background: project.ac }}
          >
            View project <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 border border-gray-200 shadow-sm transition-transform duration-200 hover:scale-[1.01]"
              style = {{ background: "#343434", color: "#FFFFFF" }}
            >
              Github <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </aside>
      </div>
    </div>
  );
}

function FlipCard({ icon, label, fact, image, video, poster }: { icon: string; label: string; fact: string; image?: string; video?: string; poster?: string }) {
  const [flipped, setFlipped] = useState(false);
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const handleEnter = () => {
    setFlipped(true);
    if (vidRef.current) {
      // attempt to play; ignore promise rejection
      void vidRef.current.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    setFlipped(false);
    if (vidRef.current) {
      try { vidRef.current.pause(); vidRef.current.currentTime = 0; } catch {}
    }
  };
  return (
    <div
      className="cursor-pointer h-44"
      style={{ perspective: "900px" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border border-gray-100 shadow-sm bg-white"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-4xl">{icon}</span>
          <span className="text-sm font-bold text-gray-700">{label}</span>
          <p className="text-[11px] text-center text-gray-500 px-4">Hover to flip for more</p>
        </div>
        <div
          className="absolute inset-0 rounded-3xl border border-gray-200 shadow-sm"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #EEF5FF, #F2EEFF)",
          }}
        >
          <div className="flex h-full w-full overflow-hidden rounded-3xl">
            <div className="w-1/3 bg-white border-r border-gray-200 flex items-center justify-center px-3">
              {video ? (
                <video
                  ref={vidRef}
                  src={video}
                  poster={poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-24 w-full rounded-3xl object-cover"
                />
              ) : image ? (
                <img src={image} alt={label} className="h-24 w-full rounded-3xl object-cover" />
              ) : (
                <div className="h-24 w-full rounded-3xl bg-gray-100 flex items-center justify-center text-[11px] text-gray-400">
                  Image
                </div>
              )}
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center">
              <p className="text-[11px] font-semibold text-gray-700 mb-2">{label}</p>
              <p className="text-[11px] text-gray-600 leading-relaxed">{fact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LangCard({ flag, name, code, hello }: { flag: string; name: string; code: string; hello: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-100 shadow-sm cursor-default hover:border-blue-200 hover:shadow-md transition-all duration-200"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span>{flag}</span>
      <div>
        <p className="text-[11px] font-bold text-gray-700 transition-all duration-150">
          {hov ? hello : name}
        </p>
        <p className="text-[9px] text-gray-400">{code}</p>
      </div>
    </div>
  );
}

function ContactLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const { onEnter, PawEls } = usePawPrint();
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-gray-700 font-semibold text-sm"
        onMouseEnter={onEnter}
      >
        {icon}
        {label}
      </a>
      {PawEls}
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════

const resolveRoute = (path: string) => {
  if (path === "/about" || path === "/projects" || path === "/experience" || path === "/skills" || path === "/beyond" || path === "/contact") {
    return path;
  }

  if (path.startsWith("/projects/")) {
    const slug = path.split("/projects/")[1];
    if (PROJECTS.some(project => project.slug === slug)) {
      return path;
    }
  }

  return "/";
};

export default function App() {
  const [avatarHov, setAvatarHov]   = useState(false);
  const [catFound,  setCatFound]    = useState(false);
  const [catNotice, setCatNotice]   = useState(false);
  const [route, setRoute] = useState(() => resolveRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setRoute(resolveRoute(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [route]);

  const { onEnter: resumeEnter, PawEls: resumePaws } = usePawPrint();
  const { onEnter: projEnter,   PawEls: projPaws   } = usePawPrint();

  const navigateTo = (path: string) => {
    const nextPath = resolveRoute(path);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setRoute(nextPath);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const foundCat = () => {
    setCatFound(true);
    setCatNotice(true);
    setTimeout(() => setCatNotice(false), 2800);
  };

  const activeProject = route.startsWith("/projects/")
    ? PROJECTS.find(project => project.slug === route.split("/projects/")[1]) ?? null
    : null;

  if (route !== "/") {
    return (
      <SectionPageShell
        eyebrow={route.startsWith("/projects/") ? "Project spotlight" : "Explore more"}
        heading={route === "/about" ? "About" : route === "/projects" ? "Projects" : route === "/experience" ? "Experience" : route === "/skills" ? "Skills" : route === "/beyond" ? "Beyond Coding" : route.startsWith("/projects/") ? activeProject?.title ?? "Projects" : "Contact"}
        onNavigate={navigateTo}
      >
        {route === "/about" ? (
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                I enjoy building software that people actually enjoy using. My interests span app
                development, game development, AI, and user experience. And I&apos;m always looking for
                opportunities to combine technical problem-solving with thoughtful design.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-7">
                Outside of coding, I&apos;m usually learning languages, editing videos, experimenting
                in the kitchen, or searching for the next friendly cat to say hello to.
              </p>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Highlights</p>
                <div className="space-y-2">
                  {HIGHLIGHTS.map(h => (
                    <div key={h} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-xs shrink-0" style={{ color: "#7AA6FF" }}>✦</span>
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-2.5 content-start">
              {[
                { icon: "🎓", main: "Columbia University", sub: "Computer Science" },
                { icon: "🌏", main: "6 Languages",         sub: "EN ZH yue-CN TH KO ES" },
                { icon: "💻", main: "iOS · Web · AI",       sub: "Project types" },
                { icon: "📍", main: "NYC",                  sub: "Based in" },
              ].map(({ icon, main, sub }) => (
                <div
                  key={main}
                  className="bg-white rounded-2xl p-4 border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  style={{ borderColor: "rgba(0,0,0,0.07)" }}
                >
                  <span className="text-2xl block mb-2">{icon}</span>
                  <p className="font-bold text-sm text-gray-800 leading-tight">{main}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        ) : route === "/projects" ? (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4">
              {PROJECTS.map(p => <ProjectCard key={p.title} project={p} onNavigate={navigateTo} />)}
            </div>
          </div>
        ) : activeProject ? (
          <ProjectDetailPage project={activeProject} onNavigate={navigateTo} />
        ) : route === "/experience" ? (
          <div className="space-y-4">
            {EXPERIENCE.map((exp, i) => (
              <div key={`${exp.org}-${exp.role}-${exp.period}`} className="flex gap-5">
                <div className="flex flex-col items-center pt-2 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full border-2 bg-white" style={{ borderColor: "#7AA6FF" }} />
                  {i < EXPERIENCE.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="bg-white rounded-2xl p-5 border shadow-sm" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                      <div>
                        <p className="font-bold text-gray-800">{exp.org}</p>
                        <p className="text-xs text-gray-500">{exp.role}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-lg font-semibold">{exp.period}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.bullets.map(b => (
                        <li key={b} className="flex gap-2 text-xs text-gray-600">
                          <span className="shrink-0 mt-0.5" style={{ color: "#7FE3C5" }}>▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {exp.tech.map(t => <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : route === "/skills" ? (
          <div className="space-y-7">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(SKILLS_GROUPS).map(([cat, items]) => (
                <div key={cat} className="bg-white rounded-2xl p-5 border shadow-sm" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-3">{cat}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map(s => <span key={s} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-50 border border-gray-200 text-gray-600">{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Spoken Languages</p>
              <div className="flex flex-wrap gap-2">
                {SPOKEN.map(s => <LangCard key={s.code} {...s} />)}
              </div>
            </div>
          </div>
        ) : route === "/beyond" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BEYOND.map(item => <FlipCard key={item.label} {...item} />)}
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <ContactLink href="mailto:bingznnn@gmail.com" icon={<Mail className="w-4 h-4" />} label="Email" />
              <ContactLink href="https://www.linkedin.com/in/xinxi-zhong-25ba352a8" icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
              <ContactLink href="https://github.com/xzhongMM" icon={<Github className="w-4 h-4" />} label="GitHub" />
            </div>
            <div className="flex items-center justify-center gap-3 mt-7 flex-wrap">
              <ContactLink href="https://www.rednote.com/user/profile/5fe11c24000000000101f3aa" icon={<img src="/imports/xhsLogo.jpg" alt="XHS" className="w-5 h-5 object-contain" />} label="RedNote" />
              <ContactLink href="https://www.douyin.com/user/MS4wLjABAAAAWzBEEdV77Vhg3GoFMzZRncHo-fkEBh5s6khEtONq3V8" icon={<img  src="/imports/dyLogo.png" alt="Douyin" className="w-4.5 h-4.5 mb-0.5" />} label="Douyin" />
            </div>
          </div>
        )}
      </SectionPageShell>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "#FAFAF7", fontFamily: "'Inter', sans-serif", color: "#1C1C1C" }}
    >
      {/* ── Global styles ─────────────────────────────── */}
      <style>{`
        * { -ms-overflow-style: none; scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
        html { scroll-behavior: smooth; }

        @keyframes pawAnim {
          0%   { opacity: 0; transform: scale(0.4) rotate(-20deg); }
          35%  { opacity: 0.7; transform: scale(1.1) rotate(8deg); }
          100% { opacity: 0; transform: scale(0.85) rotate(0deg) translateY(-8px); }
        }
        .animate-paw { animation: pawAnim 480ms ease-out forwards; }

        @keyframes bubbleFloat {
          0%, 100% { opacity: 0.85; transform: translateY(0); }
          50%      { opacity: 1; transform: translateY(-6px); }
        }
        .bubble { animation: bubbleFloat 2.4s ease-in-out infinite; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease-out forwards; }

        @keyframes catFloat {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-5px); }
        }
        .cat-float { animation: catFloat 2s ease-in-out infinite; }

        @keyframes noticeIn {
          from { opacity: 0; transform: translateY(8px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .notice-in { animation: noticeIn 0.3s ease-out forwards; }
      `}</style>

      {/* ── NAVBAR ──────────────────────────────────────── */}
      <Header onNavigate={navigateTo} />

      <main className="pt-14">

        {/* ── HERO ──────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 min-h-[88vh] flex items-center">
          <div className="grid md:grid-cols-2 gap-30 items-center w-full pt-10 pb-18 ml-14">

            {/* Left */}
            <div className="fade-up">
              <p
                className="text-[9px] font-black uppercase tracking-[0.22em] ml-2 mb-3"
                style={{ color: "#B7A6FF" }}
              >
                Hi, I&apos;m
              </p>
              <h1
                className="text-[72px] md:text-[82px] font-extrabold leading-none text-gray-900 mb-1"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Molly
              </h1>
              <p className="text-base text-gray-400 font-medium ml-1 mb-1">Xinxi Zhong</p>
              <p className="text-sm font-bold ml-1 mb-6" style={{ color: "#7AA6FF" }}>
                CS @ Columbia University
              </p>
              <p className="text-sm font-bold ml-1 mb-2" style={{ color: "#fcc51f"}}>
                Software Engineer <span className="opacity-70 m-1">•</span> Video Editor
              </p>
              <p className="text-sm text-gray-600 leading-relaxed ml-1 mb-5 max-w-md">
                I enjoy turning ideas into polished, meaningful products that solve real problems.
              </p>

              {/* Currently card */}
              <div
                className="bg-white rounded-2xl p-4 mb-7 max-w-xs border shadow-sm"
                style={{ borderColor: "rgba(0,0,0,0.07)", width: "fit-content" }}
              >
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400 mb-2.5">Currently</p>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2"><span>💻</span> Leetcode grinding</div>
                  <div className="flex items-center gap-2"><span>🔨</span> Building personal projects (e.g. this website) </div>
                  <div className="flex items-center gap-2"><span>🎯</span> Seeking SWE internships</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="#"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gray-900 hover:bg-gray-800 hover:scale-105 transition-all duration-200"
                  onMouseEnter={resumeEnter}
                >
                  <Download className="w-3.5 h-3.5" /> Resume
                </a>
                {resumePaws}

                <button
                  onClick={() => navigateTo("/projects")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                  onMouseEnter={projEnter}
                >
                  View Projects <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {projPaws}
              </div>

              {/* Socials */}
              <div className="flex items-center gap-5 mt-5">
                {[
                  { href: "https://github.com/xzhongMM", icon: <Github className="w-4 h-4" />, label: "GitHub" },
                  { href: "https://linkedin.com/in/xinxi-zhong-25ba352a8", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
                  { href: "mailto:bingznnn@gmail.com",   icon: <Mail className="w-4 h-4" />,    label: "Email" },
                  { href: "https://www.rednote.com/user/profile/5fe11c24000000000101f3aa", icon: <img src="/imports/xhsLogo.jpg" alt="XHS" className="w-4 h-4 object-contain" />, label: "RedNote" },
                  { href: "https://www.douyin.com/user/MS4wLjABAAAAWzBEEdV77Vhg3GoFMzZRncHo-fkEBh5s6khEtONq3V8", icon: <img src="/imports/dyLogo.png" alt="Douyin" className="w-4.5 h-4.5 mb-0.5" />, label: "Douyin" },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-xs font-semibold transition-colors duration-200"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {icon}
                    <span className="hidden sm:inline">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Avatar */}
            <div className="flex justify-center">
              <div
                className="relative w-60 h-72 cursor-default"
                onMouseEnter={() => setAvatarHov(true)}
                onMouseLeave={() => setAvatarHov(false)}
              >
                <div
                  className="relative w-full h-full"
                  style={{
                    perspective: "1000px",
                  }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-500"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: avatarHov ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    <img
                      src="/imports/cameraPixel.png"
                      alt="Camera avatar"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ backfaceVisibility: "hidden" }}
                    />
                    <img
                      src="/imports/avatar.png"
                      alt="Molly avatar"
                      className="absolute inset-0 w-full h-full object-cover pb-5"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    />
                  </div>

                  <p 
                    className="text-[16px] text-shadow-md/20 font-bold flex items-center justify-center mt-1.5" 
                    style={{ fontFamily: "'Nunito', sans-serif" }}>
                      hover
                  </p>
                </div>

                {/* Floating word bubbles on hover */}
                {avatarHov && [
                  { label: "🐈 Cats",      left: "9%",  top: "12%",   delay: "0s"   },
                  { label: "🌏 Languages", left: "78%", top: "17%",  delay: "0.32s" },
                  { label: "🎬 Editing",   left: "-12%",  top: "42%",  delay: "0.13s" },
                  { label: "🍳 Cooking",   left: "87%", top: "50%",  delay: "0.58s" },
                  { label: "💻 Builder",   left: "8%",  top: "83%",  delay: "0.26s" },
                  { label: "🇹🇭 Thai",     left: "72%", top: "79%",  delay: "0.42s" },
                ].map(({ label, left, top, delay }) => (
                  <div
                    key={label}
                    className="absolute bubble pointer-events-none px-2.5 py-1 rounded-full bg-white border border-gray-200 shadow-sm whitespace-nowrap"
                    style={{
                      left,
                      top,
                      animationDelay: delay,
                      fontSize: "10px",
                      fontWeight: 600,
                    } as React.CSSProperties}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED PROJECTS ─────────────────────────── */}
        <section id="projects" className="pt-18 pb-14" style={{ background: "#F5F5F2" }}>
          <div className="max-w-5xl mx-auto px-6">
            <SectionLabel eyebrow="What I've built" heading="Featured Projects" />
            <div className="grid md:grid-cols-3 gap-4">
              {PROJECTS.slice(0, 3).map(p => <ProjectCard key={p.title} project={p} onNavigate={navigateTo} />)}
            </div>

            {/* Archive */}
            <div className="mt-10">
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Other Projects &#40;Yet to be added...&#41;</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {ARCHIVE.map(p => (
                  <div
                    key={p.title}
                    className="bg-white rounded-2xl p-4 border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    style={{ borderColor: "rgba(0,0,0,0.07)" }}
                  >
                    <p className="font-bold text-sm text-gray-800">{p.title}</p>
                    <p className="text-[10px] text-gray-400 mb-2">{p.sub}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.tech.map(t => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => navigateTo("/projects")}
                  className="px-4 pt-6 text-sm font-semibold text-gray-700 text-shadow-md/6 hover:text-shadow-md/8 hover:text-shadow-md hover:shadow-gray-350 hover:scale-105 underline decoration-[#7AA6FF]/80 transition-all duration-200"
                >
                  ᯓ See all projects
                </button>
              </div>
            </div>

            

          </div>
        </section>

        {/* ── EXPERIENCE ────────────────────────────────── */}
        <section id="experience" className="max-w-5xl mx-auto px-6 pt-16 pb-18">
          <SectionLabel eyebrow="Where I've been" heading="Experience" />
          <div className="space-y-4">
            {EXPERIENCE.map((exp, i) => (
              <div key={`${exp.org}-${exp.role}-${exp.period}`} className="flex gap-5">
                <div className="flex flex-col items-center pt-2 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full border-2 bg-white" style={{ borderColor: "#7AA6FF" }} />
                  {i < EXPERIENCE.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                </div>
                <div className="flex-1 pb-4">
                  <div
                    className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    style={{ borderColor: "rgba(0,0,0,0.07)" }}
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                      <div>
                        <p className="font-bold text-gray-800">{exp.org}</p>
                        <p className="text-xs text-gray-500">{exp.role}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-lg font-semibold">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.bullets.map(b => (
                        <li key={b} className="flex gap-2 text-xs text-gray-600">
                          <span className="shrink-0 mt-0.5" style={{ color: "#7FE3C5" }}>▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {exp.tech.map(t => (
                        <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SKILLS ────────────────────────────────────── */}
        <section id="skills" className="pt-16 pb-18" style={{ background: "#F5F5F2" }}>
          <div className="max-w-5xl mx-auto px-6">
            <SectionLabel eyebrow="Tools of the trade" heading="Skills" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
              {Object.entries(SKILLS_GROUPS).map(([cat, items]) => (
                <div
                  key={cat}
                  className="bg-white rounded-2xl p-5 border shadow-sm"
                  style={{ borderColor: "rgba(0,0,0,0.07)" }}
                >
                  <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-3">{cat}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map(s => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-50 border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200 cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Spoken languages */}
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Spoken Languages</p>
              <div className="flex flex-wrap gap-2">
                {SPOKEN.map(s => <LangCard key={s.code} {...s} />)}
              </div>
            </div>
          </div>
        </section>

        {/* ── BEYOND CODING ─────────────────────────────── */}
        <section id="beyond" className="max-w-5xl mx-auto px-6 pt-16 pb-18">
          <SectionLabel eyebrow="The rest of me" heading="Beyond Coding" />
          <p className="text-xs text-gray-400 mb-5 -mt-3">Hover the cards to flip →</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BEYOND.map(item => <FlipCard key={item.label} {...item} />)}
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────────────── */}
        <section
          id="contact"
          className="pt-14 pb-28"
          style={{ background: "linear-gradient(140deg, #F0EEFF 0%, #EEF5FF 45%, #E8FBF4 100%)" }}
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p
              className="text-[9px] font-black uppercase tracking-[0.22em] mb-2"
              style={{ color: "#B7A6FF" }}
            >
              Let&apos;s connect
            </p>
            <h2
              className="font-extrabold text-4xl md:text-5xl text-gray-900 mb-4"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Say hello.
            </h2>
            <p className="text-sm text-gray-500 max-w-xs mx-auto mb-10">
              Whether it&apos;s a role, a collaboration, or just a cool cat story - I&apos;d love to hear from you.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <ContactLink href="mailto:bingznnn@gmail.com"     icon={<Mail className="w-4 h-4" />}    label="Email" />
              <ContactLink href="https://linkedin.com/in/xinxi-zhong-25ba352a8" icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
              <ContactLink href="https://github.com/xzhongMM"  icon={<Github className="w-4 h-4" />}   label="GitHub" />
            </div>
            <div className="flex items-center justify-center gap-3 mt-7 flex-wrap">
              <ContactLink href="https://www.rednote.com/user/profile/5fe11c24000000000101f3aa" icon={<img src="/imports/xhsLogo.jpg" alt="XHS" className="w-5 h-5 object-contain" />} label="RedNote" />
              <ContactLink href="https://www.douyin.com/user/MS4wLjABAAAAWzBEEdV77Vhg3GoFMzZRncHo-fkEBh5s6khEtONq3V8" icon={<img  src="/imports/dyLogo.png" alt="Douyin" className="w-4.5 h-4.5 mb-0.5" />} label="Douyin" />
            </div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────── */}
        <footer className="py-6 text-center text-[11px] text-gray-400" style={{ background: "#FAFAF7" }}>
          Designed &amp; built with care by Molly 🐈
        </footer>

      </main>

      {/* ── HIDDEN CAT EASTER EGG ─────────────────────── */}
      {!catFound && (
        <button
          className="fixed cat-float text-2xl z-50 cursor-pointer hover:scale-125 transition-transform duration-200"
          style={{ right: "20px", bottom: "20px" }}
          onClick={foundCat}
          title="You found a cat!"
          aria-label="Hidden cat"
        >
          🐱
        </button>
      )}
      {catNotice && (
        <div
          className="fixed z-50 bg-white rounded-2xl px-5 py-4 shadow-2xl border border-gray-100 text-center notice-in"
          style={{ right: "20px", bottom: "72px" }}
        >
          <p className="text-3xl mb-1">🐈</p>
          <p className="font-bold text-sm text-gray-800">You found a cat!</p>
          <p className="text-[10px] text-gray-400 mt-0.5">A hidden friend on every visit.</p>
        </div>
      )}
    </div>
  );
}
