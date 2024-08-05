import { ActionIcon, Flex } from "@mantine/core";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import EmployeeContext from "@/context/employeeContext";
// import { useContext } from "react";

const ActionButton=(props)=>{
    // const navigate=useNavigate();
    const email=props.email;
    const id=props.id;
    // const {employees,setEmployees}=useContext(EmployeeContext);

    // const handleEdit=()=>{
    //     navigate(`/add-employee?email=${props.email}`);
    //     // navigate('/add-employee');
    // };

    // const handleDelete = () => {
    //     const newEmployees = employees.filter((employee) => employee.email !== email);
    //     setEmployees(newEmployees);
    // };

    
    return(<Flex gap={'md'}>
        <ActionIcon variant="light" onClick={()=>{props.handleInfo(email)}}><IconEye /></ActionIcon>
        <ActionIcon variant="outline" onClick={()=>{email?props.handleEdit(email):props.handleEdit(id)}} ><IconPencil /></ActionIcon>
        <ActionIcon  onClick={()=>{props.handleDelete(email)}}><IconTrash /></ActionIcon>
    </Flex>
    );
};

ActionButton.propTypes = {
    email: PropTypes.string,
    id: PropTypes.string,
    handleInfo:PropTypes.func,
    handleEdit:PropTypes.func,
    handleDelete:PropTypes.func,
};

export default ActionButton;