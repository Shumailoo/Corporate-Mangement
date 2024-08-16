// import { Group, Avatar, Text, Container } from "@mantine/core";
import { Group, Avatar, Flex, Text, Box, Menu, MenuTarget } from "@mantine/core";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconBulb,IconKey, IconTrash } from "@tabler/icons-react";

const CustomHeader = () => {
    let { user,logout } = useContext(AuthContext);
    
    const navigate=useNavigate();
    return (
        <Group pr={"30"} position="apart" align="center" justify="space-between" style={{ width: "100%" }}>
            <Flex align={"center"}>
                <Text size="25px" c={"white"} bg={"red.5"} p={5} m={"0px 15px"} style={{borderRadius: "50%",transform: "scaleX(1.5)",fontStretch: "expanded",}}>R</Text>
                <Text onClick={()=>{
                    navigate("/employees")
                }} weight={700} size="25px">
                    CorpR.
                </Text>
            </Flex>
            <Menu
                trigger="click-hover"
                position="bottom-end"
                shadow="md" 
                width={280}
                radius={10}
                transitionProps={{transition:"slide-up",duration:250}}
            >
            <MenuTarget>
                <Flex align={"center"} p={"4px 20px"} my={5} bg={"red.5"} c={"gray.0"} style={{ borderRadius: "20px" }}>
                    <Avatar mr={10} src="/src/assets/profile.png" alt="Account Avatar" size={50} radius="xl" ml={10} />
                    <Box>
                        <Text fw={"bold"}>{user.userName}</Text>
                        <Text fw={"normal"}>{user.userEmail}</Text>
                    </Box>
                </Flex>
            </MenuTarget>
                <Menu.Dropdown>
                    <Menu.Item leftSection={<IconBulb style={{verticalAlign:"sub",marginRight:"4px"}} size="1.5rem" stroke={1.5}/>} onClick={()=>{
                        navigate("/user/settings")
                    }}>Profile</Menu.Item>
                    <Menu.Item leftSection={<IconKey style={{verticalAlign:"sub",marginRight:"4px"}} size="1.5rem" stroke={1.5}/>} onClick={()=>{
                        navigate("/user/settings")
                    }}>Settings</Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item component="button" c={"red"} leftSection={<IconTrash style={{verticalAlign:"sub",marginRight:"4px"}} size="1rem" stroke={1.5}/>} onClick={()=>{
                        logout()
                    }}>Logout</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
};

export default CustomHeader;
