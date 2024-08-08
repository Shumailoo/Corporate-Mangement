import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Title, Table, Button, Flex, Image, Pagination, ActionIcon } from "@mantine/core";
import { IconEye, IconPencil, IconTrash, IconUserPlus } from "@tabler/icons-react";
import axios from "axios";
import ModalCustom from "@/components/ModalCustom";
import { useModal } from "@/customHooks/useModal";

const tableHead = ["Serial#", "Name", "Email", "Shift", "Position", "Actions"];

const ViewEmployeePage = () => {
  const { loadedEmployees, total } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const { activePageEdit } = location?.state || {};
  const { isOpen, content, openModal, closeModal } = useModal();

  // states for pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePage, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [itemsPerPage] = useState(4);
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
    navigate("add-employee", { state: { newId: loadedEmployees.length + 1 } });
  };

  const handleInfo = employee => {
    openModal({
      type: "info",
      data: employee,
      contentType: "employee",
    });
  };

  const handleEdit = employeeEdit => {
    navigate(`add-employee?id=${employeeEdit.id}`, {
      state: {
        employeeEdit: employeeEdit,
        loadedEmployees: loadedEmployees,
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
      const req = await axios.delete(`http://localhost:5100/employees/${id}`);
      if (req.status === 200) {
        console.log("employee deleted");
      } else {
        console.log("employee delete error");
      }
      navigate("/employees", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
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
                      {index + 1}
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
                            employee.id ? handleEdit(employee) : void 0;
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
      <Pagination total={Math.ceil(total / itemsPerPage)} value={activePage} onChange={setPage} mt="sm" />
      {isOpen && <ModalCustom content={content} onDelete={deleteEmployee} onClose={closeModal} />}
    </Flex>
  );
};

export default ViewEmployeePage;

export const EmployeeLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const perPage = 4;
  const res = await axios.get(`http://localhost:5100/employees?_page=${page}&_per_page=${perPage}`);
  if (res.status === 200) {
    return {
      loadedEmployees: res.data.data,
      total: res.data.items,
    };
  } else {
    console.log("error fetch employee");
  }
};
