import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import data from "@/data/dataEmployee.json";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState(() => {
        const storedEmployees = localStorage.getItem("employees");
        return storedEmployees ? JSON.parse(storedEmployees) : data.employees;
    });

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    return <EmployeeContext.Provider value={{ employees, setEmployees }}>{children}</EmployeeContext.Provider>;
};

EmployeeProvider.propTypes={
    children: PropTypes.node.isRequired
}

export default EmployeeContext;
