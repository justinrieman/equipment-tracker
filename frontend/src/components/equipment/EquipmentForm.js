// To use:
// <EquipmentForm equipType='' />

import React, { useState, createRef } from 'react';

// Redux Stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEquipment } from '../../redux/actions/equipmentAction';

const EquipmentForm = (props) => {
  const formRef = createRef();

  const { user } = props.user;
  const { jobs } = props.job;

  const [selectedImage, setSelectedImage] = useState(null);
  const [equipmentFormData, setEquipmentFormData] = useState({
    equipBrand: '',
    equipModel: '',
    equipImage: null,
    equipLocation: '',
  });
  const [error, setError] = useState(null);

  //Catpitalize First Letter of equipType to use as title
  // if equip type is other than use Item
  const equipTypeTitle =
    props.equipType === 'other'
      ? 'Item'
      : props.equipType.charAt(0).toUpperCase() + props.equipType.slice(1);

  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedImage(reader.result);
    };

    setEquipmentFormData((prevData) => {
      return {
        ...prevData,
        equipImage: file,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEquipmentFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (equipmentFormData.equipBrand.trim() === '') {
      setError('Must enter a brand or name');
      formRef.current.scrollTop = 0;
    } else {
      // to get equipLocationId
      let equipLocationId;

      if (equipmentFormData.equipLocation) {
        const selectedJob = jobs.filter(
          (job) => job.jobName === equipmentFormData.equipLocation
        );
        equipLocationId = selectedJob[0]._id;
      }

      const fd = new FormData();
      fd.append('userId', user);
      fd.append('equipType', props.equipType);
      fd.append('equipBrand', equipmentFormData.equipBrand);
      fd.append('equipModel', equipmentFormData.equipModel);
      fd.append('equipImage', equipmentFormData.equipImage);
      fd.append('equipLocation', equipmentFormData.equipLocation);
      equipmentFormData.equipLocation &&
        fd.append('equipLocationId', equipLocationId);

      props.addEquipment(fd);
      props.close();
    }
  };

  return (
    <div className="form-container" ref={formRef}>
      <div className="form-header">
        <div className="form-close"></div>
        <h1 className="form-title">{`New ${equipTypeTitle}`}</h1>
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
        <img className="image-upload" src={selectedImage} alt=""></img>
        <button type="submit" className="form-btn" onClick={handleSubmit}>
          {`Add ${equipTypeTitle}`}
        </button>
      </form>
    </div>
  );
};

EquipmentForm.propTypes = {
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addEquipment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user,
});

export default connect(mapStateToProps, { addEquipment })(EquipmentForm);
