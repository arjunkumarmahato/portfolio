"use client";

import styled from "styled-components";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const TickerSection = styled.section`
  width: 100%;
  padding: 4rem 0;
  background-color: var(--satin-linen);
  overflow: hidden;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0,0,0,0.05);
  border-bottom: 1px solid rgba(0,0,0,0.05);
`;

const TickerTrack = styled.div`
  display: flex;
  white-space: nowrap;
  /* Will be animated by GSAP */
`;

const TickerItem = styled.div`
  font-family: "Monoska", sans-serif;
  font-size: 4rem;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1px var(--noir-black); /* Outline style */
  opacity: 0.3;
  padding-right: 2rem;
  font-weight: 400;
  
  display: flex;
  align-items: center;
  gap: 2rem;

  span.filled {
      color: var(--tuscan-red);
      -webkit-text-stroke: 0;
      font-family: "Inter", sans-serif; /* Mix font for visual interest */
      font-weight: 800;
      font-size: 1rem;
      letter-spacing: 0.2rem;
      transform: translateY(-50%);
  }
`;

export default function Ticker() {
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;

            // Calculate width for seamless loop
            // We need to clone contents enough to fill screen + buffer
            // For now, simple approach: just animate x percent

            const width = track.scrollWidth;

            // Infinite Loop
            // We assume the track has 2 identical sets of children to loop seamlessly
            // Actually, simplest way with GSAP horizontalLoop helper, but writing custom here:

            gsap.to(track, {
                x: "-50%", // Move half way (assuming content is doubled)
                duration: 20,
                ease: "none",
                repeat: -1
            });

        }, trackRef);
        return () => ctx.revert();
    }, []);

    const words = ["Design", "Development", "Experience", "Engineering", "Creative", "Strategy"];

    return (
        <TickerSection>
            <TickerTrack ref={trackRef}>
                {/* Double content for loop */}
                {[...words, ...words, ...words, ...words].map((word, i) => (
                    <TickerItem key={i}>
                        {word} <span className="filled">•</span>
                    </TickerItem>
                ))}
            </TickerTrack>
        </TickerSection>
    );
}
