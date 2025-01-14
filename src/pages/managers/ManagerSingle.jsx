import { useParams } from "react-router-dom";
// import getEmployee from "../../services/getEmployee"
import getSingleStaff from "../../services/getSingleStaff";
import { Button, Modal } from "antd";
import toast from "react-hot-toast";
import { useState } from "react";
import getSpesificTasks from "../../services/getSpesificTasks";
import addSpesificTasks from "../../services/addSpesificTasks";

const ManagerSingle = () => {
  const [modalTask, setModalTask] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const { id } = useParams();
  const type = "managers";

  let data = getSingleStaff(id).data;
  const tasks = getSpesificTasks("managers").data;
  const addTask = addSpesificTasks(type, id);
  const handleCheck = (taskName) => {
    return data.tasks?.some((t) => t.name === taskName) || false;
  };
  const handleTaskChange = (checked, task) => {
    if (checked) {
      setSelectedTasks((prev) => [
        ...prev,
        { id: task.id, name: task.name, type: task.type },
      ]);
    } else {
      setSelectedTasks((prev) => prev.filter((t) => t.id !== task.id));
    }
  };
  return (
    <div className="rounded-2xl border-[1px] p-[25px] border-[#E3E1E1] h-[500px]">
      {data.name ? (
        <>
          <h1 className="font-[500] text-[24px]">{data.name}</h1>
          <h2 className="text-secondaryColor">{data.last_name}</h2>
          <div className="mt-[25px]">
            <h1 className="">hunarlari tasks</h1>
            <ul className="list-decimal text-textDarkGrey flex-col py-5">
              {data?.tasks ? (
                data.tasks.map((task, index) => (
                  <li key={index} className="ml-5">
                    {task.name}
                  </li>
                ))
              ) : (
                <p className="">vazifalar tayinlanmagan</p>
              )}
            </ul>
            <Button
              className="bg-darkGreen hover:bg-darkRed"
              type="primary"
              onClick={() => {
                setModalTask(true);
              }}
            >
              {"Task qo'shish"}
            </Button>
            <Modal
              title="Vazifa qo'shish"
              open={modalTask}
              onCancel={() => setModalTask(false)}
              onClose={() => setModalTask(false)}
              onOk={() => {
                addTask.mutate({
                  data: { selectedTasks },
                });
                if (addTask.isSuccess) toast.success("Task added");
                setModalTask(false);
              }}
            >
              <ul className="">
                {tasks.length > 0 ? (
                  tasks.map((task, i) => (
                    <li key={i} className="ml-5">
                      <input
                        type="checkbox"
                        name={task.name}
                        id={task.name}
                        defaultChecked={handleCheck(task.name)}
                        onChange={(e) =>
                          handleTaskChange(e.target.checked, task)
                        }
                      />
                      <label htmlFor={task.name}>{task.name}</label>
                    </li>
                  ))
                ) : (
                  <p className="">vazifalar tayinlanmagan</p>
                )}
              </ul>
            </Modal>
          </div>
        </>
      ) : (
        <h1>something went wrong</h1>
      )}
    </div>
  );
};

export default ManagerSingle;
