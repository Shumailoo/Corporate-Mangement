import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
// import ProjectContext from "@/context/projectContext";
import { Title, Table, Button, Flex, Modal, Text, Grid, Pagination } from "@mantine/core";
import ActionButton from "@/components/Buttons";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";

const tableHead = ["Serial#", "Project Name", "Description", "Estimated Delivery Date", "Total Sprint Meetings", "Actions"];

const ViewProjectPage = () => {
    const loadedProjects=useLoaderData();

    // const { projects, setProjects } = useContext(ProjectContext);
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);

    // pagination
    const [activePage, setPage] = useState(1);
    const [itemsPerPage] = useState(2);
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProjects = loadedProjects.slice(startIndex, endIndex);

    const handleAdd = () => {
        navigate("add-project");
    };

    const handleInfo = id => {
        const project = loadedProjects.find(p => p.id === id);
        setSelectedProject(project);
        open();
    };

    const handleEdit = id => {
        navigate(`add-project?id=${id}`);
    };

    const handleDelete =() => {
        setIsDeleted(true);
    };

    const deleteProject=async (id)=>{
        const pro=loadedProjects.find(p=>(p.id===id));
        const res=await axios.delete(`http://localhost:5101/projects/${pro.id}`);
        if(res.status===200){
            console.log("deleted");
        }
        else{
            console.log("error");
        }
    }

    return (
        <Flex direction={"column"} align={"center"} justify={"center"} m={"0 auto"} w={"fit-content"}>
            <Title order={1} mb={20} c={"red.7"}>
                Project Table
            </Title>
            <Button variant="filled" mb={20} style={{ alignSelf: "flex-end" }} onClick={handleAdd}>
                Add Project
                <IconPlus size={20} />
            </Button>
            <Table highlightOnHover striped withTableBorder horizontalSpacing={"sm"} verticalSpacing={"md"}>
                <Table.Thead>
                    <Table.Tr>
                        {tableHead.map((item, index) => {
                            return (
                                <Table.Td c={"red.5"} style={{ fontWeight: 600 }} key={index}>
                                    {item}
                                </Table.Td>
                            );
                        })}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {paginatedProjects.length > 0
                        ? paginatedProjects.map((project, index) => {
                            return (
                                <Table.Tr onClick={handleInfo.bind(null, project.id)} key={project.id}>
                                    <Table.Td align="center">{index + 1}</Table.Td>
                                    <Table.Td>{project.projectName}</Table.Td>
                                    <Table.Td style={{ wordBreak: 'break-word' }}>{project.description}</Table.Td>
                                    <Table.Td>{project.estimatedDeliveryDate}</Table.Td>
                                    <Table.Td>{project.totalSprintMeetings}</Table.Td>
                                    <Table.Td>
                                        <ActionButton id={project.id} handleInfo={handleInfo} handleDelete={handleDelete} handleEdit={handleEdit} />
                                    </Table.Td>
                                </Table.Tr>
                            );
                        })
                        : null}
                </Table.Tbody>
            </Table>
            <Pagination
                total={Math.ceil(loadedProjects.length / itemsPerPage)}
                value={activePage}
                onChange={setPage}
                mt="sm"
            />
            {selectedProject && (
                <Modal
                    opened={opened}
                    onClose={close}
                    size={"xl"}
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        blur: 3,
                    }}
                >

                    <Title order={1} c={"red.7"}>
                        {selectedProject.projectName}&apos;s Details
                    </Title>
                    <Grid mt={20} mb={20} columns={2} gutter="lg">
                        <Grid.Col span={1}>
                            <Text size="18px" style={{ fontWeight: 700 }}>
                                Project Name:
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1} c={"red.6"}>
                            <Text size="18px" style={{ fontWeight: 300 }}>
                                {selectedProject.projectName}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Text size="18px" style={{ fontWeight: 700 }}>
                                Description:
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1} c={"red.6"}>
                            <Text size="18px" style={{ fontWeight: 300 }}>
                                {selectedProject.description}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Text size="18px" style={{ fontWeight: 700 }}>
                                Estimated Delivery Date:
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1} c={"red.6"}>
                            <Text size="18px" style={{ fontWeight: 300 }}>
                                {selectedProject.estimatedDeliveryDate}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Text size="18px" style={{ fontWeight: 700 }}>
                                Total Sprint Meetings:
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1} c={"red.6"}>
                            <Text size="18px" style={{ fontWeight: 300 }}>
                                {selectedProject.totalSprintMeetings}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Text size="18px" style={{ fontWeight: 700 }}>
                                Deliverables:
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1} c={"red.6"}>
                            <Text size="18px" style={{ fontWeight: 300 }}>
                                {selectedProject.deliverables.join(", ")}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Text size="18px" style={{ fontWeight: 700 }}>
                                Employee IDs:
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1} c={"red.6"}>
                            <Text size="18px" style={{ fontWeight: 300 }}>
                                {selectedProject.employeeIds.join(", ")}
                            </Text>
                        </Grid.Col>
                    </Grid>
                    {isDeleted && (
                    <Flex justify={"flex-end"} align={"center"} mt={20}>
                        <Button variant="outline" color="red" mr={20} onClick={close}>Return</Button>
                        <Button variant="filled" color="red" onClick={()=>deleteProject(selectedProject.id)}>Delete</Button>
                    </Flex>
                    )}
                </Modal>
            )}
        </Flex>
    );
};

export default ViewProjectPage;

export const ProjectLoader=async()=>{
    const res=await axios.get("http://localhost:5101/projects");
    if(res.status===200){
        return res.data;
    }
    else{
        console.log("error");
    }
}