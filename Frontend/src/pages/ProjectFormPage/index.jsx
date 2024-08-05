import { Title, Button, Grid, NumberInput, TextInput } from "@mantine/core";
import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProjectContext from "@/context/projectContext";
import styles from "./styles.module.css";
import { useForm } from "@mantine/form";

const ProjectFormPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const projectId = location.search.split("=")[1];
    const { projects, setProjects } = useContext(ProjectContext);
    const form = useForm({
        initialValues: {
            projectName: "",
            description: "",
            deliverables: [],
            estimatedDeliveryDate: "",
            totalSprintMeetings: "",
            employeeIds: [],
        },
        validate: {
            projectName: (value) => (value.length > 0 ? null : "Project name is required"),
            description: (value) => (value.length > 0 ? null : "Description is required"),
            estimatedDeliveryDate: (value) => (value.length > 0 ? null : "Estimated delivery date is required"),
            totalSprintMeetings: (value) => (value > 0 ? null : "Total sprint meetings must be greater than 0"),
        },
    });

    useEffect(() => {
        if (projectId) {
            const projectData = projects.find((project) => project.id === projectId);
            if (projectData) {
                form.setValues(projectData);
            }
        }
    }, [projectId]);

    const handleSubmit = (values) => {
        const index = projects.findIndex((project) => project.id === projectId);
        if (index !== -1) {
            projects[index] = values;
        } else {
            projects.push(values);
        }
        setProjects([...projects]);
        navigate("/projects");
    };

    return (
        <Grid gutter="lg" bg="gray.1" p="lg" style={{ borderRadius: "10px", width: "60%", margin: "20px auto 0px" }}>
            <Grid.Col span={12}>
                <Title c={"red.6"} order={1}>
                    Project Form
                </Title>
            </Grid.Col>
            <Grid.Col span={12}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Grid gutter="lg">
                        <Grid.Col span={6}>
                            <TextInput
                                withAsterisk
                                placeholder="Enter project name"
                                className={styles.input}
                                label="Project Name"
                                {...form.getInputProps("projectName")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                withAsterisk
                                placeholder="Enter description"
                                className={styles.input}
                                label="Description"
                                {...form.getInputProps("description")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                className={styles.input}
                                placeholder="Enter deliverables (comma separated)"
                                label="Deliverables"
                                {...form.getInputProps("deliverables")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                withAsterisk
                                type="date"
                                className={styles.input}
                                label="Estimated Delivery Date"
                                {...form.getInputProps("estimatedDeliveryDate")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <NumberInput
                                {...form.getInputProps("totalSprintMeetings")}
                                className={styles.input}
                                placeholder="Enter total sprint meetings"
                                label="Total Sprint Meetings"
                                allowNegative={false}
                                allowDecimal={false}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                className={styles.input}
                                placeholder="Enter employee IDs (comma separated)"
                                label="Employee IDs"
                                {...form.getInputProps("employeeIds")}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Button className={styles.button} type="submit" mt={20} bg={"red.6"}>
                                Submit
                            </Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Grid.Col>
        </Grid>
    );
};

export default ProjectFormPage;