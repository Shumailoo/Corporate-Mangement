/* eslint-disable react/prop-types */

import { AuthContext } from "@/context/AuthContext";
import { Box, Button, Container, Stack, Text, TextInput, Title} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import styles from "./styles.module.css";

const ProfileContentPage=()=>{
  const {user}=useContext(AuthContext);
  const form = useForm({
    initialValues: {
      name: user.userName,
      email: user.userEmail,
      bio: "",
      location: "",
    },
    validate: {
      name: (value) => (value.length > 2 ? null : "Invalid Name"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async () => {
    console.log(123);
    
  };

  return(
    <Container size={"xl"} ml={0} w={"75%"}>
      <Stack mt={10} mb={20}>
        <Title order={2} fw={"lighter"} c={"red.6"}>Profile Information</Title>
        <Text c={"gray.6"}>Get to know yourself better by reviewing your profile details and making changes as needed.</Text>
      </Stack>
      <Box bg="gray.1" p={"lg"} style={{ borderRadius: "10px", width: "60%", margin: "20px 0px 0px"}}>
        <Title order={4} fw={"lighter"} c={"red.6"}>Sculpt your digital persona, stand out, be seen.</Title>
        <form onSubmit={form.onSubmit((values, event) => {
          event.preventDefault();
          handleSubmit(values);
        })}>
          <TextInput
            className={`${styles.input}`}
            label="Name"
            {...form.getInputProps("name")}
            readOnly
          />
          <TextInput

            className={`${styles.input}`}
            label="Email"
            {...form.getInputProps("email")}
            readOnly
          />
          <TextInput

            className={`${styles.input}`}
            label="Bio"
            placeholder="Tell us about yourself"
            {...form.getInputProps("bio")}
          />
          <TextInput
            
            className={`${styles.input}`}mb={20}
            label="Location"
            placeholder="Where are you from?"
            {...form.getInputProps("location")}
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </Box>
    </Container>
    )
}

export default ProfileContentPage;