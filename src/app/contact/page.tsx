"use client";

import styled from "styled-components";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const PageContainer = styled.main`
  min-height: 100vh; /* Full screen height */
  background-color: var(--satin-linen);
  color: var(--noir-black);
  padding: 6rem 1.5rem; /* Mobile Padding */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  @media (min-width: 769px) {
    padding: 8rem 2rem; /* Desktop Padding */
  }
`;

const StatusBadge = styled.div`
// ... existing styles ...
  border: 1px solid var(--noir-black);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  opacity: 1; /* Fixed visibility */

  span {
    font-family: "Inter", sans-serif;
    font-size: 0.85rem;
    text-transform: uppercase;
    font-weight: 500;
  }

  /* Pulse Dot */
  &::before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background-color: var(--tuscan-red);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
  }
`;

const IntroText = styled.h2`
// ... existing styles ...
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  max-width: 600px;
  margin-bottom: 4rem;
  line-height: 1.5;
  opacity: 1; /* Fixed visibility */
`;

const BigLink = styled.a`
  display: block;
  font-family: "Monoska", sans-serif;
  font-size: 8vw; /* Mobile Responsive: Fits long email addresses */
  font-weight: 800;
  color: var(--noir-black);
  text-decoration: none;
  line-height: 1.1;
  letter-spacing: -0.04em;
  transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
  margin-bottom: 1.5rem; /* Space between email and phone */
  opacity: 1; /* Fixed visibility */
  word-break: break-all; /* Ensure it breaks if absolutely needed */
  
  &:hover {
    color: var(--tuscan-red);
    transform: scale(1.02);
  }

  @media (min-width: 769px) {
     font-size: clamp(2.5rem, 6vw, 5rem);
  }
`;

const SocialRow = styled.div`
  display: flex;
  flex-direction: column; /* Mobile: Column */
  gap: 1rem; /* Mobile Gap */
  margin-top: 3rem;
  
  a {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem;
    text-transform: uppercase;
    color: var(--noir-black);
    text-decoration: none;
    opacity: 0.5;
    transition: all 0.3s ease;
    letter-spacing: 0.05em;
    font-weight: 500;
    
    &:hover {
      opacity: 1;
      color: var(--tuscan-red);
      transform: translateY(-2px);
    }
  }

  @media (min-width: 601px) {
    flex-direction: row; /* Desktop: Row */
    gap: 2rem;
  }
`;

import { socials, contactInfo } from "@/data/socials";

// ...

export default function ContactPage() {
  const containerRef = useRef(null);

  useEffect(() => { }, []);

  return (
    <PageContainer ref={containerRef}>

      <StatusBadge className="badge">
        <span>Available for work</span>
      </StatusBadge>

      <IntroText className="intro">
        Drop me a line for a PROJECT or a JOB OPPORTUNITY.
      </IntroText>

      <BigLink href={`mailto:${contactInfo.email}`} className="link">
        {contactInfo.email}
      </BigLink>

      <BigLink href={`tel:${contactInfo.rawPhone}`} className="sub">
        {contactInfo.phone}
      </BigLink>

      <SocialRow className="sub">
        {socials.map((s) => (
          <a key={s.platform} href={s.url} target="_blank">
            {s.platform} ↗
          </a>
        ))}
      </SocialRow>

    </PageContainer>
  );
}
