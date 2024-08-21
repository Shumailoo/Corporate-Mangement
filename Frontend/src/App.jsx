import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import "./App.css";
import ViewEmployeePage from "@pages/ViewEmployeePage";
import EmployeeFormPage from "@pages/EmployeeFormPage";
import AppShellLayout from "./components/layout/AppShellLayout";
import LoginPage from "@pages/AuthPages/LoginPage";
import SignupPage from "@pages/AuthPages/SignupPage";
import ProjectFormPage from "@pages/ProjectFormPage";
import ViewProjectPage, { ProjectLoader } from "@pages/ViewProjectPage";
import AuthLayout from "@components/layout/AuthLayout";
import { EmployeeLoader } from "@pages/ViewEmployeePage";
import { ProjectEmployeeLoader } from "@pages/ProjectFormPage";
// import { UsersLoader } from "@pages/AuthPages/SignupPage";
import { AuthContextProvider } from "@/context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { Notifications } from "@mantine/notifications";
import UserProfileLayout from "@pages/UserProfile";
// import ProfileContentPage from "@pages/UserProfile/ProfileContentPage";
import ProfileSettingsPage from "@pages/UserProfile/ProfileSettingsPage";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "red",
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />}  />
        <Route path="signup" element={<SignupPage />}  />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="employees" element={<AppShellLayout />}>
          <Route index element={<ViewEmployeePage />} loader={EmployeeLoader} id="employees" />
          <Route path="add-employee" element={<EmployeeFormPage />}/>
        </Route>
        <Route path="projects" element={<AppShellLayout />}>
          <Route index element={<ViewProjectPage />} loader={ProjectLoader} />
          <Route path="add-project" element={<ProjectFormPage />} loader={ProjectEmployeeLoader} />
        </Route>
        <Route path="user" element={<AppShellLayout />}>
          <Route element={<UserProfileLayout />}>
            <Route path="settings" element={<ProfileSettingsPage/>}/>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthContextProvider>
        <Notifications />
        <RouterProvider router={router} />
      </AuthContextProvider>
    </MantineProvider>
  );
}

export default App;
