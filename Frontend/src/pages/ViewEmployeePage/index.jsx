import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Title, Table, Button, Flex, Image, Pagination, ActionIcon, LoadingOverlay } from "@mantine/core";
import { IconEye, IconPencil, IconTrash, IconUserPlus } from "@tabler/icons-react";
import axios from "axios";
import ModalCustom from "@/components/ModalCustom";
import { useModal } from "@/customHooks/useModal";
import { useDisclosure } from "@mantine/hooks";

const tableHead = ["Serial#", "Name", "Email", "Shift", "Position", "Actions"];

const ViewEmployeePage = () => {
  const [visible, { open,close }] = useDisclosure(false);
  const { loadedEmployees, totalItems,currentPage,totalPages } = useLoaderData();
  // console.log(loadedEmployees,totalItems,totalPages,currentPage);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { activePageEdit } = location?.state || {};
  const { isOpen, content, openModal, closeModal } = useModal();

  // states for pagination
  const [ searchParams,setSearchParams ] = useSearchParams();
  const [activePage, setPage] = useState(parseInt(currentPage || searchParams.get("page") || 1));
  
  const itemsPerPage = Math.ceil(totalItems/totalPages);
  // indeces for pagination
  // const startIndex = (activePage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // //pagination sliced array
  // const paginatedEmployees = loadedEmployees.slice(startIndex, endIndex);

  useEffect(() => {
    if (activePageEdit > 0) {
      setPage(activePageEdit);
    }
  }, [activePageEdit]);

  useEffect(() => {
    setSearchParams({ page: activePage });
  }, [activePage, setSearchParams]);

  const handleAdd = () => {
    navigate("add-employee");
  };

  const handleInfo = employee => {
    openModal({
      type: "info",
      data: employee,
      contentType: "employee",
    });
  };

  const handleEdit = employeeEdit => {
    // console.log(12);
    
    navigate(`add-employee?id=${employeeEdit._id}`, {
      state: {
        employeeEdit: employeeEdit,
      },
    });
    setPage(activePage);
  };

  const handleDelete = employee => {
    openModal({
      type: "delete",
      data: employee,
      contentType: "employee",
    });
  };

  const deleteEmployee = async id => {
    try {
      open();
      const req = await axios.delete(`http://localhost:5000/api/employee/employees/${id}`);
      if (req.status === 200) {
        
        console.log("employee deleted");
      } else {
        console.log("employee delete error");
      }
      navigate("/employees", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      close();
      closeModal();
    }
  };

  return (
    <Flex direction={"column"} align={"center"} justify={"center"} m={"0 auto"} w={"max-content"}>
      <Title order={1} mb={20} c={"red.7"}>
      
        Employee Table
      </Title>
      <Button variant="filled" mb={20} style={{ alignSelf: "flex-end" }} onClick={handleAdd}>
        Add Employee
        <IconUserPlus size={18} />
      </Button>
      <Table highlightOnHover striped withTableBorder horizontalSpacing={"xl"} verticalSpacing={"sm"}>
        <Table.Thead>
          <Table.Tr>
            {tableHead.map((item, index) => {
              return (
                <Table.Td c={"red.5"} style={{ fontWeight: 600 }} key={index}>
                  {item}
                </Table.Td>
              );
            })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loadedEmployees.length > 0
            ? loadedEmployees.map((employee, index) => {
                return (
                  <Table.Tr key={employee.email}>
                    <Table.Td onClick={handleInfo.bind(null, employee)} align="center">
                      {activePage==1?index+1:((activePage-1)*itemsPerPage)+index+1}
                    </Table.Td>
                    <Table.Td onClick={handleInfo.bind(null, employee)}>
                      <Flex align={"center"}>
                        <Image mr={10} src="/src/assets/employeesProfile/empl_profile.png" h={40} w={40} fit="contain" />
                        {employee.name}
                      </Flex>
                    </Table.Td>
                    <Table.Td onClick={handleInfo.bind(null, employee)}>{employee.email}</Table.Td>
                    <Table.Td onClick={handleInfo.bind(null, employee)}>{employee.shift}</Table.Td>
                    <Table.Td onClick={handleInfo.bind(null, employee)}>{employee.position}</Table.Td>
                    <Table.Td>
                      <Flex gap={"md"}>
                        <ActionIcon
                          variant="light"
                          onClick={() => {
                            handleInfo(employee);
                          }}
                        >
                          <IconEye />
                        </ActionIcon>
                        <ActionIcon
                          variant="outline"
                          onClick={() => {
                            employee._id ? handleEdit(employee) : void 0;
                          }}
                        >
                          <IconPencil />
                        </ActionIcon>
                        <ActionIcon
                          onClick={() => {
                            handleDelete(employee);
                          }}
                        >
                          <IconTrash />
                        </ActionIcon>
                      </Flex>
                    </Table.Td>
                  </Table.Tr>
                );
              })
            : null}
        </Table.Tbody>
      </Table>
      <Pagination total={totalPages} value={activePage} onChange={setPage} mt="sm" />
      <LoadingOverlay visible={visible} loaderProps={{type:"oval"}} />
      {isOpen && <ModalCustom content={content} onDelete={deleteEmployee} onClose={closeModal} />}
    </Flex>
  );
};

export default ViewEmployeePage;

export const EmployeeLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const res = await axios.get(`http://localhost:5000/api/employee/employees?page=${page}`);
  if (res.status === 200) {
    // console.log(res.data);
    
    return {
      loadedEmployees: res.data.employees,
      totalItems: res.data.totalItems,
      currentPage:res.data.currentPage,
      totalPages: res.data.totalPages,
    };
  } else {
    console.log("error fetch employee");
  }
};
