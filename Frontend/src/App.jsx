import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import "./App.css";
import ViewEmployeePage from "@/pages/ViewEmployeePage";
import EmployeeFormPage from "@/pages/EmployeeFormPage";
import AppShellLayout from "./components/layout/AppShellLayout";
import LoginPage from "./pages/AuthPages/LoginPage";
import SignupPage from "./pages/AuthPages/SignupPage";
import ProjectFormPage from "./pages/ProjectFormPage";
import ViewProjectPage, { ProjectLoader } from "./pages/ViewProjectPage";
import AuthLayout from "./components/layout/AuthLayout";
import { EmployeeLoader } from "@/pages/ViewEmployeePage";


const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'red',
});

const router=createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<AuthLayout />}>  
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
            </Route>
            <Route path="employees" element={<AppShellLayout/>}>  
                <Route 
                    index
                    element={<ViewEmployeePage />} 
                    loader={EmployeeLoader} 
                    id="employees"
                />
                <Route path="add-employee" element={<EmployeeFormPage />} />
            </Route>
            <Route path="projects" element={<AppShellLayout/>}>  
                <Route 
                    index 
                    element={<ViewProjectPage />} 
                    loader={ProjectLoader}
                />
                <Route path="add-project" element={<ProjectFormPage />} />
            </Route>
        </Route>
    )
)


function App() {
    return (
        <MantineProvider theme={theme}>
            <RouterProvider router={router} />
        </MantineProvider>
    );
}

export default App;
