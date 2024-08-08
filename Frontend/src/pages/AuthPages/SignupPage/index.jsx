import { Container, Text, Button, PasswordInput, TextInput, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconLock, IconUser } from "@tabler/icons-react";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";

function SignUpPage() {
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
    const user=loadedUsers.find(user=>user.email===values.email);
    if(user){
      alert('User already exists');
    }else{
      const user={
        id:loadedUsers.length+1,
        name:values.name,
        email:values.email,
        password:values.password
      }
      try {
        const res=await axios.post("http://localhost:5102/users",{...user});
        if(res.status===201){
          console.log("new user created");
        }else{
          console.log('new user not created');
        }
      } catch (error) {
        console.log(error);
      }finally{
        navigate("/login",{replace:true});
      }
    }
  }

  return (
    <Container size="lg" w={350} py="xl">
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
  console.log(res);
  
  if(res){
    return{
      loadedUsers:res.data
    }
  }else{
    console.log('users not found');
  }
}
