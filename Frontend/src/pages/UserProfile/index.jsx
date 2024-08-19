import { AuthContext } from '@/context/AuthContext';
import { Box, Container, Group, Image, Tabs, Text } from '@mantine/core';
import { useContext, useEffect,  } from 'react';
import { useLocation,  } from 'react-router-dom';
import { IconBulbFilled, IconKeyFilled } from '@tabler/icons-react';
import ProfileContentPage from './ProfileContentPage';
import ProfileSettingsPage from './ProfileSettingsPage';
import classes from "./styles.module.css";
import axios from 'axios';


function UserProfileLayout() {
  const {user}=useContext(AuthContext);
  const location=useLocation();
  
  useEffect(()=>{},[location.pathname])

  return (
    <>
      <Container ml={0} p={0} style={{maxWidth:"none"}}>
        <Group pl={60} pb={20} align='flex-start' style={{borderBottom:"1px solid #dcdedf"}}>
          <Image src={"/src/assets/profile.png"} fit="cover" h={"160px"}/>
          <Box c={"red.6"}>
            <h1 style={{margin:"30px 0 0 0"}}>{user.userName}&apos;s Profile</h1>
            <Text fz={"18px"} c={"gray.6"} style={{fontStyle:"italic"}}>This is your personal space, tailored to your needs and preferences.</Text>
          </Box>
        </Group>
      </Container>
      <Tabs mt={20} c={"gray.8"} fz={16} variant='default' orientation='vertical' defaultValue='information'classNames={{
        tab:classes["my_tab"],
      }}>
        <Tabs.List mr={10} justify='start'>
          <Tabs.Tab my={5} value='information' leftSection={<IconBulbFilled style={{verticalAlign:"sub",marginRight:"4px"}} size="1.5rem" stroke={1.5}/>}>Profile Information</Tabs.Tab>
          <Tabs.Tab value='settings' leftSection={<IconKeyFilled style={{verticalAlign:"sub",marginRight:"4px"}} size="1.5rem" stroke={1.5}/>}>Profile Information</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='information'>
          <ProfileContentPage/>
        </Tabs.Panel>
        <Tabs.Panel value='settings'>
          <ProfileSettingsPage/>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default UserProfileLayout;

export const UserDataLoader=async()=>{
  const {user}=useContext(AuthContext);
  const res=await axios.get(`http://localhost:5000/api/user/users/${user.userId}`);
  if(res.status==200){
    console.log(res.data);
    
    return res.data;
  }else{
    return {error:"error fetching user data"}
  }
}