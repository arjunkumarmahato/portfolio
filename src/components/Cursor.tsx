"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference; /* Ensures visibility on light/dark backgrounds */
  
  @media (hover: none) and (pointer: coarse) {
    display: none; /* Hide on touch devices */
  }
`;

const InnerDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: var(--tuscan-red);
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`;

const OuterRing = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid var(--tuscan-red);
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  opacity: 0.6;
  transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
  
  &.hovered {
    width: 80px;
    height: 80px;
    background-color: rgba(169, 27, 24, 0.1); /* Subtle red tint */
    border-color: transparent;
  }
`;

export default function Cursor() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const outerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Only run on client
        if (typeof window === "undefined") return;

        // Check if device is touch - return early if so
        if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

        const inner = innerRef.current;
        const outer = outerRef.current;

        // Initial position off-screen
        gsap.set(inner, { xPercent: -50, yPercent: -50 });
        gsap.set(outer, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            // Inner dot follows instantly
            gsap.to(inner, {
                x: e.clientX,
                y: e.clientY,
                duration: 0,
            });

            // Outer ring follows with slight delay (organic lag)
            gsap.to(outer, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power2.out",
            });
        };

        const handleHoverStart = () => setIsHovered(true);
        const handleHoverEnd = () => setIsHovered(false);

        window.addEventListener("mousemove", moveCursor);

        // Add listeners to interactive elements
        const addListeners = () => {
            const interactiveElements = document.querySelectorAll("a, button, input, textarea, .interactive");
            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", handleHoverStart);
                el.addEventListener("mouseleave", handleHoverEnd);
            });
        };

        // Need to re-add listeners on route change or DOM updates
        addListeners();

        // MutationObserver to handle dynamic content (client-side rendering)
        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            observer.disconnect();

            const interactiveElements = document.querySelectorAll("a, button, input, textarea, .interactive");
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleHoverStart);
                el.removeEventListener("mouseleave", handleHoverEnd);
            });
        };
    }, [pathname]); // Re-run on route change to ensures listeners attach to new page elements

    return (
        <CursorWrapper>
            <OuterRing ref={outerRef} className={isHovered ? "hovered" : ""} />
            <InnerDot ref={innerRef} />
        </CursorWrapper>
    );
}
