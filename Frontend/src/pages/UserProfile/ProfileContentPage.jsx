/* eslint-disable react/prop-types */

// import { AuthContext } from "@/context/AuthContext";
import { Box, Button, Container, Stack, Text, TextInput, Title} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import styles from "./styles.module.css";
// import axios from "axios";
import { useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import axiosInstance from "@/axiosInstance";

const ProfileContentPage=({user})=>{
  const {setUser}=useContext(AuthContext);
  useEffect(() => {
    // console.log(user);
  }, [user]);
  // console.log(11,user);
  // const {user}=useContext(AuthContext);
  const formProfile = useForm({
    initialValues: {
      name: user.username,
      email: user.email,
      bio: user.bio||"",
      location: user.location||"",
    },
    validate: {
      name: (value) => (value.length > 2 ? null : "Invalid Name"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values) => {
    // console.log(user);
    
    const editUser={
      ...user,
      username:values.name,
      email:values.email,
      bio:values.bio,
      location:values.location
    }
    try {
      const res=await axiosInstance.put(`http://localhost:5000/api/user/users/${user._id}`,{
        ...editUser
      });
      // console.log(res);
      
      if(res.status===200){
        console.log("profile changed success");
        console.log(res.data);
        setUser({
          ...res.data.user
        })
      }else{
        console.log("error changing profile");
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  return(
    <Container size={"xl"} ml={0} w={"75%"}>
      <Stack mt={10} mb={20}>
        <Title order={2} fw={"lighter"} c={"red.6"}>Profile Information</Title>
        <Text c={"gray.6"}>Get to know yourself better by reviewing your profile details and making changes as needed.</Text>
      </Stack>
      <Box bg="gray.1" p={"lg"} style={{ borderRadius: "10px", width: "60%", margin: "20px 0px 0px"}}>
        <Title order={4} fw={"lighter"} c={"red.6"}>Sculpt your digital persona, stand out, be seen.</Title>
        <form onSubmit={formProfile.onSubmit((values, event) => {
          event.preventDefault();
          handleSubmit(values);
        })}>
          <TextInput
            className={`${styles.input}`}
            label="Name"
            {...formProfile.getInputProps("name")}
          />
          <TextInput

            className={`${styles.input}`}
            label="Email"
            {...formProfile.getInputProps("email")}
          />
          <TextInput

            className={`${styles.input}`}
            label="Bio"
            placeholder="Tell us about yourself"
            {...formProfile.getInputProps("bio")}
          />
          <TextInput
            
            className={`${styles.input}`}mb={20}
            label="Location"
            placeholder="Where are you from?"
            {...formProfile.getInputProps("location")}
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </Box>
    </Container>
    )
}

export default ProfileContentPage;