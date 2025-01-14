import { SearchOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal, Select } from "antd"
import { useState } from "react";
import getEmployee from "../../services/getEmployee";
import { debounce } from "lodash";
import CustomTable from "../../components/CustomTable";
import deleteEmployee from "../../services/deleteEmployee";
import updateEmployee from "../../services/updateEmployee";
import addEmployee from "../../services/addEmployee";
import { Option } from "antd/es/mentions";
import toast, { Toaster } from "react-hot-toast";
import getManagers from "../../services/getManagers";

const BlockLanganar = () => {
  const employee = getEmployee();
  const managers = getManagers();
  const allemployee = employee.data.concat(managers.data).filter(m => m.isActive ? m : null);

  const deleteEm = deleteEmployee();
  const updateEm = updateEmployee();
  const addEm = addEmployee();
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState(false);
  const [state, setState] = useState(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [last_name, setLname] = useState("");
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState();

  const resetForm = () => {
    setEmail("");
    setName("");
    setLname("");
    setStatus("");
    setType("");
    setId(null);
    setState(null);
  };
  const columns = [
    {
      key: 1,
      title: "Name",
      dataIndex: "name",
    },
    {
      key: 1,
      title: "Last name",
      dataIndex: "last_name",
    },
    {
      key: 1,
      title: "Type",
      dataIndex: "type",
    },
    {
      key: 2,
      title: "Email",
      dataIndex: "email",
    },
    {
      key: 3,
      title: "Phone",
      dataIndex: "phone",
    },
    {
      key: 4,
      title: "Update",
      dataIndex: "id",
      render: (id) => (
        <Button
          onClick={(e) => {
            const data = employee.data.find((u) => u.id == id);
            e.stopPropagation();
            setState("update");
            setEmail(data.email);
            setName(data.name);
            setLname(data.last_name);
            setStatus(data.isActive);
            setType(data.type);
            setModal(true);
            setId(id);
          }}
          style={{ backgroundColor: "#14B890" }}
          type="primary"
        >
          Update
        </Button>
      ),
    },
    {
      key: 5,
      title: "Delete",
      dataIndex: "id",
      render: (id) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setModalDelete(true);
            setId(id);
          }}
          style={{ backgroundColor: "#F44336" }}
          type="primary"
        >
          Delete
        </Button>
      ),
    },
  ];

  const [stuffs, setStuffs] = useState([]);
  const [isHaveData, setIsHaveData] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);


  // console.log(stuffs ? 'hi' : 'hi');


  const handleSearch = (input) => {
    console.log(input);

    let inputValue = input.toLowerCase();

    if (inputValue && inputValue.length > 1) {
      setStuffs(
        allemployee.filter((u) => u.name.toLowerCase().includes(inputValue))
      );
    } else {
      setStuffs([]);
    }

    if (inputValue.length >= 3) {
      setIsHaveData(true);
      setIsEmpty(true);
    } else {
      setIsHaveData(false);
      setIsEmpty(false);
    }
  };

  const debouncedSearch = debounce(handleSearch, 1000);

  // let newEmployee = employee.data


  const handleModalSubmit = () => {
    if (state === "update") {
      const currentManager = employee.data.find((m) => m.id === id);
      const updateData = {
        email,
        name,
        last_name,
        type,
        isActive: status,
        tasks: Array.isArray(currentManager?.tasks) ? currentManager.tasks : [],
      };

      updateEm.mutate(
        {
          id,
          data: updateData,
        },
        {
          onSuccess: () => {
            toast.success("Employee Updated");
            setModal(false);
            resetForm();
          },
        }
      );
    } else if (state === "add") {
      addEm.mutate(
        {
          email,
          name,
          last_name,
          type,
          isActive: status,
          tasks: [],
        },
        {
          onSuccess: () => {
            toast.success("Employee Added");
            setModal(false);
            resetForm();
          },
        }
      );
    }
  };

  return (
    <div>
      <Toaster position="'top-center" />
      <div className="flex w-[346px] pb-4">
        <Input
          size="large"
          placeholder="Isim bo'yicha qidirish"
          prefix={<SearchOutlined />}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <CustomTable
        data={isHaveData && isEmpty ? stuffs : allemployee}
        loading={deleteEm.isPending}
        columns={columns}
        page={currentPage}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(current, size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        routePath={type && type == "employee" ? "employee" : "manager"}
        scroll={{ x: 5, y: 500 }}
      />
      <Modal
        open={modal}
        onCancel={() => {
          resetForm();
          setModal(false);
        }}
        onClose={() => setModal(false)}
        onOk={handleModalSubmit}
        className="!flex flex-col items-center top-1"
      >
        <p className="text-xl">
          {state == "update" ? "Hodimni o'zgartirish" : "Hodim qo'shish"}
        </p>
        <div className="flex pt-5 flex-col w-[300px]">
          <Form.Item label="Email" layout="vertical">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Name" layout="vertical">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Last name" layout="vertical">
            <Input
              value={last_name}
              onChange={(e) => setLname(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Type" layout="vertical">
            <Select
              onSelect={(value) => setType(value)}
              defaultValue={type == "manager" ? "manager" : "employee"}
            >
              <Option value="manager" key="manager">
                Manager
              </Option>
              <Option value="employee" key="employee">
                Employee
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label="Activity" layout="vertical">
            <Select
              onSelect={(value) => console.log(value)}
              defaultValue={status ? "active" : "diactive"}
            >
              <Option value="active" key="active">
                Active
              </Option>
              <Option value="diactive" key="diactive">
                DiActive
              </Option>
            </Select>
          </Form.Item>
        </div>
      </Modal>
      <Modal
        open={modalDelete}
        onCancel={() => setModalDelete(false)}
        onClose={() => setModalDelete(false)}
        onOk={() => {
          deleteEm.mutate(id);
          if (deleteEm.isSuccess) toast.success("Manager Deleted");
          setModalDelete(false);
          setId(null);
        }}
      >
        <p className="text-xl"> Are you sure</p>
      </Modal>
    </div>
  );
};
export default BlockLanganar;
