import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { Title, Table, Button, Flex, Pagination, ActionIcon, LoadingOverlay } from "@mantine/core";
import { IconEye, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import ModalCustom from "@/components/ModalCustom";
import { useModal } from "@/customHooks/useModal";
import { useDisclosure } from "@mantine/hooks";

const tableHead = ["Serial#", "Project Name", "Description", "Estimated Delivery Date", "Total Sprint Meetings", "Actions"];

const ViewProjectPage = () => {
    const [visible, { open,close }] = useDisclosure(false);
    const { loadedProjects,totalPages,totalProducts,currentPage }=useLoaderData();
    const navigate = useNavigate();
    const { isOpen, content, openModal, closeModal } = useModal();
    
    // pagination
    const [searchParams, setSearchParams] = useSearchParams();
    const [activePage, setPage] = useState(parseInt(currentPage || searchParams.get("page") || 1));
    const itemsPerPage = Math.ceil(totalProducts/totalPages);


    useEffect(() => {
        setSearchParams({ page: activePage });
    }, [activePage, setSearchParams]);

    const handleAdd = () => {
        navigate("add-project",{state:{newId:loadedProjects.length+1}});
    };

    const handleInfo = project => {
        // console.log(project);
        
        openModal({
            type:"info",
            data:project,
            contentType:"project",
        })
    };

    const handleEdit = projectEdit => {
        navigate(`add-project?id=${projectEdit._id}`,{ 
            state:{
                projectEdit:projectEdit,
            }
        });
        setPage(activePage);
    };

    const handleDelete =(project) => {
        openModal({
            type:"delete",
            data:project,
            contentType:"project",
        })
    };

    const deleteProject=async (id)=>{
        open();
        try {
            const res=await axios.delete(`http://localhost:5000/api/project/projects/${id}`);
            if(res.status===200){
                console.log("deleted project success");
            }
            else{
                console.log("error project add");
            }
            navigate("/projects",{replace:true})
        } catch (error) {
            console.log(error);
        } finally{
            close();
            closeModal();
        }
    }

    return (
        <Flex direction={"column"} align={"center"} justify={"center"} m={"0 auto"} w={"fit-content"}>
            <LoadingOverlay visible={visible} loaderProps={{type:"oval"}} />
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
                    {loadedProjects.length > 0
                        ? loadedProjects.map((project, index) => {
                            return (
                                <Table.Tr key={project._id}>
                                    <Table.Td onClick={handleInfo.bind(null, project)}  align="center">{activePage==1?index+1:((activePage-1)*itemsPerPage)+index+1}</Table.Td>
                                    <Table.Td onClick={handleInfo.bind(null, project)} >{project.projectName}</Table.Td>
                                    <Table.Td onClick={handleInfo.bind(null, project)}  style={{ wordBreak: 'break-word' }}>{project.description}</Table.Td>
                                    <Table.Td onClick={handleInfo.bind(null, project)} >{project.estimatedDeliveryDate}</Table.Td>
                                    <Table.Td onClick={handleInfo.bind(null, project)} >{project.totalSprintMeetings}</Table.Td>
                                    <Table.Td>
                                        <Flex gap={'md'}>
                                            <ActionIcon variant="light" onClick={()=>{handleInfo(project)}}>
                                                <IconEye />
                                            </ActionIcon>
                                            <ActionIcon variant="outline" onClick={()=>{project._id?handleEdit(project):void 0;
                                            }} >
                                                <IconPencil />
                                            </ActionIcon>
                                            <ActionIcon onClick={()=>{handleDelete(project)}}>
                                                <IconTrash />
                                            </ActionIcon>
                                        </Flex>                                    
                                    </Table.Td>
                                </Table.Tr>
                            );
                        })
                        : null}
                </Table.Tbody>
            </Table>
            <Pagination
                total={totalPages}
                value={activePage}
                onChange={setPage}
                mt="sm"
            />
            {isOpen && (
                <ModalCustom content={content} onDelete={deleteProject} onClose={closeModal}/>
            )}
        </Flex>
    );
};

export default ViewProjectPage;

export const ProjectLoader=async({request})=>{
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const res=await axios.get(`http://localhost:5000/api/project/projects?page=${page}`);
    console.log(res);
    
    if(res.status===200){
        return {
            loadedProjects: res.data.projects,
            totalProducts: res.data.totalProjects,
            totalPages:res.data.totalPages,
            currentPage:res.data.currentPage,
        };
    }
    else{
        console.log("error fetch project");
    }
}