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

export const Manager = () => {
  const managers = getManagers();
  const deleteMuation = deleteManagerMuation();
  const updateMuation = updateManagerMuation();
  const addMutation = addManagerMuation();
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState(false);
  const [state, setState] = useState(null);
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [last_name, setLname] = useState("");
  const [status, setStatus] = useState();

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
            e.stopPropagation();
            const data = managers.data.find((u) => u.id == id);
            setState("update");
            setEmail(data.email);
            setName(data.name);
            setLname(data.last_name);
            setStatus(data.isActive);
            setType(data.type || "");
            setId(id);
            setModal(true);
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
        managers.data.filter((u) => u.name.toLowerCase().includes(inputValue))
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

  const handleModalSubmit = () => {
    if (state === "update") {
      const currentManager = managers.data.find((m) => m.id === id);
      const updateData = {
        email,
        name,
        last_name,
        type,
        isActive: status,
        tasks: Array.isArray(currentManager?.tasks) ? currentManager.tasks : [],
      };

      updateMuation.mutate(
        {
          id,
          data: updateData,
        },
        {
          onSuccess: () => {
            toast.success("Manager Updated");
            setModal(false);
            resetForm();
          },
        }
      );
    } else if (state === "add") {
      addMutation.mutate(
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
            toast.success("Manager Added");
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
      <div className="flex w-full pb-4 justify-start">
        <Button
          className="block mr-[25px] bg-darkGreen text-[white]"
          onClick={() => {
            setState("add");
            resetForm();
            setModal(true);
          }}
          type="primary"
          style={{ backgroundColor: "#14B890" }}
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
        data={isHaveData && isEmpty ? stuffs : managers.data}
        loading={deleteMuation.isPending}
        columns={columns}
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
        className="!flex flex-col items-center"
      >
        <p className="text-xl">
          {state === "update" ? "Update User" : "Add User"}
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
            <Select value={type} onChange={(value) => setType(value)}>
              <Option value="manager">Manager</Option>
              <Option value="employee">Employee</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Activity" layout="vertical">
            <Select
              value={status ? "active" : "diactive"}
              onChange={(value) => setStatus(value === "active")}
            >
              <Option value="active">Active</Option>
              <Option value="diactive">DiActive</Option>
            </Select>
          </Form.Item>
        </div>
      </Modal>
      <Modal
        open={modalDelete}
        onCancel={() => setModalDelete(false)}
        onClose={() => setModalDelete(false)}
        onOk={() => {
          deleteMuation.mutate(id, {
            onSuccess: () => {
              toast.success("Manager Deleted");
              setModalDelete(false);
              setId(null);
            },
          });
        }}
      >
        <p className="text-xl">Are you sure</p>
      </Modal>
    </div>
  );
};
