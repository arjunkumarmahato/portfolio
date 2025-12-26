"use client";

import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FooterWrapper = styled.footer<{ $hidden: boolean }>`
  background-color: var(--satin-linen);
  padding: 1rem; /* Base Mobile Padding */
  display: ${(props) => (props.$hidden ? "none" : "block")};
  color: var(--noir-black);
  
  @media (min-width: 769px) {
    padding: 2rem; /* Desktop Padding */
  }
`;

const FooterContainer = styled.div`
  margin: 0 auto;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Mobile: Single Column */
  grid-template-rows: auto auto;
  gap: 1rem;
  min-height: 400px;
  
  @media (min-width: 901px) {
    grid-template-columns: 2.5fr 1fr; /* Desktop: Split */
    grid-template-rows: 1fr;
  }
`;

// Base Bento Box Style - LIGHT THEME
const BentoBox = styled.div`
  background-color: transparent;
  color: var(--noir-black);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

// 1. Main CTA Block
const MainBlock = styled(BentoBox)`
  cursor: pointer;
  text-decoration: none;
  
  &:hover h2 {
    transform: scale(1.02);
  }
`;

const CtaLabel = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.9rem; /* Mobile Standard */
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.5;
  margin-bottom: 2rem;
  display: block;
`;

const BigText = styled.h2`
  font-family: "Monoska", sans-serif;
  font-size: 3rem; /* Mobile: Scaled down */
  text-transform: uppercase;
  line-height: 0.85;
  margin: 0;
  color: var(--noir-black);
  transition: transform 0.4s ease;
  
  @media (min-width: 901px) { font-size: 8vw; } /* Desktop: Massive */
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
  padding-top: 2rem; /* Mobile Padding */
  text-transform: uppercase;
  
  @media (min-width: 601px) {
    padding-top: 4rem; /* Desktop Padding */
  }
`;

const EmailLink = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.9rem; /* Mobile Standard */
  padding-bottom: 0.2rem;
  font-weight: 500;
  
  @media (min-width: 769px) {
    font-size: 1.1rem;
  }
`;

// 2. Social Links Block
const LinksBlock = styled(BentoBox)`
  gap: 1.5rem;
  
  a {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem; /* Mobile Standard */
    text-transform: uppercase;
    color: var(--noir-black);
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.8rem;
    padding-top: 0.8rem;
    
    &:hover {
      padding-left: 1rem;
      opacity: 0.6;
    }
    
    span {
      font-size: 0.9rem; /* Mobile Standard */
      opacity: 0.4;
    }
    
    transition: all 0.2s;
    
    @media (min-width: 769px) {
      font-size: 1rem;
      span { font-size: 1rem; }
    }
  }
`;

const Copyright = styled.div`
  margin-top: auto;
  font-family: "Inter", sans-serif;
  font-size: 0.9rem; /* Mobile Standard */
  opacity: 0.4;
  text-transform: uppercase;
`;

export default function Footer() {
  const pathname = usePathname();
  const isContact = pathname === "/contact";

  return (
    <FooterWrapper $hidden={isContact}>
      <FooterContainer>
        <BentoGrid>
          {/* 1. Main Call to Action */}
          <MainBlock as={Link} href="/contact">
            <div>
              <CtaLabel>Start a Project</CtaLabel>
              <BigText>Let's<br />Collaborate</BigText>
            </div>
            <ActionRow>
              <EmailLink>Get in Touch &rarr;</EmailLink>
            </ActionRow>
          </MainBlock>

          {/* 2. Social Links */}
          <LinksBlock>
            <div>
              <CtaLabel>Connect</CtaLabel>
              <div style={{ marginTop: '2rem' }}>
                <a href="https://linkedin.com/in/arjunkumarmahato" target="_blank">LinkedIn <span>↗</span></a>
                <a href="https://github.com/arjunkumarmahato" target="_blank">GitHub <span>↗</span></a>
                <a href="https://codeforces.com/profile/Shanks_" target="_blank">Codeforces <span>↗</span></a>
              </div>
            </div>

            <Copyright>
              &copy; 2025 Arjun Mahato
            </Copyright>
          </LinksBlock>

        </BentoGrid>
      </FooterContainer>
    </FooterWrapper>
  );
}
