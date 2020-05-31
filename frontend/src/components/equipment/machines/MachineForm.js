import React, { useState } from 'react';
import axios from 'axios';

const MachineForm = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [machineFormData, setMachineFormData] = useState({
    equipBrand: '',
    equipModel: '',
    equipImage: null,
    equipLocation: '',
  });

  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    console.log(file);

    reader.onloadend = function (e) {
      setSelectedImage(reader.result);
    };

    setMachineFormData((prevData) => {
      return {
        ...prevData,
        equipImage: file,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setMachineFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const addMachine = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('equipType', 'machine');
    fd.append('equipBrand', machineFormData.equipBrand);
    fd.append('equipModel', machineFormData.equipModel);
    fd.append('equipImage', machineFormData.equipImage);
    fd.append('equipLocation', machineFormData.equipLocation);

    axios
      .post('http://localhost:5000/equipment', fd)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .then(() => {
        props.close();
        props.fetchData();
      });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="form-close"></div>
        <h1 className="form-title">New Machine</h1>
        <div className="form-close" onClick={props.close}>
          <i className="fas fa-times"></i>
        </div>
      </div>

      <form className="form-input-container">
        <label className="form-label" htmlFor="equipBrand">
          Brand
        </label>
        <input
          className="form-input"
          type="text"
          name="equipBrand"
          onChange={handleInputChange}
        ></input>

        <label className="form-label" htmlFor="equipModel">
          Model
        </label>
        <input
          className="form-input"
          type="text"
          name="equipModel"
          onChange={handleInputChange}
        ></input>

        <label className="form-label" htmlFor="equipLocation">
          Location
        </label>

        <input
          className="form-input"
          type="text"
          name="equipLocation"
          onChange={handleInputChange}
        ></input>
        <label className="form-label" htmlFor="equipImage">
          Select Image
        </label>
        <input
          type="file"
          onChange={handleImageSelection}
          name="equipImage"
        ></input>
        <img className="image-upload" src={selectedImage} alt=""></img>
        <button type="submit" className="form-btn" onClick={addMachine}>
          Add Machine
        </button>
      </form>
    </div>
  );
};

export default MachineForm;
