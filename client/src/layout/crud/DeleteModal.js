import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useCrudContext } from 'contexts/crud';
export default function DeleteModal({ config }) {
  let {
    deleteMessage = "Are you sure you want to delete",
    modalTitle = "Delete",
  } = config;
  const { state, crudContextAction } = useCrudContext();
  const { isModalOpen } = state;
  const { modal } = crudContextAction;

  const handleOk = () => {
    // API for delete
    // modal.close();
    // API to get new list
  };
  const handleCancel = () => {
    modal.close();
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     modal.close();
  //     // API to get new list
  //   }
  // }, [isSuccess]);

  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>
        {deleteMessage}
      </p>
    </Modal>
  );
}
