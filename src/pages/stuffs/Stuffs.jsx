import { Button, Form, Input, Modal, Select } from "antd";
import CustomTable from "../../components/CustomTable";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Option } from "antd/es/mentions";
import getEmployee from "../../services/getEmployee";
import deleteEmployee from "../../services/deleteEmployee";
import updateEmployee from "../../services/updateEmployee";
import addEmployee from "../../services/addEmployee";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import getManagers from "../../services/getManagers";

const Stuffs = () => {


  const emPloyes = getEmployee();
  const manAger = getManagers();

  const employee = emPloyes.data.concat(manAger.data).filter(m => m.type == "employee" ? m : null);

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
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState();

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
        className="bg-darkGreen"
          onClick={(e) => {
            const data = employee.find((u) => u.id == id);
            e.stopPropagation();
            setState("update");
            setEmail(data.email);
            setName(data.name);
            setLname(data.last_name);
            setStatus(data.isActive);
            setType(data.type);
            setModal(true);
            setId(id);
            setTasks([]);
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




  const handleSearch = (input) => {
    let inputValue = input.toLowerCase();

    if (inputValue && inputValue.length > 1) {
      setStuffs(
        employee.filter((u) => u.name.toLowerCase().includes(inputValue))
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

  let newEmployee = employee

  return (
    <div>
      <Toaster position="'top-center" />
      <div className="flex w-full pb-4 justify-start">
        <Button
          className="flex mr-[25px] bg-darkGreen text-[white]"
          onClick={() => {
            setState("add");
            setModal(true);
          }}
          type="primary"
          style={{ backgroundColor: "#14B890" }}
        >
          <PlusOutlined />
          <h2 className="font-medium text-sm">{"Hodim qo'shish"}</h2>
        </Button>
      </div>
      <div className="flex w-[346px] pb-4">
        <Input
          size="large"
          placeholder="Isim bo'yicha qidirish"
          prefix={<SearchOutlined />}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <CustomTable
        data={isHaveData && isEmpty ? stuffs : newEmployee}
        loading={deleteEm.isPending}
        columns={columns}
        page={currentPage}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(current, size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        routePath={type && type == "manager" ? "manager" : "employee"}
        scroll={{ x: 5, y: 500 }}
      />
      <Modal
        open={modal}
        onCancel={() => {
          setEmail("");
          setName("");
          setLname("");
          setStatus("");
          setType("");
          setModal(false);
        }}
        onClose={() => setModal(false)}
        onOk={() => {
          if (state == "update") {
            updateEm.mutate({
              id,
              data: { email, name, last_name, type, tasks, isActive: status ? true : false },
            });
            if (deleteEm.isSuccess) toast.success("Manager Updated");
            setModal(false);
            setState(null);
          }
          if (state == "add") {
            addEm.mutate({
              email,
              name,
              last_name,
              type,
              tasks,
              isActive: status ? true : false,
            });
            if (addEm.isSuccess) toast.success("Manager Added");
            setModal(false);
            setState(null);
          }
          setState(null);
          setId(null);
          setEmail("");
          setName("");
          setLname("");
          setStatus("");
          setType("");
          setTasks([]);
        }}
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
export default Stuffs;
