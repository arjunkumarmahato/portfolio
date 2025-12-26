"use client";

import styled from "styled-components";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/work/ProjectCard";

const PageContainer = styled.main`
  min-height: 100vh;
  background-color: var(--satin-linen);
  padding: 8rem 1.5rem 4rem;
  color: var(--noir-black);
  
  @media (min-width: 769px) {
    padding: 10rem 2rem 4rem;
  }
`;

const WorkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10rem;
  width: 100%;
  margin: 0 auto;
`;

export default function WorkPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Reveal animations removed
  }, []);

  return (
    <PageContainer ref={containerRef}>
      <WorkList>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </WorkList>
    </PageContainer>
  );
}
