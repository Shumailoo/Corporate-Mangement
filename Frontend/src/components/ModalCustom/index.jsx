/* eslint-disable react/prop-types */
import { Button, Flex, Grid, Image, List, Modal, Table, Text, ThemeIcon, Title } from "@mantine/core";
import { IconPuzzleFilled } from "@tabler/icons-react";

const ModalCustom=({ content, onDelete, onClose })=>{
    const size = content.type === "info" ? "xl" : "md";
    const centered=content.type==="info"? false:true;
    const title=content.contentType==="project"? "Project Details":"Employee Details";
    // console.log(content.data);
    
    return(
        // <Text>ok</Text>
        <Modal
            opened={true}
            onClose={onClose}
            size={size}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            radius={10}
            padding={20}
            centered={centered}
            title={title}
            // style={{transition:"all 0.3s"}}
            transitionProps={{
                duration: 200,
                transition: 'fade',
            }}
        >
            {content.type === "info" ? (
                <>
                    {content.contentType === "project" ?(
                        <>
                            <Title order={1} c={"red.7"}>
                                {content.data.projectName}&apos;s Details
                            </Title>
                            <Grid mt={20} mb={20} columns={2} gutter="lg">
                                <Grid.Col span={1}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>
                                        Project Name:
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={1} c={"red.6"}>
                                    <Text size="18px" style={{ fontWeight: 300 }}>
                                        {content.data.projectName}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>
                                        Description:
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={1} c={"red.6"}>
                                    <Text size="18px" style={{ fontWeight: 300 }}>
                                        {content.data.description}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>
                                        Estimated Delivery Date:
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={1} c={"red.6"}>
                                    <Text size="18px" style={{ fontWeight: 300 }}>
                                        {content.data.estimatedDeliveryDate}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>
                                        Total Sprint Meetings:
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={1} c={"red.6"}>
                                    <Text size="18px" style={{ fontWeight: 300 }}>
                                        {content.data.totalSprintMeetings}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>
                                        Deliverables:
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={2} c={"red.6"}>
                                    <List icon={
                                        <ThemeIcon color="transparent">
                                            <IconPuzzleFilled color="#f03e3e" />
                                        </ThemeIcon>
                                        }
                                        pl={40} size="18px" style={{ fontWeight: 300 }}>
                                        {content.data.deliverables.map((del,index)=>(
                                            <List.Item c={"gray.8"} key={index}>{del}</List.Item>
                                        ))}
                                    </List>
                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>
                                        Employee:
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={2}>
                                    <Table withRowBorders={false} striped>
                                        <Table.Thead c={"red.6"}>
                                            <Table.Tr>
                                                <Table.Th>Name</Table.Th>
                                                <Table.Th>Position</Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody c={"gray.8"}>
                                            {content.data.employeeIds.map((employee,index)=>(
                                                <Table.Tr key={index}>
                                                    <Table.Td>{employee.name}</Table.Td>
                                                    <Table.Td>{employee.position}</Table.Td>
                                                </Table.Tr>
                                            ))}
                                        </Table.Tbody>
                                    </Table>
                                </Grid.Col>
                            </Grid>    
                        
                        </>
                    ) :(
                        <>
                            <Flex align={"end"}>
                                <Image w={100} h={100} src={"/src/assets/employeesProfile/empl_profile.png"} mr={20}/>
                                <Title order={1} c={"red.7"}>{content.data.name}&apos;s Details</Title>
                            </Flex>
                            <Grid mt={20} mb={20} columns={2} gutter="lg">
                                <Grid.Col span={1}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>Name:</Text>
                                </Grid.Col>
                                <Grid.Col span={1} c={"red.6"}>
                                    <Text size="18px" style={{ fontWeight: 300 }}>{content.data.name}</Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>Age:</Text>
                                </Grid.Col>
                                <Grid.Col span={1} c={"red.6"}>
                                    <Text size="18px" style={{ fontWeight: 300 }}>{content.data.age}</Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>Position:</Text>
                                </Grid.Col>
                                <Grid.Col span={1} c={"red.6"}>
                                    <Text size="18px" style={{ fontWeight: 300 }}>{content.data.position}</Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>Working Months:</Text>
                                </Grid.Col>
                                <Grid.Col span={1} c={"red.6"}>
                                    <Text size="18px" style={{ fontWeight: 300 }}>{content.data.workingMonths}</Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>Shift:</Text>
                                </Grid.Col>
                                <Grid.Col span={1} c={"red.6"}>
                                    <Text size="18px" style={{ fontWeight: 300 }}>{content.data.shift}</Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>Email:</Text>
                                </Grid.Col>
                                <Grid.Col span={1} c={"red.6"}>
                                    <Text size="18px" style={{ fontWeight: 300 }}>{content.data.email}</Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>Department:</Text>
                                </Grid.Col>
                                <Grid.Col span={1} c={"red.6"}>
                                    <Text size="18px" style={{ fontWeight: 300 }}>{content.data.department}</Text>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Text size="18px" style={{ fontWeight: 700 }}>Location:</Text>
                                </Grid.Col>
                                <Grid.Col span={1} c={"red.6"}>
                                    <Text size="18px" style={{ fontWeight: 300 }}>{content.data.location}</Text>
                                </Grid.Col>
                            </Grid>
                        </>
                    
                    )}
                </>
            ) : (
                <>
                    <Title order={3} c={"red.7"}>
                        {content.contentType==="project"? content.data.projectName:content.data.name}
                    </Title>
                    <Text mt={20} mb={10}>Are you sure you want to delete?</Text>
                    <Text c={"gray.6"} fz={14}><i>(Once you delete, will not be recovered.)</i></Text>
                    <Flex justify={"flex-end"} align={"center"} mt={20}>
                        <Button variant="outline" color="red" mr={20} onClick={onClose}>Return</Button>
                        <Button variant="filled" color="red" onClick={()=>onDelete(content.data._id)}>Delete</Button>
                    </Flex>    
                </>
            )}
        </Modal>
    );
}

export default ModalCustom;