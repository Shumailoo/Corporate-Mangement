import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Title, Table, Button, Flex, Modal, Text, Grid, Image, Pagination, ActionIcon } from "@mantine/core";
import { IconEye, IconPencil, IconTrash, IconUserPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";

const tableHead=[
    "Serial#","Name","Email","Shift","Position","Actions"
]

const ViewEmployeePage = () => {
    const loadedEmployees=useLoaderData();
    const navigate=useNavigate();
    const location=useLocation();
    const { activePageEdit }=location.state || {};
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    
    // states for pagination
    const [activePage, setPage] = useState(1);
    const [itemsPerPage] = useState(4);
    // indeces for pagination
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    //pagination sliced array
    const paginatedEmployees = loadedEmployees.slice(startIndex, endIndex);

    useEffect(()=>{
        if(activePageEdit>0){
            setPage(activePageEdit);
        }
    },[activePageEdit])

    const handleAdd=()=>{
        navigate("add-employee");
    }
    
    const handleInfo=(email)=>{
        const employee = loadedEmployees.find((e) => e.email === email);
        setSelectedEmployee(employee);
        open();
    }

    const handleEdit=(employeeEdit)=>{
        navigate(`add-employee?id=${employeeEdit.id}`,{ 
            state:{
                employeeEdit:employeeEdit,
                loadedEmployees:loadedEmployees,
                activePage:activePage,
            }
            }
        );
    };

    const handleDelete = () => {
        setIsDeleted(true);
    };

    const deleteEmployee=async (email)=>{
        const emp=loadedEmployees.find(e=>(e.email===email));
        const res=await axios.delete(`http://localhost:5100/employees/${emp.id}`);
        if(res.status===200){
            console.log("deleted");
        }
        else{
            console.log("error");
        }
        navigate("/employees")
    }

    return (
        <Flex direction={"column"} align={"center"} justify={"center"} m={"0 auto"} w={"max-content"}>
            <Title order={1} mb={20} c={"red.7"}>Employee Table</Title>            
            <Button variant="filled" mb={20} style={{alignSelf:"flex-end"}} onClick={handleAdd}>Add Employee<IconUserPlus size={18} /></Button>
            <Table highlightOnHover striped withTableBorder horizontalSpacing={"xl"} verticalSpacing={"sm"}>
                <Table.Thead>
                    <Table.Tr>
                        {tableHead.map((item,index)=>{
                            return(
                                <Table.Td c={"red.5"} style={{fontWeight:600}} key={index}>{item}</Table.Td>
                            );})
                        }     
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {paginatedEmployees.length>0 ? paginatedEmployees.map((employee,index) => {
                        return(
                            <Table.Tr onClick={handleInfo.bind(null, employee.email)} key={employee.email}>
                                <Table.Td align="center">{index+1}</Table.Td>
                                <Table.Td>
                                    <Flex align={"center"}>
                                        <Image mr={10} src="/src/assets/employeesProfile/empl_profile.png" h={40} w={40} fit="contain" />{employee.name}
                                    </Flex>
                                </Table.Td>
                                <Table.Td>{employee.email}</Table.Td>
                                <Table.Td>{employee.shift}</Table.Td>
                                <Table.Td>{employee.position}</Table.Td>
                                <Table.Td>

                                    <Flex gap={'md'}>
                                        <ActionIcon variant="light" onClick={()=>{handleInfo(employee.email)}}><IconEye /></ActionIcon>
                                        <ActionIcon variant="outline" onClick={()=>{employee.id?handleEdit(employee):console.log("id");
                                        }} ><IconPencil /></ActionIcon>
                                        <ActionIcon  onClick={()=>{handleDelete(employee.email)}}><IconTrash /></ActionIcon>
                                    </Flex>
                                </Table.Td>
                            </Table.Tr>
                        );
                    })
                    : null}
                </Table.Tbody>
            </Table>
            <Pagination
                total={Math.ceil(loadedEmployees.length / itemsPerPage)}
                value={activePage}
                onChange={setPage}
                mt="sm"
            />
            {selectedEmployee && (
        <Modal opened={opened} onClose={close} size={"lg"} 
        overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }}>
            <Flex align={"end"}>
                <Image w={100} h={100} src={"/src/assets/employeesProfile/empl_profile.png"} mr={20}/>
                <Title order={1} c={"red.7"}>{selectedEmployee.name}&apos;s Details</Title>
            </Flex>
            <Grid mt={20} mb={20} columns={2} gutter="lg">
                <Grid.Col span={1}>
                    <Text size="18px" style={{ fontWeight: 700 }}>Name:</Text>
                </Grid.Col>
                <Grid.Col span={1} c={"red.6"}>
                    <Text size="18px" style={{ fontWeight: 300 }}>{selectedEmployee.name}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Text size="18px" style={{ fontWeight: 700 }}>Age:</Text>
                </Grid.Col>
                <Grid.Col span={1} c={"red.6"}>
                    <Text size="18px" style={{ fontWeight: 300 }}>{selectedEmployee.age}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Text size="18px" style={{ fontWeight: 700 }}>Position:</Text>
                </Grid.Col>
                <Grid.Col span={1} c={"red.6"}>
                    <Text size="18px" style={{ fontWeight: 300 }}>{selectedEmployee.position}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Text size="18px" style={{ fontWeight: 700 }}>Working Months:</Text>
                </Grid.Col>
                <Grid.Col span={1} c={"red.6"}>
                    <Text size="18px" style={{ fontWeight: 300 }}>{selectedEmployee.workingMonths}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Text size="18px" style={{ fontWeight: 700 }}>Shift:</Text>
                </Grid.Col>
                <Grid.Col span={1} c={"red.6"}>
                    <Text size="18px" style={{ fontWeight: 300 }}>{selectedEmployee.shift}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Text size="18px" style={{ fontWeight: 700 }}>Email:</Text>
                </Grid.Col>
                <Grid.Col span={1} c={"red.6"}>
                    <Text size="18px" style={{ fontWeight: 300 }}>{selectedEmployee.email}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Text size="18px" style={{ fontWeight: 700 }}>Department:</Text>
                </Grid.Col>
                <Grid.Col span={1} c={"red.6"}>
                    <Text size="18px" style={{ fontWeight: 300 }}>{selectedEmployee.department}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                    <Text size="18px" style={{ fontWeight: 700 }}>Location:</Text>
                </Grid.Col>
                <Grid.Col span={1} c={"red.6"}>
                    <Text size="18px" style={{ fontWeight: 300 }}>{selectedEmployee.location}</Text>
                </Grid.Col>
            </Grid>
            {isDeleted && (
            <Flex justify={"flex-end"} align={"center"} mt={20}>
                <Button variant="outline" color="red" mr={20} onClick={close}>Return</Button>
                <Button variant="filled" color="red" onClick={()=>deleteEmployee(selectedEmployee.email)}>Delete</Button>
            </Flex>
            )}
        </Modal>
            )}
        </Flex>
    );
};

export default ViewEmployeePage;

export const EmployeeLoader=async()=>{
    const res=await axios.get("http://localhost:5100/employees");
    if(res.status===200){
        return res.data;
    }
    else{
        console.log("error");
    }
}

