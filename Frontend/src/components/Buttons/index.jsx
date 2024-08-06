import { ActionIcon, Flex } from "@mantine/core";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import PropTypes from "prop-types";

const ActionButton=(props)=>{
    const email=props.email;
    const id=props.id;

    
    return(<Flex gap={'md'}>
        <ActionIcon variant="light" onClick={()=>{props.handleInfo(email)}}><IconEye /></ActionIcon>
        <ActionIcon variant="outline" onClick={()=>{id?props.handleEdit(id):console.log("id");
        }} ><IconPencil /></ActionIcon>
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