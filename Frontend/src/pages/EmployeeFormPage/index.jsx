import { Title, Button, Grid, NumberInput, NativeSelect, TextInput, Flex, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useForm } from "@mantine/form";
// import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import axiosInstance from "@/axiosInstance";

const EmployeeFormPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [visible, { open,close }] = useDisclosure(false);
    const { employeeEdit, activePage } = location?.state || {};
    // const { state}=location;
    const id = useParams("id");
    const [isEditMode, setIsEditMode] = useState(false);
    
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            name: "",
            age: "",
            position: "",
            workingMonths: "",
            shift: "",
            email: "",
            department: "",
            location: "",
        },
        validate: {
            name: value => value.length>2?null:'Invalid Name',
            email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
            age: value => (value?.length == 0 || value >= 18 ? null : "Age must be greater than 18"),
            workingMonths: value => (value?.length==0||value > 0 ? null : "Working months must be greater than 0"),
        },
    });

    useEffect(() => {
        if (employeeEdit) {
            form.setValues(employeeEdit);
            setIsEditMode(true);
        }
    }, [id]);

    const handleSubmit = async (values) => {
        open();
        if (isEditMode) {
            const employee = {
                id: employeeEdit._id,
                name: values.name,
                age: values.age,
                position: values.position,
                workingMonths: values.workingMonths,
                shift: values.shift,
                email: values.email,
                department: values.department,
                location: values.location,
            };
            const req = await axiosInstance.put("http://localhost:5000/api/employee/employees/" + employee.id, { ...employee });
            if (req.status === 200) {
                console.log("edited employee success");
            } else {
                console.log("edit employee error");
            }
        } else {
            const employee = {
                name: values.name,
                age: values.age,
                position: values.position,
                workingMonths: values.workingMonths,
                shift: values.shift,
                email: values.email,
                department: values.department,
                location: values.location,
            };
            const req = await axiosInstance.post("http://localhost:5000/api/employee/employees", { ...employee });
            if (req.status === 201) {
                console.log("Employee added");
            } else {
                console.log("employee added error");
            }
        }
        close();
        navigate("/employees");
    };

    return (
        <Grid gutter="lg" bg="gray.1" p="lg" style={{ borderRadius: "10px", width: "60%", margin: "20px auto 0px" }}>
            <LoadingOverlay visible={visible} loaderProps={{type:"oval"}} />
            <Grid.Col span={12}>
                <Title c={"red.6"} order={1}>
                    Employee Form
                </Title>
            </Grid.Col>
            <Grid.Col span={12}>
                <form onSubmit={form.onSubmit((values,event)=>{
                    event.preventDefault();
                    handleSubmit(values);
                })}>
                    <Grid gutter="lg">
                        <Grid.Col span={6}>
                            <TextInput withAsterisk placeholder="Enter your name" className={styles.input} label="Name" {...form.getInputProps("name")} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <NumberInput className={styles.input} placeholder="Enter your age" label="Age" allowNegative={false} allowDecimal={false} {...form.getInputProps("age")} />
                            {/* {form.errors.age && <Text >{form.errors.age}</Text>} */}
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <NativeSelect
                                data={["----Select your position----", "Developer", "Designer", "Intern", "HR", "Project Manager", "Tester"]}
                                className={styles.input}
                                placeholder="Enter your position"
                                label="Position"
                                {...form.getInputProps("position")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <NumberInput
                                {...form.getInputProps("workingMonths")}
                                className={styles.input}
                                placeholder="Enter your working months"
                                label="Working Months"
                                allowNegative={false}
                                allowDecimal={false}
                                // clampBehavior="strict"
                                // min={1}
                            />
                            {/* {form.errors.workingMonths && <Text >{form.errors.workingMonths}</Text>} */}
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <NativeSelect className={styles.input} label="Shift" {...form.getInputProps("shift")} data={["----Select your shift----", "Morning", "Day", "Night"]} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput withAsterisk className={styles.input} placeholder="Enter your email" label="Email" {...form.getInputProps("email")} />
                            {/* {form.errors.email && <Text >{form.errors.email}</Text>} */}
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <NativeSelect
                                className={styles.input}
                                label="Department"
                                {...form.getInputProps("department")}
                                data={["----Select your department----", "Engineering", "Design", "Human Resources", "IT", "Quality Assurance", "Management"]}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput className={styles.input} placeholder="Enter your location" label="Location" {...form.getInputProps("location")} />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Flex mt={20} justify={"flex-end"} align={"center"}>
                                {isEditMode && (
                                    <Button
                                        mr={20}
                                        variant="outline"
                                        onClick={() => {
                                            if (activePage) {
                                                navigate("/employees",{replace:true}, {
                                                    state: {
                                                        activePageEdit: activePage,
                                                    },
                                                });
                                            } else {
                                                navigate("/employees",{replace:true});
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

export default EmployeeFormPage;
