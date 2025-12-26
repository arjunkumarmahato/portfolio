"use client";

import styled from "styled-components";
import { useEffect, useRef } from "react";
import { contactInfo } from "@/data/socials";
import { experience, education, skills, certifications, competitiveProgramming } from "@/data/resume";
import ResumeItem from "@/components/resume/ResumeItem";

const PageContainer = styled.main`
  min-height: 100vh;
  background-color: var(--satin-linen);
  color: var(--noir-black);

  @media (min-width: 769px) {
     padding: 10rem 2rem 4rem; /* Desktop: More breathability */
  }
`;

const ResumeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

// --- HEADER ROW ---
const HeaderRow = styled.div`
  display: flex;
  flex-direction: column; /* Mobile: Stacked */
  gap: 1.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding-bottom: 2rem;
  margin-bottom: 3rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 769px) {
    flex-direction: row; /* Desktop: Row */
    justify-content: space-between;
    align-items: flex-start;
    gap: 0;
  }
`;

const NameBox = styled.div`
  h1 {
    font-family: "Inter", sans-serif;
    font-size: 3rem; /* Mobile Standard */
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.1;
    color: var(--noir-black);
    margin-bottom: 0.5rem;
    
    @media (min-width: 769px) {
      font-size: 3.25rem;
    }
  }
`;

const ContactBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Mobile: Left Align */
  text-align: left;

  p {
    font-family: "Inter", sans-serif;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 0.25rem;
    color: var(--noir-black);
    
    a {
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }
  }

  @media (min-width: 769px) {
    align-items: flex-end; /* Desktop: Right Align */
    text-align: right;
  }
`;

// --- MAIN CONTENT ROW ---
const ContentRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  margin: 0 auto;
`;

// --- SECTION BLOCKS ---
const SectionBlock = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--noir-black);
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Item = styled.div`
  margin-bottom: 2rem;
  
  &:last-child { margin-bottom: 0; }
`;

const ItemHeader = styled.div`
  display: flex;
  flex-direction: column; /* Mobile: Stacked */
  align-items: flex-start;
  margin-bottom: 0.2rem;
  gap: 0;

  h4 {
    font-family: "Inter", sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--noir-black);
    
    @media (min-width: 769px) {
      font-size: 1.2rem;
    }
  }

  /* Location */
  span {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem; /* Mobile Standard */
    color: var(--noir-black);
    font-weight: 500;
    text-align: left; /* Mobile: Left */
    opacity: 0.7;

    @media (min-width: 601px) {
      font-size: 1rem; /* Desktop Standard */
      text-align: right;
      opacity: 1;
    }
  }

  @media (min-width: 601px) {
    flex-direction: row; /* Desktop: Row */
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
`;

const ItemSubRow = styled.div`
  display: flex;
  flex-direction: column; /* Mobile: Stacked */
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0;

  /* Role */
  h5 {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem; /* Mobile Standard */
    font-weight: 400; 
    color: var(--noir-black);
    margin: 0;
    
    @media (min-width: 769px) {
      font-size: 1rem; /* Desktop Standard */
    }
  }
  
  /* Duration */
  span {
    font-family: "Inter", sans-serif; /* Reverted to Inter */
    font-size: 0.9rem; /* Mobile Standard */
    color: var(--noir-black);
    opacity: 0.7;
    font-variant-numeric: tabular-nums;
    
    @media (min-width: 769px) {
      font-size: 1rem; /* Desktop Standard */
    }
  }

  @media (min-width: 601px) {
    flex-direction: row; /* Desktop: Row */
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
  }
`;

const ItemList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  
  li {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem; /* Mobile Standard */
    line-height: 1.5;
    margin-bottom: 0.25rem;
    color: var(--noir-black);
    
    @media (min-width: 769px) {
      font-size: 1rem; /* Desktop Standard */
    }
  }
`;

const SkillRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  
  strong {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem; /* Mobile Standard */
    font-weight: 600;
    margin-bottom: 0.25rem;
    display: block;
    color: var(--noir-black);
    
    @media (min-width: 769px) {
      font-size: 1rem; /* Desktop Standard */
    }
  }
  
  p {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem; /* Mobile Standard */
    line-height: 1.4;
    color: var(--noir-black);
    
    @media (min-width: 769px) {
      font-size: 1rem; /* Desktop Standard */
    }
  }
`;

const DownloadButton = styled.a`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: var(--noir-black);
  color: var(--satin-linen);
  padding: 0.8rem 2rem;
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  border-radius: 50px; /* Pill shape */
  border: 1px solid transparent;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15); /* Soft shadow */
  transition: all 0.3s ease;
  z-index: 100;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    background-color: var(--tuscan-red); /* Accent focus on hover */
    box-shadow: 0 8px 25px rgba(169, 27, 24, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default function ResumePage() {
  const containerRef = useRef(null);

  /* Animation Removed */
  useEffect(() => {
    // Reveal animations removed as per request
  }, []);

  return (
    <PageContainer ref={containerRef}>

      <ResumeGrid>

        {/* HEADER */}
        <HeaderRow className="grid-reveal">
          <NameBox>
            <h1>Arjun Kumar Mahato</h1>
          </NameBox>
          <ContactBox>
            <p><a href={`tel:${contactInfo.rawPhone}`}>{contactInfo.phone}</a></p>
            <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
            <p><a href="https://linkedin.com/in/arjunkumarmahato" target="_blank">linkedin.com/in/arjunkumarmahato</a></p>
            <p><a href="https://github.com/arjunkumarmahato" target="_blank">github.com/arjunkumarmahato</a></p>
          </ContactBox>
        </HeaderRow>

        {/* CONTENT */}
        <ContentRow>

          <SectionBlock className="grid-reveal">
            <h3>Experience</h3>

            <Item>
              <ItemHeader>
                <h4>Bharat Electronics Limited</h4>
                <span>Panchkula, Haryana, India</span>
              </ItemHeader>
              <ItemSubRow>
                <h5>Deputy Engineer (Development & Engineering)</h5>
                <span>July 2025 – Present</span>
              </ItemSubRow>
              <ItemList>
                <li>Designed different mechanical parts for various electronic devices.</li>
                <li>Collaborated with cross-functional teams to carry out mechanical testing of various electronic devices.</li>
              </ItemList>
            </Item>

            <Item>
              <ItemHeader>
                <h4>Ripples</h4>
                <span>Remote</span>
              </ItemHeader>
              <ItemSubRow>
                <h5>Software Development Intern</h5>
                <span>August 2024 – October 2024</span>
              </ItemSubRow>
              <ItemList>
                <li>Developed a responsive User Portal UI using React and Tailwind CSS enhancing user experience.</li>
                <li>Built scalable RESTful APIs and Backend Analytics Services with Express, TypeScript, PostgreSQL and Prisma
                  supporting high user traffic and enabling efficient data management.</li>
              </ItemList>
            </Item>

            <Item>
              <ItemHeader>
                <h4>My Analytics School</h4>
                <span>Remote</span>
              </ItemHeader>
              <ItemSubRow>
                <h5>Data Analysis Intern</h5>
                <span>June 2024 – July 2024</span>
              </ItemSubRow>
              <ItemList>
                <li>Conducted comprehensive data analysis including SWOT and SAM calculation to identify growth opportunities for
                  My Analytics School in the Recruitment Test domain.</li>
              </ItemList>
            </Item>
          </SectionBlock>

          <SectionBlock className="grid-reveal">
            <h3>Projects</h3>

            <Item>
              <ItemHeader>
                <h4>Nexis</h4>
              </ItemHeader>
              <ItemList>
                <li><b>Description:</b> Unified search platform combining multi-modal search and AI-powered responses.</li>
                <li><b>Tools and Technologies:</b> Next.js, Node.js, Express.js, TypeScript, LangChain, OpenAI, Socket.io, Docker, Tailwind CSS.</li>
                <li>Built a multi-modal search engine supporting text, image, and video search from multiple sources in a single
                  interface.</li>
                <li>Designed LLM-powered agents using LangChain for intelligent query understanding and context-aware response
                  generation.</li>
                <li>Implemented real-time AI response streaming using WebSockets (Socket.io) for interactive user experience.</li>
                <li>Dockerized the application for scalable, production-ready deployment.</li>
              </ItemList>
            </Item>

            <Item>
              <ItemHeader>
                <h4>Remix</h4>
              </ItemHeader>
              <ItemList>
                <li><b>Description:</b> A social media platform in which users can interact using posts and comments.</li>
                <li><b>Tools and Technologies:</b> React.js, Tailwind CSS, Node.js, Express.js, MongoDB, Mongoose.</li>
                <li>Implemented core features such as user profiles, follow/unfollow users, posts, comments, like, notifications.</li>
                <li>Created adaptive user interfaces using React.js and Tailwind CSS, ensuring cross-device compatibility.</li>
                <li>Architected the back-end using Model View Controller (MVC) architecture with Express.js, MongoDB and Mongoose, ensuring maintainability.</li>
              </ItemList>
            </Item>

            <Item>
              <ItemHeader>
                <h4>Credit Card Fraud Detection</h4>
              </ItemHeader>
              <ItemList>
                <li>Visualized and pre-processed a highly imbalanced dataset using Python, focusing on Exploratory Data Analysis.</li>
                <li>Built Machine Learning models using Logistic Regression, SVM, and K-Nearest Neighbors, and optimized parameters
                  using grid search, achieving a classification recall of up to 93%.</li>
                <li>Compared model performance based on F1 scores and Confusion Matrix, and evaluated models using ROC curves,
                  concluding Logistic Regression as the best classifier.</li>
              </ItemList>
            </Item>

            <Item>
              <ItemHeader>
                <h4>Data Analysis on Employee Data</h4>
              </ItemHeader>
              <ItemList>
                <li>Analyzed employee data using MySQLWorkbench and created an interactive Tableau dashboard for KPI insights,
                  including salary, employee counts, gender ratio, and span of control.</li>
                <li><b>Insight:</b> From 1990 to 2002 percentage of female employees remained almost same. So HR team should increase
                  women’s inclusion with different strategies.</li>
              </ItemList>
            </Item>
          </SectionBlock>

          <SectionBlock className="grid-reveal">
            <h3>Skills</h3>
            <SkillRow>
              <strong>Languages</strong>
              <p>C/C++, JavaScript, TypeScript, Python, SQL</p>
            </SkillRow>
            <SkillRow>
              <strong>Front-End Development</strong>
              <p>HTML5, CSS3, SASS, Tailwind CSS, React.js, Next.js Styled-Components, Redux, GSAP</p>
            </SkillRow>
            <SkillRow>
              <strong>Back-End Development</strong>
              <p>Node.js, Express.js</p>
            </SkillRow>
            <SkillRow>
              <strong>Databases</strong>
              <p>MongoDB, MySQL</p>
            </SkillRow>
            <SkillRow>
              <strong>Version Control Systems</strong>
              <p>Git and GitHub</p>
            </SkillRow>
            <SkillRow>
              <strong>Tools and Technologies</strong>
              <p>Docker, Kubernetes, Postman</p>
            </SkillRow>
            <SkillRow>
              <strong>Machine Learning</strong>
              <p>Numpy, Pandas, Matplotlib, Seaborn, Scikit-learn</p>
            </SkillRow>
            <SkillRow>
              <strong>Data Analysis</strong>
              <p>MS Excel, PowerBI, Tableau</p>
            </SkillRow>
            <SkillRow>
              <strong>Concepts</strong>
              <p>Statistics, Probability, Linear Algebra, Calculus, Machine Learning, Data Structures and Algorithms (DSA),
                Object Oriented Programming (OOP), Operating System (OS), Database Management System (DBMS)</p>
            </SkillRow>
            <SkillRow>
              <strong>Languages</strong>
              <p>Hindi (Native), English (ProfessionalWorking Proficiency), Bengali (LimitedWorking Proficiency)</p>
            </SkillRow>
          </SectionBlock>

          <SectionBlock className="grid-reveal">
            <h3>Education</h3>
            <Item>
              <ItemHeader>
                <h4>Indian Institute of Technology (Indian School of Mines) Dhanbad</h4>
                <span>Dhanbad, Jharkhand, India</span>
              </ItemHeader>
              <ItemSubRow>
                <h5>Bachelor of Technology in Mechanical Engineering (CGPA : 7.30/10.00)</h5>
                <span>November 2021 – May 2025</span>
              </ItemSubRow>
            </Item>

            <Item>
              <ItemHeader>
                <h4>Jawahar Navodaya Vidyalaya Bangalore Urban</h4>
                <span>Bangalore, Karnataka, India</span>
              </ItemHeader>
              <ItemSubRow>
                <h5>Intermediate in Science (Percentage : 92.6%)</h5>
                <span>June 2018 –April 2020</span>
              </ItemSubRow>
            </Item>
          </SectionBlock>

          <SectionBlock className="grid-reveal">
            <h3>Competitive Programming</h3>
            <Item>
              <ItemList>
                <li>Expert on Codeforces : Shanks_ (Max. Rating: 1796)</li>
              </ItemList>
            </Item>
          </SectionBlock>

          <SectionBlock className="grid-reveal">
            <h3>Certifications</h3>
            <Item>
              <ItemHeader>
                <h4>Machine Learning Specialization Certificate</h4>
                <span><a href="#" target="_blank" style={{ color: 'var(--noir-black)', textDecoration: 'none' }}>Certificate</a></span>
              </ItemHeader>
              <ItemSubRow>
                <h5>DeepLearning.AI, Stanford University</h5>
              </ItemSubRow>
            </Item>
          </SectionBlock>

        </ContentRow>

      </ResumeGrid>

    </PageContainer>
  );
}
