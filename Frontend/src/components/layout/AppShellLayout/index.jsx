import { memo } from "react";
import { AppShell, AppShellHeader, AppShellMain, AppShellNavbar, Burger } from "@mantine/core";
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
            <AppShellNavbar bg={"gray.1"}>
                <AppSideBar />
            </AppShellNavbar>
            <AppShellMain pl={"301px"}>
                <>
                    <Outlet />
                </>
            </AppShellMain>
        </AppShell>
    );
});

AppShellLayout.displayName = "AppShellLayout";

AppShellLayout.propTypes = {
};

export default AppShellLayout;
