import React, { useState, useEffect, createRef } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updateEquipment,
  deleteEquipment,
} from '../../redux/actions/equipmentAction';

const EquipmentEditForm = (props) => {
  const formRef = createRef();

  const { user } = props.user;
  const { jobs } = props.job;
  const { equipment } = props.equipment;

  const [selectedImage, setSelectedImage] = useState(null);
  const [equipFormData, setEquipFormData] = useState({
    equipType: '',
    equipBrand: '',
    equipModel: '',
    equipImage: null,
    equipLocation: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    let selectedEquipment = equipment.filter(
      (item) => item._id === props.equipId
    )[0];

    console.log(selectedEquipment);
    setEquipFormData({
      equipType: selectedEquipment.equipType,
      equipBrand: selectedEquipment.equipBrand,
      equipModel: selectedEquipment.equipModel,
      equipImage: selectedEquipment.equipImage,
      equipLocation: '',
      available: selectedEquipment.available,
      needsMaintenance: selectedEquipment.needsMaintenance,
      attachments: selectedEquipment.attachments,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedImage(reader.result);
    };

    setEquipFormData((prevData) => {
      return {
        ...prevData,
        equipImage: file,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEquipFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(equipFormData);

    if (equipFormData.equipBrand.trim() === '') {
      setError('Must enter a brand or name');
      formRef.current.scrollTop = 0;
    } else {
      let equipLocationId;

      if (equipFormData.equipLocation) {
        const selectedJob = jobs.filter(
          (job) => job.jobName === equipFormData.equipLocation
        );
        equipLocationId = selectedJob[0]._id;
      }

      const fd = new FormData();
      fd.append('userId', user);
      fd.append('equipType', equipFormData.equipType);
      fd.append('equipBrand', equipFormData.equipBrand);
      fd.append('equipModel', equipFormData.equipModel);
      fd.append('equipImage', equipFormData.equipImage);
      fd.append('equipLocation', equipFormData.equipLocation);
      fd.append('available', equipFormData.available);
      fd.append('needsMaintenance', equipFormData.needsMaintenance);

      for (let i = 0; i < equipFormData.attachments.length; i++) {
        fd.append('attachments[]', equipFormData.attachments[i]);
      }

      equipFormData.equipLocation &&
        fd.append('equipLocationId', equipLocationId);

      props.updateEquipment(props.equipId, fd);
      setError(null);
      props.close();
    }
  };

  const handleDelete = () => {
    props.deleteEquipment(props.equipId);
    props.history.push('/equipment/' + equipFormData.equipType);
  };

  return (
    <div className="form-container" ref={formRef}>
      <div className="form-header">
        <div className="form-close"></div>
        <h1 className="form-title">Edit Equipment</h1>
        <div className="form-close" onClick={props.close}>
          <i className="fas fa-times"></i>
        </div>
      </div>

      <form className="form-input-container">
        <label className="form-label" htmlFor="equipBrand">
          Brand
          {error && <span className="error-text">{error}</span>}
        </label>
        <input
          className="form-input"
          type="text"
          name="equipBrand"
          onChange={handleInputChange}
          value={equipFormData.equipBrand}
        ></input>

        <label className="form-label" htmlFor="equipModel">
          Model
        </label>
        <input
          className="form-input"
          type="text"
          name="equipModel"
          onChange={handleInputChange}
          value={equipFormData.equipModel}
        ></input>

        <label className="form-label" htmlFor="equipLocation">
          Location
        </label>

        <select
          className="form-input"
          type="text"
          name="equipLocation"
          onChange={handleInputChange}
          defaultValue=""
        >
          <option value="" disabled>
            Choose a Location
          </option>
          {jobs.map((job) => {
            return (
              <option key={job._id} value={job.jobName}>
                {job.jobName}
              </option>
            );
          })}
        </select>
        <label className="form-label" htmlFor="equipImage">
          Select Image
        </label>
        <input
          type="file"
          onChange={handleImageSelection}
          name="equipImage"
        ></input>
        <img
          className="image-upload"
          src={
            selectedImage
              ? selectedImage
              : 'http://localhost:5000/' + equipFormData.equipImage
          }
          alt=""
        ></img>
        <div className="form-btn-group">
          <button
            type="button"
            className="form-btn form-btn-delete"
            onClick={() =>
              window.confirm('Are you sure you want to delete?')
                ? handleDelete()
                : null
            }
          >
            Delete
          </button>
          <button type="submit" className="form-btn" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

EquipmentEditForm.propTypes = {
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  equipment: PropTypes.object.isRequired,
  updateEquipment: PropTypes.func.isRequired,
  deleteEquipment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user,
  equipment: state.equipment,
});

export default connect(mapStateToProps, { updateEquipment, deleteEquipment })(
  withRouter(EquipmentEditForm)
);
