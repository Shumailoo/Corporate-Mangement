import { Box } from "@mantine/core";
import styles from "./styles.module.css";
import { useNavigate,useLocation } from "react-router-dom";
import { IconManFilled, IconRocket, IconUserCircle } from "@tabler/icons-react";
import { Fragment } from "react";

function AppSideBar() {
    const location=useLocation();
    const navigate=useNavigate();
    const links = [
        {
            label: "Employees",
            key: "employees",
            path: "/employees",
            check:"/employees",
            children: [
                { label: "Manage Employees", to: "/employees" },
                // { label: "Add Employee", to: "/employees/add-employee" },
            ],
        },
        {
            label: "Projects",
            key: "projects",
            path: "/projects",
            check:"/projects",
            children: [
                { label: "Manage Projects", to: "/projects" },
                // { label: "Add Project", to: "/projects/add-project" },
            ],
        },
        {
            label: "User Profile",
            key: "profile",
            path: "/user/settings",
            check:"/user",
            children: [
                // { label: "Manage Projects", to: "/projects" },
                // { label: "Add Project", to: "/projects/add-project" },
            ],
        },
    ];

    return (
        <>
            {links.map((link)=>{
                return(
                    <Fragment key={link.key}>
                        <Box fz={"xl"} mt={20} pl={15} py={8} key={link.key}
                        onClick={()=>(navigate(`${link.path}`))}
                        className={`${styles.button} ${
                            location.pathname.startsWith(link.check) ? `${styles.active}` : ""}`}
                        >
                            {link.key === "employees" ? (
                                    <IconManFilled style={{verticalAlign:"middle",marginRight:"4px"}} size="1.7rem" stroke={1.5} />
                                ) : (
                                    link.key==="projects"?(
                                    <IconRocket style={{verticalAlign:"middle",marginRight:"4px"}} size="1.7rem" stroke={1.5} />
                                    ):(
                                        <IconUserCircle style={{verticalAlign:"middle",marginRight:"4px"}} size="1.7rem" stroke={1.5} />
                                    )
                                )
                            }
                            {link.label}
                        </Box>
                        {/* {link.children.map((child,index)=>{
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
                        })} */}
                    </Fragment>
                );
            })}
        </>
    );
}

export default AppSideBar;