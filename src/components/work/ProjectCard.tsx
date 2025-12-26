"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: var(--satin-linen);
  overflow: hidden;
  position: relative;
  border-radius: 4px;
`;

const LetterPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--noir-black);
  display: flex;
  justify-content: center;
  align-items: center;
  
  span {
    font-family: "Monoska", sans-serif;
    font-size: 25vw;
    color: var(--satin-linen);
    line-height: 1;
    text-transform: uppercase;
    opacity: 0.9;
  }
`;

const ProjectInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: flex-start;
  padding-top: 1rem;
  border-top: 1px solid rgba(0,0,0,0.1);
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const LeftInfo = styled.div`
  h2 {
    font-family: "Inter", sans-serif;
    font-size: 2rem; 
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
    color: var(--noir-black);
    line-height: 1;
    
    @media (min-width: 769px) {
      font-size: 3rem; 
    }
  }
  
  .tech {
     display: flex;
     flex-wrap: wrap;
     gap: 0.5rem;
     margin-top: 1rem;
     
     span {
    font-family: var(--font-geist-mono); 
    font-weight: 500;
    font-size: 0.8rem; 
    padding: 0.25rem 0.5rem;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 20px;
    opacity: 0.7;
    letter-spacing: -0.02em;
  }
  }
`;

const RightInfo = styled.div`
  p {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem; 
    line-height: 1.6;
    opacity: 0.8;
    margin: 0;
    
    @media (min-width: 769px) {
      font-size: 1.1rem;
    }
  }
  
  .links {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    
    a {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem; 
    text-transform: uppercase;
    color: var(--tuscan-red);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
    font-weight: 600;
    
    &:hover {
      border-bottom: 1px solid var(--tuscan-red);
    }
  }
    }
  }
`;

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <Card className="project-card">
            <ImageContainer>
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <LetterPlaceholder>
                        <span>{project.title.charAt(0)}</span>
                    </LetterPlaceholder>
                )}
            </ImageContainer>

            <ProjectInfo>
                <LeftInfo>
                    <h2>{project.title}</h2>
                    <div className="tech">
                        {project.tech.map(t => <span key={t}>{t}</span>)}
                    </div>
                </LeftInfo>
                <RightInfo>
                    <div className="links">
                        {project.links.live && <Link href={project.links.live} target="_blank">Live Demo</Link>}
                        {project.links.github && <Link href={project.links.github} target="_blank">Source Code</Link>}
                    </div>
                </RightInfo>
            </ProjectInfo>
        </Card>
    );
}
