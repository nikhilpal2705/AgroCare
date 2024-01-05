import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const CropFormModal = ({ show, handleClose, handleSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Edit Crop' : 'Add Crop'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e, formData)}>
          <Form.Group controlId="name">
            <Form.Label>Crop Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="cropType">
                <Form.Label>Crop Type</Form.Label>
                <Form.Control
                  type="text"
                  name="cropType"
                  value={formData.cropType || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="cropVariety">
                <Form.Label>Crop Variety</Form.Label>
                <Form.Control
                  type="text"
                  name="cropVariety"
                  value={formData.cropVariety || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="fieldName">
                <Form.Label>Field Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fieldName"
                  value={formData.fieldName || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="fieldSize">
                <Form.Label>Field Size</Form.Label>
                <Form.Control
                  type="text"
                  name="fieldSize"
                  value={formData.fieldSize || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="plantingDate">
                <Form.Label>Planting Date</Form.Label>
                <Form.Control
                  type="date"
                  name="plantingDate"
                  value={formData.plantingDate || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="harvestDate">
                <Form.Label>Harvest Date</Form.Label>
                <Form.Control
                  type="date"
                  name="harvestDate"
                  value={formData.harvestDate || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end mt-3">
              <Button variant="secondary" className='me-2' onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="ml-2">
                {initialData ? 'Update' : 'Add'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CropFormModal;
