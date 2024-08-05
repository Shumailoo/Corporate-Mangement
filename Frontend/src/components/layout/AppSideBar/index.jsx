// import { Group, Text, Button, Flex } from "@mantine/core";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";

// const AppSideBar = () => {
//     const [active, setActive] = useState("employees");
//     const navigate = useNavigate();

//     const links = [
//         { label: "Employees", key: "employees", path: "/employees" },
//         { label: "Others", key: "Others", path: "/add-employee" },
//     ];

//     const handleNavigation = (key, path) => {
//         setActive(key);
//         navigate(path);
//     };

//     return (
//         <>
//             <Flex direction={"column"} align={"center"} justify={"center"} style={{ borderBottom:"1px solid #ececec"}} pb={20}  mt={50}>
//                 <img src="/src/assets/logo4.png" alt="Logo" style={{ height: 80 }} />
//                 <Text weight={700} size="xl">
//                     Brand Name
//                 </Text>
//             </Flex>
//             <Group mt={20} direction="column" align="center" justify="center" spacing={5}>
//                 {links.map((link) => (
//                     <Button
//                         className={styles.button}
//                         key={link.key}
//                         onClick={() => handleNavigation(link.key, link.path)}
//                         style={{
//                             display: "block",
//                             width: "50%",
//                             borderRadius: 5,
//                             marginBottom: 5,
//                             backgroundColor: active === link.key ? "#f8f9fa" : "transparent",
//                         }}
//                     >
//                         <Text
//                             style={{
//                                 color: active === link.key ? "#fa5252" : "#000",
//                                 fontWeight: active === link.key ? "bold" : "normal",
//                             }}
//                         >
//                             {link.label}
//                         </Text>
//                     </Button>
//                 ))}
//             </Group>
//         </>
//     );
// };

// export default AppSideBar;

// import { Group, Text, Button } from "@mantine/core";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";

// const AppSideBar = () => {
//     const [active, setActive] = useState("employees");
//     const navigate = useNavigate();

//     const links = [
//         { label: "Employees", key: "employees", path: "/employees" },
//         { label: "Others", key: "Others", path: "/add-employee" },
//     ];

//     const handleNavigation = (key, path) => {
//         setActive(key);
//         navigate(path);
//     };

//     useEffect(()=>{

//     },[active])

//     return (
//         <>
//             <Group mt={20} direction="column" align="center" justify="center" spacing={5}>
//                 {links.map(link => (
//                     <Button className={`${styles.button} ${active === link.key ? styles.active : ""}`} key={`${link.key}-${active}`} onClick={() => handleNavigation(link.key, link.path)}>
//                         <Text>{link.label}</Text>
//                     </Button>
//                 ))}
//             </Group>
//         </>
//     );
// };

// export default AppSideBar;

import { NavLink } from "@mantine/core";
import { IconManFilled, IconRocket } from "@tabler/icons-react";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";

function AppSideBar() {
    const location = useLocation();
    const links = [
        {
            label: "Employees",
            key: "employees",
            path: "/employees",
            children: [
                { label: "Manage Employees", href: "/employees" },
                { label: "Add Employee", href: "/employees/add-employee" },
            ],
        },
        {
            label: "Projects",
            key: "projects",
            path: "/projects",
            children: [
                { label: "Manage Projects", href: "/projects" },
                { label: "Add Project", href: "/projects/add-project" },
            ],
        },
    ];

    return (
        <>
            {links.map((link) => (
                <NavLink
                    key={link.key}
                    mb={10}
                    // fz={"lg"}
                    href={link.path}
                    label={link.label}
                    leftSection={
                        link.key === "employees" ? (
                            <IconManFilled size="1rem" stroke={1.5} />
                        ) : (
                            <IconRocket size="1rem" stroke={1.5} />
                        )
                    }
                    childrenOffset={0}
                    defaultOpened
                    className={`${styles.button} ${styles.heading} ${
                        location.pathname.startsWith(link.path) ? `${styles.active} ${styles.hyper}` : ""
                    }`}
                    >
                    {link.children.map((child) => (
                        <NavLink
                            // fz={"sm"}
                            label={child.label}
                            mb={10}
                            key={child.label}
                            pl={28}
                            href={child.href}
                            className={`${styles.button} ${
                                location.pathname === child.href ? styles.active : ""
                            }`}
                        />
                    ))}
                </NavLink>
            ))}
        </>
    );
}

export default AppSideBar;