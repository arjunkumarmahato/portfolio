"use client";

import styled from "styled-components";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: var(--satin-linen);
  padding: 4rem 0; /* Full width */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const FoldersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  perspective: 1000px;
  padding-bottom: 2rem; 
`;

const Row = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  
  /* Overlap Logic for 3 Rows - Tight Gap (Aggressive) */
  &:nth-child(1) { bottom: -22rem; z-index: 1; }
  &:nth-child(2) { bottom: -11rem; z-index: 2; }
  &:nth-child(3) { bottom: 0rem; z-index: 3; }
  
  @media (max-width: 1000px) {
    flex-direction: column;
    bottom: auto !important;
    gap: 5rem; /* Space between items in the same row */
    margin-bottom: 5rem; /* Space between rows */
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Folder = styled.div<{ $variant: 'v1' | 'v2' | 'v3'; $flex?: number }>`
  position: relative;
  flex: ${props => props.$flex || 1}; 
  height: 300px; 
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  @media (max-width: 1000px) {
    width: 100%;
    /* Maintain height or allow auto? Fixed height is good for stacking */
    height: 180px; 
  }

  &.disabled {
    pointer-events: none;
    .folder-content {
       background-color: #e8ebe4;
       h1 { color: #b0b3ad; } 
    }
    .folder-tab {
       background-color: #e8ebe4;
       p { color: #b0b3ad; } 
    }
    .folder-tab::after {
       background-color: #e8ebe4;
    }
  }

  /* Variant Colors */
  --folder-bg: ${props =>
    props.$variant === 'v1' ? 'var(--tuscan-red)' :
      props.$variant === 'v2' ? 'var(--pale-blue)' :
        'var(--noir-black)'};
    
  --folder-fg: ${props =>
    props.$variant === 'v1' ? 'var(--satin-linen)' :
      props.$variant === 'v2' ? 'var(--noir-black)' :
        'var(--satin-linen)'};

  &:hover {
    z-index: 10;
  }
`;

const FolderPreview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding-left:2rem;
  width: 100%; 
  height: 100%;
  pointer-events: none;
  z-index: -1;
  
  /* Visible on mobile now */
  @media (max-width: 1000px) {
    display: block;
    top: -50px; /* Shift up to peek behind */
    z-index: -1;
  }
`;

const PreviewImage = styled.div`
  position: absolute;
  top: 50%; 
  width: 6rem;
  height: 6rem;
  background: #fff;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  opacity: 0; 
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* Mobile: Visible by default */
  @media (max-width: 1000px) {
    opacity: 1;
    width: 4rem;
    height: 4rem;
  }
`;

const FolderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  transform-origin: bottom center;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const FolderTab = styled.div`
  position: relative;
  width: 40%;
  height: 2rem;
  background-color: var(--folder-bg);
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  transform: translateY(2px);
  
  p {
    font-size: 0.8rem;
    color: var(--folder-fg);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 99%;
    height: 100%;
    aspect-ratio: 1;
    background-color: var(--folder-bg);
    clip-path: polygon(0 0, 25% 0, 100% 100%, 0% 100%);
    transition: background-color 0.3s;
  }
`;

const FolderContent = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  background-color: var(--folder-bg);
  display: flex;
  align-items: flex-start;
  padding: 1rem 2rem;
  transition: background-color 0.3s;
  border-top-right-radius: 8px;
  
  h1 {
    font-size: 2.25rem;
    font-weight: 400;
    color: var(--folder-fg);
    text-transform: uppercase;
    margin: 0;

    @media (max-width: 1000px) {
        font-size: 1.5rem;
    }
  }
`;

export default function FolderGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const folders = document.querySelectorAll<HTMLElement>(".folder-item");
    const wrappers = document.querySelectorAll<HTMLElement>(".folder-wrapper");

    // Only init GSAP if NOT mobile (mobile has CSS-based static layout)
    if (window.innerWidth < 1000) return;

    const ctx = gsap.context(() => {
      gsap.set(wrappers, { y: 25 });

      folders.forEach((folder) => {
        const wrapper = folder.querySelector(".folder-wrapper");
        const previews = folder.querySelectorAll(".preview-img");

        folder.addEventListener("mouseenter", () => {
          const isMobile = window.innerWidth < 1000;
          if (isMobile) return;

          folders.forEach(f => {
            if (f !== folder) f.classList.add("disabled");
          });

          // Ensure clean start
          gsap.killTweensOf(previews);

          gsap.to(wrapper, {
            y: 0,
            duration: 0.25,
            ease: "back.out(1.7)",
            overwrite: true
          });

          // Dynamic Fan-Out Logic
          const totalImages = previews.length;

          previews.forEach((img, i) => {
            // Spread rotations from -25 to +25 degrees centered
            const spread = 50;
            const start = -spread / 2;
            const step = spread / (totalImages - 1 || 1);
            const rotation = totalImages === 1 ? 0 : start + (step * i);

            // Random jitter
            const jitter = gsap.utils.random(-5, 5);

            gsap.to(img, {
              y: "-225%", // Push up much higher to clear the folder
              x: gsap.utils.random(-10, 10), // Slight horizontal jitter
              rotation: rotation + jitter,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(1.2)",
              delay: i * 0.05,
              overwrite: true
            });
          });
        });

        folder.addEventListener("mouseleave", () => {
          const isMobile = window.innerWidth < 1000;
          if (isMobile) return;

          folders.forEach(f => f.classList.remove("disabled"));

          // Kill entering tweens immediately
          gsap.killTweensOf(previews);

          gsap.to(wrapper, {
            y: 25,
            duration: 0.25,
            ease: "back.out(1.7)",
            overwrite: true
          });

          previews.forEach((img, i) => {
            gsap.to(img, {
              y: "0%", // Reset to original center position
              x: 0,
              rotation: 0,
              duration: 0.25,
              ease: "power2.in",
              delay: (previews.length - 1 - i) * 0.03, // Reverse stagger for solid drop
              overwrite: true
            });
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Image Data
  const programmingImages = [
    "/images/programming_languages/c.png",
    "/images/programming_languages/cpp.png",
    "/images/programming_languages/python.png",
    "/images/programming_languages/js.png",
    "/images/programming_languages/ts.png",
    // "/images/programming_languages/go.png",
  ];

  const dbImages = [
    "/images/databases/mongodb.png",
    "/images/databases/postgresql.png",
    "/images/databases/mysql.png",
  ];

  const mlImages = [
    "/images/machine_learning/numpy.png",
    "/images/machine_learning/pandas.png",
    "/images/machine_learning/matplotlib.png",
    "/images/machine_learning/scikit_learn.png",
  ];

  const dataImages = [
    "/images/data_analysis/excel.png",
    "/images/data_analysis/power_bi.png",
  ];

  const frontendImages = [
    "/images/frontend_development/html5.png",
    "/images/frontend_development/css3.png",
    "/images/frontend_development/reactjs.png",
    "/images/frontend_development/nextjs.png",
  ];

  const backendImages = [
    "/images/backend_development/expressjs.png",
    // "/images/backend_development/nestjs.png",
    "/images/backend_development/git.png",
    "/images/backend_development/github.png",
    "/images/backend_development/docker.png",
    "/images/backend_development/kubernetes.png",
  ];

  // 3 Rows x 2 Columns Data - Variable Widths
  const row1 = [
    { id: "01", name: "Programming Languages", variant: "v1", flex: 1.3, images: programmingImages },
    { id: "02", name: "Databases", variant: "v2", flex: 0.7, images: dbImages },
  ];
  const row2 = [
    { id: "03", name: "Machine Learning", variant: "v2", flex: 0.8, images: mlImages },
    { id: "04", name: "Data Analysis", variant: "v3", flex: 1.2, images: dataImages },
  ];
  const row3 = [
    { id: "05", name: "Frontend Development", variant: "v1", flex: 1.1, images: frontendImages },
    { id: "06", name: "Backend Development", variant: "v2", flex: 0.9, images: backendImages }
  ];

  return (
    <Section ref={containerRef}>
      <FoldersContainer>
        {/* ROW 1 */}
        <Row className="row">
          {row1.map(item => (
            <FolderItem key={item.id} item={item} />
          ))}
        </Row>

        {/* ROW 2 */}
        <Row className="row">
          {row2.map(item => (
            <FolderItem key={item.id} item={item} />
          ))}
        </Row>

        {/* ROW 3 */}
        <Row className="row">
          {row3.map(item => (
            <FolderItem key={item.id} item={item} />
          ))}
        </Row>
      </FoldersContainer>
    </Section>
  );
}

function FolderItem({ item, className }: { item: any, className?: string }) {

  return (
    <Folder $variant={item.variant} $flex={item.flex} className={`folder-item ${className || ''}`}>
      <FolderPreview>
        {item.images.map((src: string, i: number) => {
          // Fixed distance stacking (independent of folder width)
          // Center the stack at 50%
          const total = item.images.length;
          const overlap = 80; // Increased spacing
          const centerOffset = (i - (total - 1) / 2) * overlap;

          return (
            <PreviewImage
              key={i}
              className="preview-img"
              style={{
                left: `calc(50% + ${centerOffset}px)`,
                zIndex: i, // Ensure distinct stacking order
                transform: `translateX(-50%) rotate(${i % 2 === 0 ? -5 : 5}deg) translateY(-30%)`, /* Mobile: Static Jitter */
              }}
            >
              <Image src={src} alt="" fill style={{ objectFit: 'contain', padding: '10px' }} />
            </PreviewImage>
          )
        })}
      </FolderPreview>

      <FolderWrapper className="folder-wrapper">
        <FolderTab className="folder-tab">
          <p>{item.id}</p>
        </FolderTab>
        <FolderContent className="folder-content">
          <h1>{item.name}</h1>
        </FolderContent>
      </FolderWrapper>
    </Folder>
  )
}
