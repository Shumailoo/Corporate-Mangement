import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@mantine/core/styles.css";
import { EmployeeProvider } from "./context/employeeContext";
import { ProjectProvider } from "./context/projectContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <EmployeeProvider>
            <ProjectProvider>
                <App />
            </ProjectProvider>
        </EmployeeProvider>
    </React.StrictMode>
);
