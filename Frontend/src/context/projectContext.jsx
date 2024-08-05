import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import data from "@/data/dataProject.json";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState(() => {
        const storedProjects = localStorage.getItem("projects");
        return storedProjects ? JSON.parse(storedProjects) : data.projects;
    });
    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    return <ProjectContext.Provider value={{ projects, setProjects }}>{children}</ProjectContext.Provider>;
};

ProjectProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProjectContext;
