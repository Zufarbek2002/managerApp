import { Button, Modal, Select } from "antd";
import { useState } from "react";

const AddTaskModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={<span style={{ fontSize: "20px" }}>Vazifa qo’shish</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div className="flex gap-3 justify-end pt-[32px]">
            <button
              onClick={handleCancel}
              className="border rounded-lg border-[#D5D5D5] py-[11px] w-[101px] text-center text-[14px] font-normal text-[#0000008A] hover:text-[#000] hover:border-[#000] transition-all"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleOk}
              className="border rounded-lg py-[11px] w-[101px] text-center text-[14px] font-normal text-[#fff] bg-darkGreen hover:bg-[#269277] transition-all"
            >
              Saqlash
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-[21px] border-t border-t-[#E8E8E8] pt-[14px]">
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-normal text-[#000]">
              Hodim turi
            </label>
            <Select
              defaultValue={"active"}
              style={{ width: "100%" }}
              size="large"
              onChange={handleChange}
              options={[
                { value: "active", label: "Active" },
                { value: "block", label: "Block" },
                { value: "approved", label: "Approved" },
                { value: "checking", label: "Checking" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-normal text-[#000]">
              Vazifa nomi
            </label>
            <input
              type="text"
              className="outline-none border border-[#E3E1E1] px-[11px] py-[11px] rounded-lg"
              placeholder="Vazifa nomi"
              required
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddTaskModal;
