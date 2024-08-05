// import { Title,Button, Grid, NumberInput, NativeSelect, TextInput } from "@mantine/core";
// import { useState,useEffect,useContext } from "react";
// import { useNavigate,useLocation } from "react-router-dom";
// import EmployeeContext from "@/context/employeeContext";
// import styles from "./styles.module.css";
// import { useForm } from "@mantine/form";

// const EmployeeFormPage = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const email = location.search.split('=')[1];
//     const { employees, setEmployees } = useContext(EmployeeContext);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const index = employees.findIndex((employee) => employee.email === email);
//         if (index !== -1) {
//             employees[index] = employee;
//             setEmployees([...employees]);
//         }
//         navigate("/employees");
//         };

//     const [employee, setEmployee] = useState({
//         name: "",
//         age: "",
//         position: "",
//         workingMonths: "",
//         shift: "",
//         email: "",
//         department: "",
//         location: "",
//     });

//     useEffect(() => {
//         console.log(12);
//         if (email) {
//             console.log(34);
//             const employees = JSON.parse(localStorage.getItem('employees')) || [];
//             const employeeData = employees.find((employee) => employee.email === email);
//             if (employeeData) {
//                 console.log(56);
//                 setEmployee(employeeData);
//             }
//             }
//         }, [email]);

//     const changeHandle = (event)=>{
//         const { name, value } = event.target;
//         setEmployee((prevState)=>{
//             return {
//                 ...prevState,
//                 [name]: value
//             };
//         });
//     };

//     const form=useForm({
//         validate: {
//             email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
//             age: (value) => (value > 18 ? null : 'Age must be greater than 18'),
//             workingMonths: (value) => (value > 0 ? null : 'Working months must be greater than 0'),
//         },
//     })

//     return (
//         <Grid gutter="lg" bg="gray.1" p="lg" style={{width:"60%",margin:"20px auto 0px"}}>
//             <Grid.Col span={12}>
//                 <Title c={"red.6"} order={1}>Employee Form</Title>
//             </Grid.Col>
//             <Grid.Col span={12}>
//                 <form onSubmit={handleSubmit}>
//                     <Grid gutter="lg">
//                         <Grid.Col span={6}>
//                         <TextInput
//                             placeholder="Enter your name"
//                             className={styles.input}
//                             name="name"
//                             label="Name"
//                             value={employee.name}
//                             onChange={changeHandle}
//                         />
//                         </Grid.Col>
//                         <Grid.Col span={6}>
//                         <NumberInput
//                             className={styles.input}
//                             placeholder="Enter your age"
//                             name="age"
//                             label="Age"
//                             min={18}
//                             value={employee.age}
//                             onChange={changeHandle}
//                             allowNegative={false}
//                             allowDecimal={false}
//                         />
//                         </Grid.Col>
//                         <Grid.Col span={6}>
//                         <TextInput
//                             className={styles.input}
//                             placeholder="Enter your position"
//                             name="position"
//                             label="Position"
//                             value={employee.position}
//                             onChange={changeHandle}
//                         />
//                         </Grid.Col>
//                         <Grid.Col span={6}>
//                         <NumberInput
//                             className={styles.input}
//                             placeholder="Enter your working months"
//                             name="workingMonths"
//                             label="Working Months"
//                             value={employee.workingMonths}
//                             onChange={changeHandle}
//                             allowNegative={false}
//                             allowDecimal={false}
//                             clampBehavior="strict"
//                             min={1}
//                         />
//                         </Grid.Col>
//                         <Grid.Col span={6}>
//                         <NativeSelect
//                             className={styles.input}
//                             name="shift"
//                             label="Shift"
//                             value={employee.shift}
//                             onChange={changeHandle}
//                             data={["Morning","Day","Night"]}
//                         />
//                         </Grid.Col>
//                         <Grid.Col span={6}>
//                         <TextInput
//                             className={styles.input}
//                             placeholder="Enter your email"
//                             name="email"
//                             label="Email"
//                             value={employee.email}
//                             onChange={changeHandle}
//                         />
//                         </Grid.Col>
//                         <Grid.Col span={6}>
//                         <NativeSelect
//                             className={styles.input}
//                             name="department"
//                             label="Department"
//                             value={employee.department}
//                             onChange={changeHandle}
//                             data={["Developer","Designer","Intern","HR","Project Manager","Tester"]}
//                         />
//                         </Grid.Col>
//                         <Grid.Col span={6}>
//                         <TextInput
//                             className={styles.input}
//                             placeholder="Enter your location"
//                             name="location"
//                             label="Location"
//                             value={employee.location}
//                             onChange={changeHandle}
//                         />
//                         </Grid.Col>
//                         <Grid.Col span={12}>
//                         <Button
//                             className={styles.button}
//                             type="submit"
//                             mt={20}
//                             bg={"red.6"}
//                         >
//                             Submit
//                         </Button>
//                         </Grid.Col>
//                     </Grid>
//                 </form>
//             </Grid.Col>
//         </Grid>
//     );
//     // other choice flex

//             // <AppShellLayout>
//             // <Flex align={"center"} direction={"column"} justify={"center"} mt={10}>
//             //     <Title c={"red.6"} order={1}>Employee Form</Title>
//             //     <form onSubmit={handleSubmit}>
//             //         <FormField name="name" fieldLabel="Name" value={employee.name} handleChange={changeHandle} />
//             //         <FormField name="age" fieldLabel="Age" value={employee.age} handleChange={changeHandle} />
//             //         <FormField name="position" fieldLabel="Position" value={employee.position} handleChange={changeHandle} />
//             //         <FormField name="workingMonths" fieldLabel="Working Months" value={employee.workingMonths} handleChange={changeHandle} />
//             //         <FormField name="shift" fieldLabel="Shift" value={employee.shift} handleChange={changeHandle} />
//             //         <FormField name="email" fieldLabel="Email" value={employee.email} handleChange={changeHandle} />
//             //         <FormField name="department" fieldLabel="Department" value={employee.department} handleChange={changeHandle} />
//             //         <FormField name="location" fieldLabel="Location" value={employee.location} handleChange={changeHandle} />
//             //         <Button className={styles.button} type="submit" mt={20} bg={"red.6"} >Submit</Button>
//             //     </form>
//             // </Flex>
//         // </AppShellLayout>

// };

// export default EmployeeFormPage;

import { Title, Button, Grid, NumberInput, NativeSelect, TextInput, Flex } from "@mantine/core";
import { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EmployeeContext from "@/context/employeeContext";
import styles from "./styles.module.css";
import { useForm } from "@mantine/form";

const EmployeeFormPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.search.split("=")[1];
    const { employees, setEmployees } = useContext(EmployeeContext);
    const [isEditMode, setIsEditMode] = useState(false);

    const form = useForm({
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
            email: value => {
                const emailAlreadyExists = employees.some(employee => employee.email === value);
                return emailAlreadyExists ? "Email already exists" : (/^\S+@\S+$/.test(value) ? null : "Invalid email");
            },
            age: value => (value > 18 ? null : "Age must be greater than 18"),
            workingMonths: value => (value > 0 ? null : "Working months must be greater than 0"),
        },
    });

    useEffect(() => {
        if (email) {
            const employees = JSON.parse(localStorage.getItem("employees")) || [];
            const employeeData = employees.find(employee => employee.email === email);
            if (employeeData) {
                form.setValues(employeeData);
            }
            setIsEditMode(true);
        }
    }, [email]);

    const handleSubmit = values => {
        const index = employees.findIndex(employee => employee.email === email);//-1 if the employee is not found
        if (index !== -1) {
            employees[index] = values;
        }
        else {
            employees.push(values);
        }
        setEmployees([...employees]);
        localStorage.setItem("employees", JSON.stringify(employees));
        navigate("/employees");
    };

    return (
        <Grid gutter="lg" bg="gray.1" p="lg" style={{ borderRadius:"10px",width: "60%", margin: "20px auto 0px" }}>
            <Grid.Col span={12}>
                <Title c={"red.6"} order={1}>
                    Employee Form
                </Title>
            </Grid.Col>
            <Grid.Col span={12}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
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
                                data={["----Select your position----","Developer", "Designer", "Intern", "HR", "Project Manager", "Tester"]}
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
                            <NativeSelect className={styles.input} label="Shift" {...form.getInputProps("shift")} data={["----Select your shift----","Morning", "Day", "Night"]} />
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
                                data={["----Select your department----","Engineering","Design","Human Resources","IT","Quality Assurance","Management"]}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput className={styles.input} placeholder="Enter your location" label="Location" {...form.getInputProps("location")} />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Flex mt={20} justify={"flex-end"} align={"center"}>
                                {isEditMode && (
                                        <Button mr={20} variant="outline" onClick={() => navigate("/employees")}>Return</Button>
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