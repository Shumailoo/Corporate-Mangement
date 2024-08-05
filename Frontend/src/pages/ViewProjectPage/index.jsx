import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectContext from "@/context/projectContext";
import { Title, Table, Button, Flex, Modal, Text, Grid } from "@mantine/core";
import ActionButton from "@/components/Buttons";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const tableHead = ["Serial#", "Project Name", "Description", "Estimated Delivery Date", "Total Sprint Meetings", "Actions"];

const ViewProjectPage = () => {
    const { projects, setProjects } = useContext(ProjectContext);
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleAdd = () => {
        navigate("add-project");
    };

    const handleInfo = id => {
        const project = projects.find(p => p.id === id);
        setSelectedProject(project);
        open();
    };

    const handleEdit = id => {
        navigate(`add-project?id=${id}`);
    };

    const handleDelete = id => {
        const newProjects = projects.filter(project => project.id !== id);
        setProjects(newProjects);
    };

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
                    {projects.length > 0
                        ? projects.map((project, index) => {
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
                </Modal>
            )}
        </Flex>
    );
};

export default ViewProjectPage;
