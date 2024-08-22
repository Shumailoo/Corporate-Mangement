/* eslint-disable react/prop-types */
import { Container, Group, Image, Stack, Text, Title } from "@mantine/core";

const ErrorPage=({error})=>{
  error={
    title:"internal server error",
    titleMessage:"status error: 500",
    message:"The server encountered an internal error or misconfiguration and was unable to complete your request."
  }
  return(
    <Container bg={"white"} p={"30 auto"} h={"60vh"} mt={180} size={"xl"} style={{boxShadow:"0 0 50px 20px #e9ecef"}}>
      <Group justify="center">
        <Stack w={"40%"} bg={"white"} p={30}>
          <Title order={1} c={"red.8"} fw={400} style={{fontFamily:"inherit"}}>{error.title}</Title>
          <Title order={2} c={"red.6"} fw={600} style={{fontFamily:"inherit"}}>{error.titleMessage}</Title>
          <Text c={"gray.8"}>{error.message}</Text>
        </Stack>
          <Image src={"/src/assets/error.jpg"} fit="cover" w={"40%"}/>
      </Group>
    </Container>
  )
}

export default ErrorPage;