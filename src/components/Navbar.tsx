"use client";

import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLoader } from "@/context/LoaderContext";

const NavWrapper = styled.nav<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.8rem; /* Mobile Compact Padding */
  
  /* Mobile First: Stack Layout */
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  background-color: rgba(232, 235, 228, 0.9);
  backdrop-filter: blur(10px);
  
  z-index: 100;
  color: var(--base-100);
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
  transition: opacity 0.5s ease;

  /* Desktop Override */
  @media (min-width: 769px) {
    padding: 2rem;
    grid-template-columns: 1fr auto 1fr;
    gap: 0;
    background-color: transparent;
    backdrop-filter: none;
  }
`;

const Logo = styled.div`
  font-family: "Monoska", sans-serif;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: bold;
  justify-self: center; /* Mobile: Center */
  
  img {
    filter: brightness(0);
  }

  @media (min-width: 769px) {
    justify-self: start; /* Desktop: Start */
  }
`;

const NavLinks = styled.div`
  display: flex;
  background-color: transparent;
  padding: 0;
  border: none;
  gap: 0.5rem; /* Reduced Gap for 360px */
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 769px) {
    gap: 1rem;
    background-color: var(--satin-linen);
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,0.05);
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`;

const NavSeparator = styled.span`
  opacity: 0.3;
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  user-select: none;
`;

const NavLink = styled(Link) <{ $active: boolean }>`
  text-transform: uppercase;
  font-family: "Inter", sans-serif;
  font-size: 0.8rem; /* Mobile Size */
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--base-100);
  text-decoration: none;
  position: relative;
  padding: 0.2rem 0.4rem;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.$active ? 1 : 0.6)};

  &:hover {
    opacity: 1;
  }

  /* The 4-Corner Active Indicator */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: ${(props) => (props.$active ? 1 : 0)};
    transition: opacity 0.3s ease;
    
    background: 
      linear-gradient(var(--tuscan-red), var(--tuscan-red)) 0 0 / 1px 6px no-repeat,
      linear-gradient(var(--tuscan-red), var(--tuscan-red)) 0 0 / 6px 1px no-repeat,
      linear-gradient(var(--tuscan-red), var(--tuscan-red)) 100% 0 / 1px 6px no-repeat,
      linear-gradient(var(--tuscan-red), var(--tuscan-red)) 100% 0 / 6px 1px no-repeat,
      linear-gradient(var(--tuscan-red), var(--tuscan-red)) 0 100% / 1px 6px no-repeat,
      linear-gradient(var(--tuscan-red), var(--tuscan-red)) 0 100% / 6px 1px no-repeat,
      linear-gradient(var(--tuscan-red), var(--tuscan-red)) 100% 100% / 1px 6px no-repeat,
      linear-gradient(var(--tuscan-red), var(--tuscan-red)) 100% 100% / 6px 1px no-repeat;
  }

  @media (min-width: 769px) {
    font-size: 0.9rem;
    padding: 0.3rem 0.6rem;
  }
`;

export default function Navbar() {
  const pathname = usePathname();
  const { hasLoaded } = useLoader();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname === "/" && !hasLoaded) {
      setVisible(false);
      const handleReveal = () => setVisible(true);
      window.addEventListener("reveal-navbar", handleReveal);
      return () => window.removeEventListener("reveal-navbar", handleReveal);
    } else {
      setVisible(true);
    }
  }, [pathname, hasLoaded]);

  const navItems = [
    { name: "About", path: "/about" },
    { name: "Work", path: "/work" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <NavWrapper $visible={visible}>
      <Logo>
        <Link href="/">
          <Image src="/logos/A.svg" alt="Arjun" width={40} height={40} />
        </Link>
      </Logo>
      <NavLinks>
        {navItems.map((item, index) => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <NavLink
              href={item.path}
              $active={pathname === item.path}
            >
              {item.name}
            </NavLink>
            {index < navItems.length - 1 && <NavSeparator>/</NavSeparator>}
          </div>
        ))}
      </NavLinks>
    </NavWrapper>
  );
}
