import { Button, Form, Input, Modal, Select } from "antd";
import CustomTable from "../../components/CustomTable";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import getTasks from "../../services/getTasks";
import { Option } from "antd/es/mentions";
import updateTasks from "../../services/updateTasks";
import deleteTasks from "../../services/deleteTasks";
import addTasks from "../../services/addTasks";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";

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

  const [stuffs, setStuffs] = useState([]);
  const [isHaveData, setIsHaveData] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleSearch = (input) => {
    let inputValue = input.toLowerCase();

    if (inputValue && inputValue.length > 1) {
      setStuffs(tasks.data.filter((u) => u.name.toLowerCase().includes(inputValue)));
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
          className="block mr-[25px] h-9 bg-darkGreen text-[white]"
          onClick={() => {
            setState("add");
            setModal(true);
          }}
        >
          Add Task
        </Button>
        <div className="flex w-[346px] pb-4">
          <Input
            size="large"
            placeholder="vazifa bo'yicha qidirish"
            prefix={<SearchOutlined />}
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
      </div>

      <CustomTable
        data={isHaveData && isEmpty ? stuffs : tasks.data }
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
