import { AuthContext } from '@/context/AuthContext';
import { Box, Container, Group, Image, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import styles from "./styles.module.css";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IconBulbFilled, IconKeyFilled } from '@tabler/icons-react';

function UserProfileLayout() {
  const {user}=useContext(AuthContext);
  const navigate=useNavigate();
  const location=useLocation();
  const [active,setActive]=useState(location.pathname === "/user/profile");
  
  useEffect(()=>{},[location.pathname])

  return (
    <>
      <Container ml={0} p={0} style={{maxWidth:"none"}}>
        <Group pl={60} pb={10} align='flex-start' style={{borderBottom:"1px solid #dcdedf"}}>
          <Image src={"/src/assets/profile.png"} fit="cover" h={"160px"}/>
          <Box c={"red.6"}>
            <h1 style={{margin:"30px 0 0 0"}}>{user.userName}&apos;s Profile</h1>
            <Text fz={"18px"} c={"gray.6"} style={{fontStyle:"italic"}}>This is your personal space, tailored to your needs and preferences.</Text>
          </Box>
        </Group>
        <Group align='flex-start' mt={20}>
          <Box w={"16%"} h={"50vh"} style={{borderRight:"1px solid #dcdedf"}} pt={20} pr={4}>
            <Box
              className={`${styles.sidebutton} ${active ? `${styles.active}` : ""}`}
              onClick={()=>{
              setActive(true);
              navigate("/user/profile")
            }}>
              <IconBulbFilled style={{verticalAlign:"sub",marginRight:"4px"}} size="1.5rem" stroke={1.5}/>
              Profile Information
            </Box>
            <Box 
              className={`${styles.sidebutton} ${!active ? `${styles.active}` : ""}`}
              onClick={()=>{
              setActive(false);
              navigate("/user/settings")
            }}>
              <IconKeyFilled style={{verticalAlign:"sub",marginRight:"4px"}} size="1.5rem" stroke={1.5}/>
              Profile Settings
            </Box>
          </Box>
          <>
            <Outlet/>
          </>
        </Group>
      </Container>
    </>
  );
}

export default UserProfileLayout;