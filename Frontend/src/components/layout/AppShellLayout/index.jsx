import { memo } from "react";
import { AppShell, AppShellHeader, AppShellMain, AppShellNavbar, Box, Burger } from "@mantine/core";
import AppHeader from "@/components/layout/AppHeader";
import AppSideBar from "@/components/layout/AppSideBar";
import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

const AppShellLayout = memo(() => {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShellHeader bg={"gray.1"}>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <AppHeader />
            </AppShellHeader>
            <AppShellNavbar style={{ width: "300px"}} bg={"gray.1"}>
                <AppSideBar />
            </AppShellNavbar>
            <AppShellMain>
                <Box style={{ overflow: "hidden" }}>
                    <Outlet />
                </Box>
            </AppShellMain>
        </AppShell>
    );
});

AppShellLayout.displayName = "AppShellLayout";

AppShellLayout.propTypes = {
};

export default AppShellLayout;
