import { Button, Flex, Grid, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PropTypes from "prop-types";
import { useEffect } from "react";
const ModalCustom=({ selectedProject, isDeleted })=>{
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(()=>{
        if(selectedProject){
            open();
        }
    },[selectedProject])

    return(
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
                                {selectedProject.deliverables}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Text size="18px" style={{ fontWeight: 700 }}>
                                Employee IDs:
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={1} c={"red.6"}>
                            <Text size="18px" style={{ fontWeight: 300 }}>
                                {selectedProject.employeeIds}
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
    );
}

ModalCustom.propTypes={
    selectedProject:PropTypes.shape({
        projectName: PropTypes.string,
        description: PropTypes.string,
        estimatedDeliveryDate: PropTypes.string,
        totalSprintMeetings: PropTypes.number,
        deliverables: PropTypes.array,
        employeeIds: PropTypes.array,
    }),
    isDeleted:PropTypes.bool,
}

export default ModalCustom;