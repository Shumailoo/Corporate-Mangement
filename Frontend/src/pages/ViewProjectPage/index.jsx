import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Title, Table, Button, Flex, Modal, Text, Grid, Pagination, ActionIcon } from "@mantine/core";
import { IconEye, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import ModalCustom from "@/components/ModalCustom";

const tableHead = ["Serial#", "Project Name", "Description", "Estimated Delivery Date", "Total Sprint Meetings", "Actions"];

const ViewProjectPage = () => {
    const loadedProjects=useLoaderData();
    const navigate = useNavigate();
    const location=useLocation();
    const { activePageEdit }=location.state || {};
    // const [opened, { open, close }] = useDisclosure(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);

    // pagination
    const [activePage, setPage] = useState(1);
    const [itemsPerPage] = useState(2);
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProjects = loadedProjects.slice(startIndex, endIndex);

    useEffect(()=>{
        if(activePageEdit>0){
            setPage(activePageEdit);
        }
    },[activePageEdit])

    useEffect(()=>{
        console.log(123);
        
    },[selectedProject])

    const handleAdd = () => {
        navigate("add-project");
    };

    const handleInfo = id => {
        const project = loadedProjects.find(p => p.id === id);
        setSelectedProject(project);
    };

    const handleEdit = projectEdit => {
        navigate(`add-project?id=${projectEdit.id}`,{ 
            state:{
                projectEdit:projectEdit,
                loadedProjects:loadedProjects,
                activePage:activePage,
            }
        });
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
        navigate("/projects")
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
                                        <Flex gap={'md'}>
                                            <ActionIcon variant="light" onClick={()=>{handleInfo(project.id)}}><IconEye /></ActionIcon>
                                            <ActionIcon variant="outline" onClick={()=>{project.id?handleEdit(project):console.log("id");
                                            }} ><IconPencil /></ActionIcon>
                                            <ActionIcon  onClick={handleDelete}><IconTrash /></ActionIcon>
                                        </Flex>                                    
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
                <ModalCustom selectedProject={selectedProject} isDeleted={isDeleted} key={selectedProject.id}/>
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