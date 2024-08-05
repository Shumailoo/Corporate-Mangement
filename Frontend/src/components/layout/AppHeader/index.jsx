// import { Group, Avatar, Text, Container } from "@mantine/core";
import { Group, Avatar, Flex, Text } from "@mantine/core";

const CustomHeader = () => {
    return (
        <Group pr={"30"} position="apart" align="center" justify="space-between" style={{ width: "100%" }}>
            <Flex align={"center"}>
                <Text size="25px" c={"white"} bg={"red.5"} p={5} m={"0px 15px"} style={{borderRadius: "50%",transform: "scaleX(1.5)",fontStretch: "expanded",}}>R</Text>
                <Text weight={700} size="25px">
                    CorpR.
                </Text>
            </Flex>
            <Flex align={"center"} p={"5px 20px"} mt={10} bg={"red.5"} c={"gray.0"} style={{ borderRadius: "100px" }}>
                Shumail
                <Avatar src="/src/assets/profile.png" alt="Account Avatar" radius="xl" ml={10} />
            </Flex>
        </Group>
    );
};

export default CustomHeader;
