"use client";

import styled from "styled-components";
import { useRef, forwardRef, useImperativeHandle, useState, useEffect } from "react";
import gsap from "gsap";

const HomeSection = styled.section`
  position: relative;
  width: 100%;
  height: 100svh;
  overflow: hidden;
  background-color: var(--satin-linen);
  color: var(--noir-black);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Middle Structural Elements
const MiddleContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  /* Removed padding to let Divider be full width */
`;

const Keywords = styled.div`
  display: flex;
  flex-direction: row; /* Mobile: Row */
  justify-content: space-between;
  align-items: center;
  gap: 0;
  width: 100%;
  margin: 0 auto;
  margin-top: 1rem;
  padding: 0 1.5rem; /* Mobile: 1.5rem padding */
  margin-bottom: 0; /* Removed bottom margin */
  
  span {
    font-family: var(--font-geist-mono); /* Small Monospace */
    font-size: 0.8rem; /* Adjusted for Mono */
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.8;
  }
  
  /* Desktop Override */
  @media (min-width: 769px) {
    padding: 0 2rem; /* Desktop: 2rem padding */
    align-items: flex-start;
  }
`;



const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--noir-black);
  opacity: 0.15;
`;

// Bottom Massive Name
const BottomName = styled.h1`
  position: absolute;
  bottom: 5vh; /* Safe bottom spacing */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  font-family: "Monoska", sans-serif;
  font-size: 12vw; /* Mobile: 12vw fits nicely */
  font-weight: 400; /* Ensure not bold */
  line-height: 1;
  color: var(--tuscan-red);
  text-transform: uppercase;
  z-index: 1;
  white-space: nowrap;
  pointer-events: none;

  @media (min-width: 769px) {
    font-size: 13vw; /* Desktop Giant */
  }
`;

export interface HomeHandle {
  reveal: () => void;
}

const Home = forwardRef<HomeHandle>((_, ref) => {
  const [time, setTime] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    reveal: () => {
      // Content visible
    },
  }));

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  /* Animation Removed */
  useEffect(() => {
    // Reveal animations removed
  }, []);

  return (
    <HomeSection className="home" ref={containerRef}>

      <MiddleContainer>
        <Divider className="divider-line" />
        <Keywords>
          <span className="keyword-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            India
          </span>
          {/* <div className="keyword-item" style={{ display: 'flex', gap: '2rem' }}>
            <span>Design</span>
            <span>&rarr;</span>
            <span>Develop</span>
            <span>&rarr;</span>
            <span>Experience</span>
          </div> */}
          <span className="keyword-item">{time} IST</span>
        </Keywords>
      </MiddleContainer>

      <BottomName className="name-char">
        Arjun Mahato
      </BottomName>

    </HomeSection>
  );
});

Home.displayName = "Home";

export default Home;
