import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import CropFormModal from './CropFormModal';

const CropMonitoring = () => {
  const [crops, setCrops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleClose = () => setShowModal(false);

  const handleShow = () => setShowModal(true);

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    if (selectedCrop && selectedCrop.id) {
      const updatedCrops = crops.map((crop) =>
        crop.id === selectedCrop.id ? { ...crop, ...formData } : crop
      );
      // API to update crop details
      setCrops(updatedCrops);
    } else {
      const newCrop = {
        id: Date.now(),
        ...formData,
      };

      // API to add crop details
      setCrops([...crops, newCrop]);
    }
    handleClose();
  };

  const handleEdit = (crop) => {
    setSelectedCrop(crop);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const updatedCrops = crops.filter((crop) => crop.id !== id);
    setCrops(updatedCrops);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Crop
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Crop Name</th>
            <th>Crop Type</th>
            <th>Crop Variety</th>
            <th>Field Name</th>
            <th>Field Size</th>
            <th>Harvest Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {crops.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No Data Found</td>
            </tr>
          ) : (
            crops.map((crop) => (
              <tr key={crop.id}>
                <td>{crop.name}</td>
                <td>{crop.cropType}</td>
                <td>{crop.cropVariety}</td>
                <td>{crop.fieldName}</td>
                <td>{crop.fieldSize}</td>
                <td>{crop.plantingDate}</td>
                <td>{crop.harvestDate}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => handleEdit(crop)}>
                    <FontAwesomeIcon icon={faEdit} className="me-2" />
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(crop.id)}>
                    <FontAwesomeIcon icon={faTrash} className="me-2" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <CropFormModal
        show={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        initialData={selectedCrop}
      />
    </div>
  );
};

export default CropMonitoring;
