/* eslint-disable react/prop-types */

// import { AuthContext } from "@/context/AuthContext";
import { Box, Button, Container, PasswordInput, Text,  Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock } from "@tabler/icons-react";
// import { useContext } from "react";
import styles from "./styles.module.css";
// import axios from "axios";
import axiosInstance from "@/axiosInstance";

const ProfileSettingsPage=({user})=>{
  
  const formSettings = useForm({
    validateInputOnChange: true,
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      password: value => (value.length < 2 ? "Password should be at least 2 characters long" : null),
      newPassword: value => (value.length < 2 ? "Password should be at least 2 characters long" : null),
      confirmPassword:(value, values) => (value !== values.newPassword ? "Passwords do not match" : null),
    },
  });

  const handleSubmitSettings = async (values) => {
    const editUser={
      ...user,
      password:values.password,
      newPassword:values.newPassword,
    }
    try {
      const res=await axiosInstance.put(`http://localhost:5000/api/user/users/${user._id}/password`,{
        ...editUser
      });
      // console.log(res);
      
      if(res.status===200){
        console.log("password changed success");
      }else{
        console.log("error changing password");
      }
    } catch (error) {
      console.log(error)
    }
    formSettings.reset();
  };

  return(
      <Container w={"70%"} ml={0}>
        <Title mb={10} order={2} fw={"lighter"} c={"red.6"}>Change your password</Title>
        <Text mb={20} c={"gray.6"}>Customize your path to a more secure and personalized you. Protect your digital identity with tailored settings. Unlock a more confident online experience.</Text>
        <Box bg="gray.1" p={"lg"} style={{ borderRadius: "10px", width: "70%", margin: "20px 0px 0px"}}>
          <Title mb={10} order={4} fw={"lighter"} c={"red.6"}>Password refresh, soul refresh</Title>
          <form onSubmit={formSettings.onSubmit((values, event) => {
            event.preventDefault();
            handleSubmitSettings(values);
          })}>
            <PasswordInput className={`${styles.input}`} label="Current Password" placeholder="Password" size="md" w={"65%"} icon={<IconLock size={18} />} mb="md" {...formSettings.getInputProps("password")} />
            <PasswordInput className={`${styles.input}`} label="New Password" placeholder="New Password" size="md" w={"65%"} icon={<IconLock size={18} />} mb="md" {...formSettings.getInputProps("newPassword")} />
            <PasswordInput className={`${styles.input}`} label="Confirm Password" placeholder="Confirm Password" size="md" w={"65%"} icon={<IconLock size={18} />} mb="md" {...formSettings.getInputProps("confirmPassword")} />
            <Button type="submit" variant="filled">
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    
  )
}

export default ProfileSettingsPage;