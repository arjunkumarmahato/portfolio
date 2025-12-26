"use client";

import styled from "styled-components";
import { useRef, useState } from "react";
import gsap from "gsap";
import Loader from "@/components/Loader";
import Home, { HomeHandle } from "@/components/Home";
import Ticker from "@/components/Ticker";
import FolderGallery from "@/components/FolderGallery";
import { CustomEase } from "gsap/all";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
}

const StyledPage = styled.div`
  background-color: var(--base-300);
  min-height: 100vh;
`;

import { useLoader } from "@/context/LoaderContext";

// ...

export default function HomePage() {
  const { hasLoaded, setHasLoaded } = useLoader();
  const homeRef = useRef<HomeHandle>(null);

  const handleReveal = () => {
    if (homeRef.current) {
      homeRef.current.reveal();
    }
  };

  const handleLoaderComplete = () => {
    setHasLoaded(true);
  };

  // If already loaded, we don't show loader.
  // But we might need to "reveal" the home components immediately? 
  // Actually Home components are static now (per previous request). 
  // So no reveal needed if no loader.

  return (
    <StyledPage>
      {!hasLoaded && (
        <Loader onReveal={handleReveal} onComplete={handleLoaderComplete} />
      )}
      <Home ref={homeRef} />
      <FolderGallery />
    </StyledPage>
  );
}
