import { Title, Button, Grid, NumberInput, TextInput, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useForm } from "@mantine/form";
import axios from "axios";

const ProjectFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { newId, projectEdit, activePage } = location?.state || {};
  console.log(projectEdit);

  const projectId = useParams("id");
  const [isEditMode, setIsEditMode] = useState(false);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      projectName: "",
      description: "",
      deliverables: [],
      estimatedDeliveryDate: "",
      totalSprintMeetings: "",
      employeeIds: [],
    },
    validate: {
      projectName: value => (value.length > 0 ? null : "Project name is required"),
      description: value => (value?.length == 0 || value.length > 0 ? null : "Description is required"),
      estimatedDeliveryDate: value => (value.length > 0 ? null : "Estimated delivery date is required"),
      totalSprintMeetings: value => (value?.length == 0 || value > 0 ? null : "Total sprint meetings must be greater than 0"),
    },
  });

  useEffect(() => {
    if (projectEdit) {
      const ok = form.setValues(projectEdit);
      console.log(ok);

      setIsEditMode(true);
    }
  }, [projectId]);

  const handleSubmit = async values => {
    if (isEditMode) {
      const project = {
        id: projectEdit.id.toString(),
        projectName: values.projectName,
        description: values.description,
        deliverables: values.deliverables,
        estimatedDeliveryDate: values.estimatedDeliveryDate,
        totalSprintMeetings: values.totalSprintMeetings,
        employeeIds: values.employeeIds,
      };
      const req = await axios.put("http://localhost:5101/projects/" + project.id, { ...project });
      if (req.status === 200) {
        console.log("edited project success");
      } else {
        console.log("error project");
      }
    } else {
      const project = {
        id: newId,
        projectName: values.projectName,
        description: values.description,
        deliverables: values.deliverables,
        estimatedDeliveryDate: values.estimatedDeliveryDate,
        totalSprintMeetings: values.totalSprintMeetings,
        employeeIds: values.employeeIds,
      };
      const req = await axios.post("http://localhost:5101/projects", { ...project });
      if (req.status === 201) {
        console.log("project added");
      } else {
        console.log("Error add project");
      }
    }
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
        <form
          onSubmit={form.onSubmit((values, event) => {
            event.preventDefault();
            handleSubmit(values);
          })}
        >
          <Grid gutter="lg">
            <Grid.Col span={6}>
              <TextInput withAsterisk placeholder="Enter project name" className={styles.input} label="Project Name" {...form.getInputProps("projectName")} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput placeholder="Enter description" className={styles.input} label="Description" {...form.getInputProps("description")} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput className={styles.input} placeholder="Enter deliverables (comma separated)" label="Deliverables" {...form.getInputProps("deliverables")} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput withAsterisk type="date" className={styles.input} label="Estimated Delivery Date" {...form.getInputProps("estimatedDeliveryDate")} />
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
              <TextInput className={styles.input} placeholder="Enter employee IDs (comma separated)" label="Employee IDs" {...form.getInputProps("employeeIds")} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Flex mt={20} justify={"flex-end"} align={"center"}>
                {isEditMode && (
                  <Button
                    mr={20}
                    variant="outline"
                    onClick={() => {
                      if (activePage) {
                        navigate("/projects", { replace: true });
                      } else {
                        navigate("/projects", { replace: true });
                      }
                    }}
                  >
                    Return
                  </Button>
                )}
                <Button className={styles.button} type="submit" bg={"red.6"}>
                  Submit
                </Button>
              </Flex>
            </Grid.Col>
          </Grid>
        </form>
      </Grid.Col>
    </Grid>
  );
};

export default ProjectFormPage;
