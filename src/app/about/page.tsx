"use client";

import styled from "styled-components";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PageContainer = styled.main`
  min-height: 100vh;
  background-color: var(--satin-linen);
  color: var(--noir-black);
  padding: 8rem 1.5rem 4rem; /* Mobile: Safe area */
  
  @media (min-width: 769px) {
    padding: 10rem 2rem 4rem; /* Desktop: Breathing room */
  }
`;

// --- HERO SECTION ---
const HeroSection = styled.section`
  margin-bottom: 6rem;
  padding-bottom: 4rem;
`;

const IntroText = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0;
  line-height: 1.4;
`;

// --- LAYOUT UTILS ---
const Section = styled.section`
  display: flex; /* Changed from grid to flex column */
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 8rem;
`;

const Label = styled.div`
  h2 {
    font-family: var(--font-geist-mono); /* Small Monospace */
    font-size: 0.85rem; /* Adjusted for Mono */
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 1; 
    margin: 0;
    color: var(--tuscan-red); 
  }
`;

// ... (Content/Item/NameTop/RowBottom) ...

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 Column */
  gap: 0;
  border-top: 1px solid var(--noir-black);
  border-left: 1px solid var(--noir-black);
  
  @media (min-width: 901px) {
    grid-template-columns: 1fr 1fr; /* Desktop: 2 Columns */
  }
`;

const Item = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  border-right: 1px solid var(--noir-black);
  border-bottom: 1px solid var(--noir-black);
  transition: all 0.3s ease;
  aspect-ratio: 1 / 1; 
  background-color: transparent;

  &:hover {
    background-color: var(--tuscan-red); 
    color: var(--satin-linen);

    h3, div, strong, span {
      color: var(--satin-linen);
      opacity: 1;
    }
  }
`;

const NameTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  text-transform: uppercase;

  h3 {
    font-family: "Inter", sans-serif;
    font-size: 1.1rem; /* Standard Item Title */
    margin: 0;
    font-weight: 500;
    color: var(--noir-black);
    transition: color 0.3s ease;
    
    @media (min-width: 769px) {
      font-size: 1.25rem;
    }
  }
  
  span {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem; /* Standard Body */
    opacity: 0.6;
    margin-top: 0.2rem;
    transition: color 0.3s ease;
  }
`;

const RowBottom = styled.div`
  display: flex;
  flex-direction: column; /* Mobile: Column */
  gap: 0.5rem;
  align-items: flex-start;
  width: 100%;
  font-family: "Inter", sans-serif;
  font-size: 0.9rem; /* Standard Body */
  text-transform: uppercase;
  opacity: 0.8;
  
  strong {
     font-weight: 600;
     color: var(--noir-black);
     transition: color 0.3s ease;
     font-size: 0.9rem;
  }
  
  span {
    font-family: var(--font-geist-mono); /* Small Monospace */
    font-variant-numeric: tabular-nums;
    opacity: 0.6;
    text-align: right;
    transition: color 0.3s ease;
    font-size: 0.8rem; /* Adjusted for Mono */
    letter-spacing: -0.02em;
  }

  @media (min-width: 601px) {
    flex-direction: row; /* Desktop: Row */
    justify-content: space-between;
    align-items: baseline;
    gap: 0;
  }
`;

// ...

// ... in default export ...
// Removed TimelineVisual markup

// --- PAGE COMPONENT ---
export default function AboutPage() {
  const containerRef = useRef(null);

  /* Animation Removed */
  useEffect(() => {
    // Reveal animations removed
  }, []);

  return (
    <PageContainer ref={containerRef}>

      {/* EXPERIENCE */}
      <Section>
        <Label>
          <h2>01 / Experience</h2>
        </Label>
        <Content>

          <Item className="reveal-item">
            <NameTop>
              <h3>Bharat Electronics Limited</h3>
              <span>Panchkula, Haryana, India</span>
            </NameTop>
            <RowBottom>
              <strong>Deputy Engineer (Development and Engineering)</strong>
              <span>July 2025 – Present</span>
            </RowBottom>
          </Item>

          <Item className="reveal-item">
            <NameTop>
              <h3>Ripples</h3>
              <span>Remote</span>
            </NameTop>
            <RowBottom>
              <strong>Software Development Intern</strong>
              <span>Aug 2024 – Oct 2024</span>
            </RowBottom>
          </Item>

          <Item className="reveal-item">
            <NameTop>
              <h3>My Analytics School</h3>
              <span>Remote</span>
            </NameTop>
            <RowBottom>
              <strong>Data Analysis Intern</strong>
              <span>June 2024 – July 2024</span>
            </RowBottom>
          </Item>

        </Content>
      </Section>

      {/* EDUCATION */}
      <Section>
        <Label>
          <h2>02 / Education</h2>
        </Label>
        <Content>
          <Item className="reveal-item">
            <NameTop>
              <h3>Indian Institute of Technology (Indian School of Mines) Dhanbad</h3>
              <span>Dhanbad, Jharkhand, India</span>
            </NameTop>
            <RowBottom>
              <strong>Bachelor of Technology in Mechanical Engineering</strong>
              <span>Nov 2021 – May 2025</span>
            </RowBottom>
          </Item>

          <Item className="reveal-item">
            <NameTop>
              <h3>Jawahar Navodaya Vidyalaya Bangalore Urban</h3>
              <span>Bangalore, Karnataka, India</span>
            </NameTop>
            <RowBottom>
              <strong>Intermediate in Science</strong>
              <span>June 2018 – April 2020</span>
            </RowBottom>
          </Item>
        </Content>
      </Section>

    </PageContainer>
  );
}
