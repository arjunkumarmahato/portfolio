export interface Project {
    id: string;
    title: string;
    tech: string[];
    image?: string;
    links: {
        live: string;
        github: string;
    };
}

export const projects: Project[] = [
    {
        id: "nexis",
        title: "Nexis",
        tech: ["Next.js", "Node.js", "Express.js", "TypeScript", "LangChain", "OpenAI", "Socket.io", "Docker", "Tailwind CSS"],
        image: "/images/projects/nexis.png",
        links: { live: "", github: "" }
    },
    {
        id: "remix",
        title: "Remix",
        tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Mongoose"],
        links: { live: "", github: "https://github.com/arjunkumarmahato/remix" }
    },
    {
        id: "fraud",
        title: "Credit Card Fraud Detection",
        tech: ["Python", "Scikit-Learn", "Pandas"],
        links: { live: "", github: "" }
    },
    {
        id: "employee",
        title: "Data Analysis on Employee Data",
        tech: ["MySQL", "Tableu"],
        links: { live: "", github: "" }
    }
];
