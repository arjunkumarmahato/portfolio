"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--satin-linen);
  color: var(--noir-black);
  will-change: opacity;
  z-index: 9999;
`;

const Counter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--tuscan-red); /* Accent Color */
`;

const CounterText = styled.p`
  text-transform: uppercase;
  font-weight: 500;
  font-family: "Monoska", sans-serif;
  font-size: 15vw; /* Mobile Responsive */
  
  @media (min-width: 769px) {
    font-size: 132px; /* Desktop Fixed */
  }
`;

const StyledSVG = styled.svg`
  width: 100%; /* Mobile: Full Width */
  height: 100%;

  path {
    fill: none;
  }

  .orbit-text {
    fill: var(--noir-black);
    text-transform: uppercase;
    font-size: 3rem; /* Mobile Size */
    font-weight: 500;
  }

  /* Desktop Override */
  @media (min-width: 1001px) {
    width: 85%;
    height: 85%;

    .orbit-text {
      font-size: 2.75rem;
    }
  }
`;

interface LoaderProps {
    onComplete?: () => void;
    onReveal?: () => void;
}

export default function Loader({ onComplete, onReveal }: LoaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterTextRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Setup Initial State
            const orbitTextElements = document.querySelectorAll(".orbit-text");
            gsap.set(orbitTextElements, { opacity: 0 });

            // 1. Text Path Animations
            const textPaths = document.querySelectorAll<SVGTextPathElement>(
                ".loader svg textPath"
            );
            const startTextLengths = Array.from(textPaths).map((tp) =>
                parseFloat(tp.getAttribute("textLength") || "0")
            );
            const startTextOffsets = Array.from(textPaths).map((tp) =>
                parseFloat(tp.getAttribute("startOffset") || "0")
            );

            const targetTextLengths = [
                4000, 3500, 3250, 3000, 2500, 2000, 1500, 1250,
            ];
            const orbitRadii = [775, 700, 625, 550, 475, 400, 325, 250];
            const maxOrbitRadius = orbitRadii[0];
            const maxAnimDuration = 1.25;
            const minAnimDuration = 1;

            textPaths.forEach((textPath, index) => {
                const animationDelay = (textPaths.length - 1 - index) * 0.1;
                const currentOrbitRadius = orbitRadii[index];
                const currentDuration =
                    minAnimDuration +
                    (currentOrbitRadius / maxOrbitRadius) *
                    (maxAnimDuration - minAnimDuration);

                const pathLength = 2 * Math.PI * currentOrbitRadius * 3;
                const textLengthIncrease =
                    targetTextLengths[index] - startTextLengths[index];
                const offsetAdjustment = (textLengthIncrease / 2 / pathLength) * 100;
                const targetOffset = startTextOffsets[index] - offsetAdjustment;

                gsap.to(textPath, {
                    attr: {
                        textLength: targetTextLengths[index],
                        startOffset: targetOffset + "%",
                    },
                    duration: currentDuration,
                    delay: animationDelay,
                    ease: "power2.inOut",
                    yoyo: true,
                    repeat: -1,
                    repeatDelay: 0,
                });
            });

            // 2. Rotation
            let loaderRotation = 0;
            function animateRotation() {
                const spinDirection = Math.random() < 0.5 ? 1 : -1;
                loaderRotation += 25 * spinDirection;
                gsap.to("svg", {
                    rotation: loaderRotation,
                    duration: 2,
                    ease: "power2.inOut",
                    onComplete: animateRotation,
                });
            }
            animateRotation();

            // 3. Counter Animation
            const count = { value: 0 };
            gsap.to(count, {
                value: 100,
                duration: 4,
                delay: 1,
                ease: "power1.out",
                onUpdate: () => {
                    if (counterTextRef.current) {
                        counterTextRef.current.textContent =
                            Math.floor(count.value) + "%";
                    }
                },
                onComplete: () => {
                    gsap.to(".counter", { opacity: 0, duration: 0.5, delay: 1 });
                },
            });

            // 4. Reveal Text
            const orbitTextsReversed = Array.from(orbitTextElements).reverse();
            gsap.to(orbitTextsReversed, {
                opacity: 1,
                duration: 0.75,
                stagger: 0.125,
                ease: "power1.out",
            });

            // 5. Exit Animation
            gsap.to(orbitTextsReversed, {
                opacity: 0,
                duration: 0.75,
                stagger: 0.1,
                delay: 6,
                ease: "power1.out",
                onComplete: function () {
                    // Dispatch event for Navbar to pick up
                    if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("reveal-navbar"));
                    }

                    if (onReveal) onReveal();
                    gsap.to(containerRef.current, {
                        opacity: 0,
                        duration: 1,
                        onComplete: () => {
                            if (onComplete) onComplete();
                        },
                    });
                },
            });
        }, containerRef); // Scope to container

        return () => ctx.revert();
    }, [onComplete, onReveal]);

    return (
        <LoaderWrapper ref={containerRef} className="loader">
            <StyledSVG viewBox="-425 -425 1850 1850" xmlns="http://www.w3.org/2000/svg">
                <path
                    id="loader-orbit-1"
                    d="M 500,-275 A 775,775 0 0,1 500,1275 A 775,775 0 0,1 500,-275 A 775,775 0 0,1 500,1275 A 775,775 0 0,1 500,-275 A 775,775 0 0,1 500,1275 A 775,775 0 0,1 499.99,-275"
                />

                <path
                    id="loader-orbit-2"
                    d="M 500,-200 A 700,700 0 0,1 500,1200 A 700,700 0 0,1 500,-200 A 700,700 0 0,1 500,1200 A 700,700 0 0,1 500,-200 A 700,700 0 0,1 500,1200 A 700,700 0 0,1 499.99,-200"
                />

                <path
                    id="loader-orbit-3"
                    d="M 500,-125 A 625,625 0 0,1 500,1125 A 625,625 0 0,1 500,-125 A 625,625 0 0,1 500,1125 A 625,625 0 0,1 500,-125 A 625,625 0 0,1 500,1125 A 625,625 0 0,1 499.99,-125"
                />

                <path
                    id="loader-orbit-4"
                    d="M 500,-50 A 550,550 0 0,1 500,1050 A 550,550 0 0,1 500,-50 A 550,550 0 0,1 500,1050 A 550,550 0 0,1 500,-50 A 550,550 0 0,1 500,1050 A 550,550 0 0,1 499.99,-50"
                />

                <path
                    id="loader-orbit-5"
                    d="M 500,25 A 475,475 0 0,1 500,975 A 475,475 0 0,1 500,25 A 475,475 0 0,1 500,975 A 475,475 0 0,1 500,25 A 475,475 0 0,1 500,975 A 475,475 0 0,1 499.99,25"
                />

                {/* <path
                    id="loader-orbit-6"
                    d="M 500,100 A 400,400 0 0,1 500,900 A 400,400 0 0,1 500,100 A 400,400 0 0,1 500,900 A 400,400 0 0,1 500,100 A 400,400 0 0,1 500,900 A 400,400 0 0,1 499.99,100"
                />

                <path
                    id="loader-orbit-7"
                    d="M 500,175 A 325,325 0 0,1 500,825 A 325,325 0 0,1 500,175 A 325,325 0 0,1 500,825 A 325,325 0 0,1 500,175 A 325,325 0 0,1 500,825 A 325,325 0 0,1 499.99,175"
                />

                <path
                    id="loader-orbit-8"
                    d="M 500,250 A 250,250 0 0,1 500,750 A 250,250 0 0,1 500,250 A 250,250 0 0,1 500,750 A 250,250 0 0,1 500,250 A 250,250 0 0,1 500,750 A 250,250 0 0,1 499.99,250"
                /> */}

                <text className="orbit-text">
                    <textPath href="#loader-orbit-1" startOffset="30%" textLength="512">
                        MACHINE LEARNING
                    </textPath>
                </text>

                <text className="orbit-text">
                    <textPath href="#loader-orbit-2" startOffset="31%" textLength="416">
                        DATA ANALYSIS
                    </textPath>
                </text>

                <text className="orbit-text">
                    <textPath href="#loader-orbit-3" startOffset="33%" textLength="640">
                        FRONTEND DEVELOPMENT
                    </textPath>
                </text>

                <text className="orbit-text">
                    <textPath href="#loader-orbit-4" startOffset="32%" textLength="608">
                        BACKEND DEVELOPMENT
                    </textPath>
                </text>

                <text className="orbit-text">
                    <textPath href="#loader-orbit-5" startOffset="30%" textLength="384">
                        ARJUN MAHATO
                    </textPath>
                </text>

                {/* <text className="orbit-text">
                    <textPath href="#loader-orbit-6" startOffset="31%" textLength="200">

                    </textPath>
                </text>

                <text className="orbit-text">
                    <textPath href="#loader-orbit-7" startOffset="33%" textLength="210">

                    </textPath>
                </text>

                <text className="orbit-text">
                    <textPath href="#loader-orbit-8" startOffset="32%" textLength="190">

                    </textPath>
                </text> */}
            </StyledSVG>
            <Counter className="counter">
                <CounterText ref={counterTextRef}>0%</CounterText>
            </Counter>
        </LoaderWrapper>
    );
}
