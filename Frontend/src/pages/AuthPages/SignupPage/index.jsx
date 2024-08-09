import { Container, Text, Button, PasswordInput, TextInput, Anchor, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconAt, IconLock, IconUser } from "@tabler/icons-react";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";

function SignUpPage() {
  const [visible, { open,close }] = useDisclosure(false);
  const { loadedUsers }=useLoaderData();
  const navigate=useNavigate();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: value => (value.length <= 2 ? "Name must be more than 2 characters long" : null),
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: value => (value.length < 2 ? "Password should be at least 2 characters long" : null),
      confirmPassword: (value, values) => (value !== values.password ? "Passwords do not match" : null),
    },
  });

  const handleSubmit=async (values)=>{
    open();
    try {
      const user=loadedUsers.find(user=>user.email===values.email);
      if(user){
        // alert('User already exists');
        close();
        notifications.show({
          title:"User Already Exists",
          message:"These credentials are already associated with an account. Please use a different credentials.",
          autoClose:1500,
        })
      }else{
        const user={
          id:loadedUsers.length+1,
          name:values.name,
          email:values.email,
          password:values.password
        }
        const res=await axios.post("http://localhost:5102/users",{...user});
        if(res.status===201){
          console.log("new user created");
          notifications.show({
            title:"User Created Successfully",
            message:"You've taken the first step to an amazing journey! Log in now and explore!",
            autoClose:1500,
            color:"green"
          })
        }else{
          console.log('new user not created');
        }
        form.reset();
        setTimeout(() => {
          navigate("/login",{replace:true});
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }finally{
      close();
    }
  }

  return (
    <Container size="lg" w={350} py="xl">
      <LoadingOverlay visible={visible} loaderProps={{type:"oval"}} />
      <Text align="center" size="xl" weight="bold" mb="md">
        Create an account
      </Text>
      <Text align="center" size="sm" color="gray" mb="lg">
        Please enter your details to sign up
      </Text>
      <form onSubmit={form.onSubmit((values,event) => {
        event.preventDefault();
        handleSubmit(values);
      })}>
        <TextInput label="Name" placeholder="Your name" size="md" icon={<IconUser size={18} />} mb="md" {...form.getInputProps("name")} />
        <TextInput label="Email" placeholder="your@email.com" size="md" icon={<IconAt size={18} />} mb="md" {...form.getInputProps("email")} />
        <PasswordInput label="Password" placeholder="Password" size="md" icon={<IconLock size={18} />} mb="md" {...form.getInputProps("password")} />
        <PasswordInput label="Confirm Password" placeholder="Confirm Password" size="md" icon={<IconLock size={18} />} mb="md" {...form.getInputProps("confirmPassword")} />
        <Button type="submit" w={"100%"} size="md" radius="md">
          Sign Up
        </Button>
      </form>
      <Text align="center" size="sm" mt="md" c={"gray"}>
        Already have an account?{" "}
        <Anchor c={"red"} href="/login">
          Log In
        </Anchor>
      </Text>
    </Container>
  );
}

export default SignUpPage;

export const UsersLoader=async()=>{
  const res=await axios.get('http://localhost:5102/users');
  if(res){
    return{
      loadedUsers:res.data
    }
  }else{
    console.log('users not found');
  }
}
