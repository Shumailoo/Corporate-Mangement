import { AuthContext } from '@/context/AuthContext';
import { Container, Group, Title, Text, Button, PasswordInput, Stack, AppShell, AppShellNavbar, AppShellMain, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconLock } from '@tabler/icons-react';
import { useContext } from 'react';

function UserProfileLayout() {
  const [visible, { open,close }] = useDisclosure(false);
  const {user}=useContext(AuthContext);
  console.log(user);
  
  const form = useForm({
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

  const handleSubmit = async () => {
    
  };

  // return (
  //   <Flex>
  //     <Container w={"30%"}>
  //       okg
  //     </Container>
  //     <Container size="sm" ml={30}>
  //       <Stack mt={10}mb={20}>
  //         <Title c={"red.6"}>Profile</Title>
  //         <Text c={"gray.6"}>Manage your account settings</Text>
  //       </Stack>
  //       <Text>Profile Information</Text>
  //       <Text>Name: {user.userName}</Text>
  //       <Text>Email: {user.userEmail}</Text>
  //       <Text weight="bold">Account Settings</Text>
  //       <Button variant="filled">
  //         Change Password
  //       </Button>
  //       <form onSubmit={form.onSubmit((values,event)=>{
  //           event.preventDefault();
  //           handleSubmit(values);
  //         })}>
  //         <PasswordInput label="Password" placeholder="Password" size="md" icon={<IconLock size={18} />} mb="md" {...form.getInputProps("password")} />
  //         <PasswordInput label="New Password" placeholder="New Password" size="md" icon={<IconLock size={18} />} mb="md" {...form.getInputProps("newPassword")} />
  //         <PasswordInput label="Confirm Password" placeholder="Confirm Password" size="md" icon={<IconLock size={18} />} mb="md" {...form.getInputProps("confirmPassword")} />
  //         <Button type="submit" variant="filled">
  //           Submit
  //         </Button>
  //       </form>
  //     </Container>
  //   </Flex>
  
    
      
      
  // );

  return (
    
  );
}

export default UserProfileLayout;