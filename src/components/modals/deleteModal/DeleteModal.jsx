import { Button, Modal } from "antd";
import { useState } from "react";

const DeleteModal = () => {
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
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={<span style={{ fontSize: "20px" }}>Hodimni o’chirish</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div className="flex gap-3 justify-end pt-[52px]">
            <button
              onClick={handleCancel}
              className="border rounded-lg border-[#D5D5D5] py-[11px] w-[101px] text-center text-[14px] font-normal text-[#0000008A] hover:text-[#000] hover:border-[#000] transition-all"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleOk}
              className="border rounded-lg py-[11px] w-[101px] text-center text-[14px] font-normal text-[#fff] bg-darkRed hover:bg-[#b93a31] transition-all"
            >
              {" O'chirish"}
            </button>
          </div>
        }
      >
        <div className="flex flex-col border-t border-t-[#E8E8E8] pt-[32.5px]">
          <h3 className="text-[16px] font-normal text-primaryColor">
            Haqiqatan ham “Xizmat sifatini tekshirish” topshiriq shablonini
            o‘chirib tashlamoqchimisiz?
          </h3>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
