import { Container, Text, Button, Group, PasswordInput, TextInput, Anchor, Divider, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconBrandFacebookFilled, IconBrandGoogleFilled, IconBrandX, IconLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
// import axios from "axios";
import axiosInstance from "@/axiosInstance";

function LoginPage() {
  const [visible, { open,close }] = useDisclosure(false);
  const {isAuthenticated,login}=useContext(AuthContext);
  const navigate=useNavigate();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: value => (value.length < 2 ? "Password should be at least 2 characters long" : null),
    },
  });

  // useEffect(()=>{
  //   const statusFetch=async()=>{
  //     open();
  //     try {
  //       const statusRes=await axiosInstance.get("http://localhost:5000/api/auth/status");
  //       if(statusRes.status==200){
  //         login({
  //           username:statusRes.data.user.username,
  //           _id:statusRes.data.user._id,
  //           email:statusRes.data.user.email,
  //           bio:statusRes.data.user.bio,
  //           location:statusRes.data.user.location,
  //         })
  //         close();
  //         navigate("/employees",{replace:true});
  //       }
  //     } catch (error) {
  //       if(error.response.status==401){
  //         close();
  //         return navigate("/login", { replace: true });
  //       }
  //     }
  //   }
  //   statusFetch();
  // },[])

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/employees", { replace: true });
    } else {
      const statusFetch = async () => {
        open();
        try {
          const statusRes = await axiosInstance.get("http://localhost:5000/api/auth/status");
          if (statusRes.status === 200) {
            login({
              username: statusRes.data.user.username,
              _id: statusRes.data.user._id,
              email: statusRes.data.user.email,
              bio: statusRes.data.user.bio,
              location: statusRes.data.user.location,
            });
            close();
            navigate("/employees", { replace: true });
          }
        } catch (error) {
          if (error.response?.status === 401) {
            close();
            return navigate("/login",{replace:true});
          }
        }
      };
      statusFetch();
    }
  }, []);

  const handleSubmit=async(values)=>{
    open();
    const user={
      email:values.email,
      password:values.password,
    }
    if(!isAuthenticated){
      try {
        const res=await axiosInstance.post("http://localhost:5000/api/auth/login",{...user});
        // console.log(res);
      
        if(res.status==200){
          login({
            username:res.data.user.username,
            _id:res.data.user._id,
            email:res.data.user.email,
            bio:res.data.user.bio,
            location:res.data.user.location,
          })
        } 
        notifications.show({
          title:res.data.messageTitle,
          message:res.data.message,
          autoClose:1800,
          color:"green"
        })
        // console.log(res);
        
      }catch (error) {
        if(error.response.status==401){
          notifications.show({
            title:error.response.data.messageTitle,
            message:error.response.data.message,
            autoClose:1800,
          })
          close();
        form.reset();
        return navigate("/login", { replace: true });
      } else {
        console.error(error);
      }
    }
  } else {
    console.log("User already logged in");
  }
    
    close();
    navigate("/employees",{replace:true});
  }

  return (
    <Container size="lg" w={350} py="xl">
      <LoadingOverlay visible={visible} loaderProps={{type:"oval"}} />
      <Text align="center" size="xl" weight="bold" mb="md">
        Welcome back!
      </Text>
      <Text align="center" size="sm" color="gray" mb="lg">
        Please enter your details to sign in
      </Text>
      <form onSubmit={form.onSubmit((values,event) => {
        event.preventDefault();
        handleSubmit(values);
      })}>
        <TextInput label="Email" placeholder="your@email.com" size="md" icon={<IconAt size={18} />} mb="md" {...form.getInputProps("email")} />
        <PasswordInput label="Password" placeholder="Password" size="md" icon={<IconLock size={18} />} mb="md" {...form.getInputProps("password")} />
        <Text align="right" size="xs" color="blue" mb="md">
          <Anchor href="/login">Forgot password?</Anchor>
        </Text>
        <Button w={"100%"} type="submit" size="md" radius="md">
          Log In
        </Button>
        <Divider my={10} label="or sign in with" />
        <Group grow mb="md">
          <Button variant="outline" color="">
            <IconBrandGoogleFilled />
          </Button>
          <Button variant="outline" color="blue">
            <IconBrandFacebookFilled />
          </Button>
          <Button variant="outline" color="gray">
            <IconBrandX />
          </Button>
        </Group>
      </form>
      <Text align="center" size="sm" mt="md" c={"gray"}>
        Don&apos;t have an account? <Anchor href="/signup">Create Account</Anchor>
      </Text>
    </Container>
  );
}

export default LoginPage;
