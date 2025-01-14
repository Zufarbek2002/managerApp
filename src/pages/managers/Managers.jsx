import { Button, Form, Input, Modal, Select } from "antd";
import CustomTable from "../../components/CustomTable";
import getManagers from "../../services/getManagers";
import deleteManagerMuation from "../../services/deleteManager";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Option } from "antd/es/mentions";
import updateManagerMuation from "../../services/updateManager";
import addManagerMuation from "../../services/addManagerMutation";
import { debounce } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import getEmployee from "../../services/getEmployee";

export const Manager = () => {
  const employee = getEmployee();
  const manAger = getManagers();
  const managers = employee.data.concat(manAger.data).filter(m => m.type == 'manager' ? m : null);
  console.log(managers);
  

  const deleteMuation = deleteManagerMuation();
  const updateMuation = updateManagerMuation();
  const addMutation = addManagerMuation();
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState(false);
  const [state, setState] = useState(null);
  const [type, setType] = useState();
  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [last_name, setLname] = useState("");
  const [status, setStatus] = useState();
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
      key: 2,
      title: "Email",
      dataIndex: "email",
    },
    {
      key: 2,
      title: "Type",
      dataIndex: "type",
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
            const data = managers.find((u) => u.id == id);
            e.stopPropagation();
            setState("update");
            setEmail(data.email);
            setName(data.name);
            // setLname(data.last_name);
            setStatus(data.isActive);
            // setType(data.type || "");
            setId(id);
            setStatus(data.isActive);
            setModal(true);
            setType[data?.type];
            setTasks[data?.tasks];
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

  const handleSearch = (input) => {
    let inputValue = input.toLowerCase();

    if (inputValue && inputValue.length > 1) {
      setStuffs(
        managers.filter((u) => u.name.toLowerCase().includes(inputValue))
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

  const debouncedSearch = debounce(handleSearch, 500);
  return (
    <div>
      <Toaster position="'top-center" />
      <div className="flex w-full pb-4 justify-start">
        <Button
          className="block mr-[25px] bg-darkGreen text-[white]"
          onClick={() => {
            setState("add");
            setModal(true);
          }}
        >
          Add Task
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
        data={isHaveData && isEmpty ? stuffs : managers}
        loading={deleteMuation.isPending}
        columns={columns}
        scroll={{ x: 5, y: 500 }}
      />
      <Modal
        open={modal}
        onCancel={() => {
          setEmail("");
          setName("");
          setStatus("");
          setType("");
          setModal(false);
        }}
        onClose={() => setModal(false)}
        onOk={() => {
          if (state == "update") {
            updateMuation.mutate({
              id,
              data: { email, name, last_name, type, tasks, isActive: status },
            });
            if (deleteMuation.isSuccess) toast.success("Manager Updated");
            setModal(false);
            setState(null);
          }
          if (state == "add") {
            addMutation.mutate({
              email,
              name,
              last_name,
              type,
              tasks,
              isActive: status,
            });
            if (addMutation.isSuccess) toast.success("Manager Added");
            setModal(false);
            setState(null);
          }
          setState(null);
          setId(null);
          setEmail("");
          setName("");
          setStatus("");
          setType("");
        }}
        className="!flex flex-col items-center"
      >
        <p className="text-xl">Update User</p>
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
          deleteMuation.mutate(id);
          if (deleteMuation.isSuccess) toast.success("Manager Deleted");
          setModalDelete(false);
          setId(null);
        }}
      >
        <p className="text-xl"> Are you sure</p>
      </Modal>
    </div>
  );
};
