import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import CropFormModal from './CropFormModal';
import Api from '../../api/api';
import Cookies from 'js-cookie';
import successHandler from "api/successHandler";
import * as constant from "helper/constant";
import errorHandler from 'api/errorHandler';

const CropMonitoring = () => {
  const [crops, setCrops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const handleClose = () => setShowModal(false);

  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await Api.get('/user/crop', {
          headers: {
            Authorization: "Bearer " + Cookies.get('jwtToken'),
          }
        });
        if (!response.status === constant.HttpStatus.OK) {
          throw new Error('Network response was not ok');
        }
        console.log("🙈 🙉 🙊 Line 24 ~ response :  ", response);
        setCrops([...response.data]);
      } catch (error) {
        console.log(`🙈 🙉 🙊 ~ file: CropMonitoring.js:27 ~ fetchData ~ error : `, error)
      } finally {
        console.log("🙈 🙉 🙊 Line 29 ~  :  ");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    if (selectedCrop && selectedCrop.id) {
      const updatedCrops = crops.map((crop) =>
        crop.id === selectedCrop.id ? { ...crop, ...formData } : crop
      );
      // API to update crop details
      setCrops(updatedCrops);
    } else {
      try {

        //~ Fetch list of crops . . .
        // let data = await Api.get('/user/crop', {
        //   headers: {
        //     "Authorization": "Bearer " + Cookies.get('jwtToken'),
        //   }
        // });
        // console.log(`🙈 🙉 🙊 ~ file: CropMonitoring.js:33 ~ handleSubmit ~ data : `, data)


        //~ Fetch a single crop by id . . .
        // let res = await Api.get('/user/crop/' + 1111, {
        //   headers: {
        //     "Authorization": "Bearer " + Cookies.get('jwtToken'),
        //   }
        // });
        // console.log(`🙈 🙉 🙊 ~ file: CropMonitoring.js:33 ~ handleSubmit ~ res : `, res.data)

        //~ Update a single crop by id . . .
        // let res = await Api.put('/user/crop/' + 1111, formData, {
        //   headers: {
        //     "Authorization": "Bearer " + Cookies.get('jwtToken'),
        //   }
        // });
        // console.log(`🙈 🙉 🙊 ~ file: CropMonitoring.js:33 ~ handleSubmit ~ res : `, res.data)


        formData.userId = parseInt(Cookies.get('userId'));
        console.log(`🙈 🙉 🙊 ~ file: CropMonitoring.js:27 ~ handleSubmit ~ formData : `, formData)

        let response = await Api.post('/user/crop', formData, {
          headers: {
            "Authorization": "Bearer " + Cookies.get('jwtToken'),
          }
        });

        console.log(`🙈 🙉 🙊 ~ file: CropMonitoring.js:86 ~ handleSubmit ~ response : `, response)
        successHandler(response, {
          notifyOnSuccess: true,
        })

        // setCrops([...crops, { key: response.data.id, ...response.data }]);

      } catch (error) {
        console.log(`🙈 🙉 🙊 ~ file: CropMonitoring.js:70 ~ handleSubmit ~ error : `, error)
        errorHandler(error)
      }

    }
    handleClose();
  };

  const handleEdit = (crop) => {
    setSelectedCrop(crop);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    console.log(`🙈 🙉 🙊 ~ file: CropMonitoring.js:51 ~ handleDelete ~ id : `, id)

    try {

      let response = await Api.delete('/user/crop/' + id, {
        headers: {
          "Authorization": "Bearer " + Cookies.get('jwtToken'),
        }
      });
      console.log(`🙈 🙉 🙊 ~ file: CropMonitoring.js:35 ~ handleSubmit ~ data : `, response.data)

      successHandler(response, {
        notifyOnSuccess: true,
      })
    } catch (error) {
      console.log(`🙈 🙉 🙊 ~ file: CropMonitoring.js:75 ~ handleDelete ~ error : `, error.response.data)
      errorHandler(error)
    }

  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleShow}>
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
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(crop.id)}>
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
