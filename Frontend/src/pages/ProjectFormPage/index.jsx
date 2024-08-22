import { Title, Button, Grid, NumberInput, TextInput, Flex, LoadingOverlay, MultiSelect, TagsInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams, useLoaderData } from "react-router-dom";
import styles from "./styles.module.css";
import { useForm } from "@mantine/form";
// import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import moment from "moment";
import axiosInstance from "@/axiosInstance";

const ProjectFormPage = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { projectEdit, activePage } = location?.state || {};
  const {employees}=useLoaderData();

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
      // form.setValues(projectEdit);

      const estimatedDeliveryDate = moment(projectEdit.estimatedDeliveryDate).format('yyyy-MM-DD');
      form.setValues({ ...projectEdit, estimatedDeliveryDate });
      setIsEditMode(true);
    }
  }, [projectId]);

  const handleSubmit = async values => {
    toggle();
    if (isEditMode) {
      const project = {
        ...projectEdit,
        projectName: values.projectName,
        description: values.description,
        deliverables: values.deliverables,
        estimatedDeliveryDate: values.estimatedDeliveryDate,
        totalSprintMeetings: values.totalSprintMeetings,
        employeeIds: values.employeeIds,
      };
      const req = await axiosInstance.put("http://localhost:5000/api/project/projects/" + project._id, { ...project });
      if (req.status === 200) {
        console.log("edited project success");
      } else {
        console.log("error project");
      }
    } else {
      const project = {
        projectName: values.projectName,
        description: values.description,
        deliverables: values.deliverables,
        estimatedDeliveryDate: values.estimatedDeliveryDate,
        totalSprintMeetings: values.totalSprintMeetings,
        employeeIds: values.employeeIds,
      };
      console.log(project);
      
      const req = await axiosInstance.post("http://localhost:5000/api/project/projects/", { ...project });
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
      <LoadingOverlay visible={visible} loaderProps={{type:"oval"}} />
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
            <Grid.Col span={12}>
                <TagsInput
                  className={styles.input}
                  placeholder="Enter deliverables"
                  label="Deliverables (press enter key to add specific deliverable)"
                  defaultValue={form.values.deliverables}
                  {...form.getInputProps("deliverables")}
                />
            </Grid.Col>
            <Grid.Col span={12}>
              <MultiSelect
                className={styles.input}
                label="Employees"
                placeholder="Add employees"
                data={employees.map((e) => ({ value: e._id, label: `${e.name} (${e.department})` }))}
                clearable
                hidePickedOptions
                value={form.values.employeeIds.map((emp) => emp._id)} // Extract the IDs from the selected employees
                onChange={(selectedIds) => {
                  const selectedEmployees = selectedIds.map((id) =>
                    employees.find((e) => e._id === id)
                  );
                  form.setFieldValue('employeeIds', selectedEmployees); // Update the form state with the full objects
                }}
              />
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

export const ProjectEmployeeLoader=async()=>{
  const res=await axiosInstance.get("http://localhost:5000/api/employee/employees");
  // console.log(res);
  
  if(res.status==200){
    return{
      employees:res.data,
    };
  }else {
    console.log("error fetch product employees");
  }
}