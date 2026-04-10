import { Modal } from 'antd';
import { useCrudContext } from 'contexts/crud';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeletedItem } from '../../redux/crud/selectors';
import { crud } from '../../redux/crud/actions';
import { useEffect } from 'react';

export default function DeleteModal({ config }) {
  const {
    entity,
    deleteMessage = "Are you sure you want to delete",
    modalTitle = "Delete",
  } = config;

  const { state, crudContextAction } = useCrudContext();
  const { isModalOpen } = state;
  const { modal } = crudContextAction;

  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectDeletedItem);

  const handleOk = () => {
    if (current && current.id) {
      dispatch(crud.delete({ entity, id: current.id }));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      modal.close();
      dispatch(crud.resetAction({ actionType: 'delete' }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess, dispatch, entity, modal]);

  const handleCancel = () => {
    if (!isLoading) {
      modal.close();
    }
  };

  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <p>{deleteMessage}</p>
    </Modal>
  );
}
