import { Button, Form, Input, Modal, Select } from "antd";
import CustomTable from "../../components/CustomTable";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import getTasks from "../../services/getTasks";
import { Option } from "antd/es/mentions";
import updateTasks from "../../services/updateTasks";
import deleteTasks from "../../services/deleteTasks";
import addTasks from "../../services/addTasks";
import { PlusOutlined } from "@ant-design/icons";

export const Tasks = () => {
  const tasks = getTasks();
  const deleteData = deleteTasks();
  const updateData = updateTasks();
  const addData = addTasks();
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState(false);
  const [state, setState] = useState(null);

  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const columns = [
    {
      key: 1,
      dataIndex: "name",
    },
    {
      key: 2,
      dataIndex: "type",
    },
    {
      key: 3,
      dataIndex: "id",
      render: (id) => (
        <Button
          onClick={() => {
            const data = tasks.data.find((u) => u.id == id);

            setState("update");
            setType(data.type);
            setName(data.name);
            setModal(true);
            setId(id);
          }}
          style={{ backgroundColor: "green" }}
          type="primary"
        >
          Update
        </Button>
      ),
    },
    {
      key: 4,
      dataIndex: "id",
      render: (id) => (
        <Button
          onClick={() => {
            setModalDelete(true);
            setId(id);
          }}
          style={{ backgroundColor: "red" }}
          type="primary"
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Toaster position="'top-center" />
      <div className="flex w-full pb-4 justify-start">
        <Button
          onClick={() => {
            setState("add");
            setModal(true);
          }}
          type="primary"
          style={{ backgroundColor: "#14B890" }}
        >
          <PlusOutlined />
          <h2 className="font-medium text-sm">{"Vazifa qo'shish"}</h2>
        </Button>
      </div>
      <CustomTable
        data={tasks.data}
        loading={deleteData.isPending}
        columns={columns}
        scroll={{ x: 5, y: 500 }}
      />
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        onClose={() => setModal(false)}
        onOk={() => {
          if (state == "update") {
            updateData.mutate({
              id,
              data: { type, name },
            });
            if (deleteData.isSuccess) toast.success("Tasks Updated");
            setModal(false);
            setState(null);
          }
          if (state == "add") {
            addData.mutate({ type, name });
            if (addData.isSuccess) toast.success("Tasks Added");
            setModal(false);
            setState(null);
          }
          setState(null);
          setId(null);
          setType("");
          setName("");
        }}
        className="!flex flex-col items-center"
      >
        <p className="text-xl">Update User</p>
        <div className="flex pt-5 flex-col w-[300px]">
          <Form.Item label="Hodim turi" layout="vertical">
            <Select
              onChange={(e) => setType(e)}
              defaultValue={type == "manager" ? "manager" : "employee"}
            >
              <Option value="manager">manager</Option>
              <Option value="employee">employee</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Vazifa nomi" layout="vertical">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
        </div>
      </Modal>
      <Modal
        open={modalDelete}
        onCancel={() => setModalDelete(false)}
        onClose={() => setModalDelete(false)}
        onOk={() => {
          deleteData.mutate(id);
          if (deleteData.isSuccess) toast.success("Manager Deleted");
          setModalDelete(false);
          setId(null);
        }}
      >
        <p className="text-xl"> Are you sure</p>
      </Modal>
    </div>
  );
};
