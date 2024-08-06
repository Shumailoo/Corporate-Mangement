import { Box } from "@mantine/core";
import styles from "./styles.module.css";
import { useNavigate,useLocation } from "react-router-dom";
import { IconManFilled, IconRocket } from "@tabler/icons-react";
import { Fragment } from "react";

function AppSideBar() {
    const location=useLocation();
    const navigate=useNavigate();
    const links = [
        {
            label: "Employees",
            key: "employees",
            path: "/employees",
            children: [
                { label: "Manage Employees", to: "/employees" },
                // { label: "Add Employee", to: "/employees/add-employee" },
            ],
        },
        {
            label: "Projects",
            key: "projects",
            path: "/projects",
            children: [
                { label: "Manage Projects", to: "/projects" },
                // { label: "Add Project", to: "/projects/add-project" },
            ],
        },
    ];

    return (
        <>
            {links.map((link)=>{
                return(
                    <>
                        <Box fz={"xl"} mt={20} pl={15} py={8} key={link.key}
                        className={`${styles.button} ${styles.heading} ${
                            location.pathname.startsWith(link.path) ? `${styles.active}` : ""}`}
                        >
                            {link.key === "employees" ? (
                                    <IconManFilled style={{verticalAlign:"middle",marginRight:"4px"}} size="1rem" stroke={1.5} />
                                ) : (
                                    <IconRocket style={{verticalAlign:"middle",marginRight:"4px"}} size="1rem" stroke={1.5} />
                                )
                            }
                            {link.label}
                        </Box>
                        {link.children.map((child,index)=>{
                            // console.log(link.key, child.label, index);
                            return(
                                <Fragment key={`${link.key}-${child.label}-${index}`}>
                                <Box py={7} fz={"md"} mt={15} pl={35}
                                onClick={()=>{
                                    navigate(`${child.to}`)}}
                                    className={`${location.pathname === child.to ? styles.active : ""}`}
                                    >
                                    {child.label}
                                </Box>
                                </Fragment>
                            );
                        })}
                    </>
                );
            })}
        </>
    );
}

export default AppSideBar;