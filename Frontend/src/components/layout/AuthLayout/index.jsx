import { Box, Container, Flex, Image } from "@mantine/core";
import { Outlet } from "react-router-dom";

const AuthLayout=()=>{
    return(
        <Container m={"0 auto"}>
        <Flex mt={"14%"} style={{borderRadius:10,boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.1)",border:"1px solid #ddd"}} align={"center"} justify={"space-evenly"}>
                <Image src={"/src/assets/authpages4.jpg"} fit="cover" h={"20vw"}/>
                <Box style={{overflow:"hidden"}}>
                    <Outlet/>
                </Box>
        </Flex>
        </Container>
    );
}

export default AuthLayout;