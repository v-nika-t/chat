import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Form from "../../components/Forms/AuthForm/AuthForm";

function Main() {
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
    <Modal>
      <Form />
    </Modal>
  );
}

export default Main;
