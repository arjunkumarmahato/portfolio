"use client";

import React from "react";
import styled from "styled-components";

const Item = styled.div`
  margin-bottom: 2rem;
  &:last-child { margin-bottom: 0; }
`;

const ItemHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0.2rem;
  gap: 0;

  h4 {
    font-family: "Inter", sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--noir-black);
    
    @media (min-width: 769px) {
      font-size: 1.2rem;
    }
  }

  span {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem;
    color: var(--noir-black);
    font-weight: 500;
    text-align: left;
    opacity: 0.7;

    @media (min-width: 601px) {
      font-size: 1rem;
      text-align: right;
      opacity: 1;
    }
    
    a {
      text-decoration: none;
      color: inherit;
      &:hover { text-decoration: underline; }
    }
  }

  @media (min-width: 601px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
`;

const ItemSubRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0;

  h5 {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem;
    font-weight: 400; 
    color: var(--noir-black);
    margin: 0;
    
    @media (min-width: 769px) {
      font-size: 1rem;
    }
  }
  
  span {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem;
    color: var(--noir-black);
    opacity: 0.7;
    font-variant-numeric: tabular-nums;
    
    @media (min-width: 769px) {
      font-size: 1rem;
    }
  }

  @media (min-width: 601px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
  }
`;

const ItemList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  
  li {
    font-family: "Inter", sans-serif;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 0.25rem;
    color: var(--noir-black);
    
    @media (min-width: 769px) {
      font-size: 1rem;
    }
  }
`;

interface ResumeItemProps {
  title: string;
  subTitle?: string;
  date?: string;
  location?: React.ReactNode;
  points?: string[];
  children?: React.ReactNode;
}

export default function ResumeItem({ title, subTitle, date, location, points, children }: ResumeItemProps) {
  return (
    <Item>
      <ItemHeader>
        <h4>{title}</h4>
        {location && <span>{location}</span>}
      </ItemHeader>

      {(subTitle || date) && (
        <ItemSubRow>
          {subTitle && <h5>{subTitle}</h5>}
          {date && <span>{date}</span>}
        </ItemSubRow>
      )}

      {points && points.length > 0 && (
        <ItemList>
          {points.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ItemList>
      )}

      {children && (
        <ItemList>
          {children}
        </ItemList>
      )}
    </Item>
  );
}
