import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEquipment } from '../../../redux/actions/equipmentAction';

const RentalForm = (props) => {
  const { user } = props.user;
  const { jobs } = props.job;

  const [selectedImage, setSelectedImage] = useState(null);
  const [machineFormData, setMachineFormData] = useState({
    equipBrand: '',
    equipModel: '',
    equipImage: null,
    equipLocation: '',
  });
  const [startDate, setStartDate] = useState(new Date());

  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

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
    let rentalDate = document.querySelector('.date-picker').value;

    // to get equipLocationId
    let equipLocationId;

    if (machineFormData.equipLocation) {
      const selectedJob = jobs.filter(
        (job) => job.jobName === machineFormData.equipLocation
      );
      equipLocationId = selectedJob[0]._id;
    }

    const fd = new FormData();
    fd.append('userId', user);
    fd.append('equipType', 'rental');
    fd.append('equipBrand', machineFormData.equipBrand);
    fd.append('equipModel', machineFormData.equipModel);
    fd.append('equipImage', machineFormData.equipImage);
    fd.append('equipLocation', machineFormData.equipLocation);
    machineFormData.equipLocation &&
      fd.append('equipLocationId', equipLocationId);
    fd.append('rentalDate', rentalDate);

    props.addEquipment(fd);
    props.close();
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="form-close"></div>
        <h1 className="form-title">New Rental</h1>
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
        <label className="form-label" htmlFor="rentalDate">
          Rented Date
        </label>
        <div className="date-picker-wrapper">
          <DatePicker
            name="rentalDate"
            className="date-picker"
            showPopperArrow={false}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            calendarClassName="calendar"
            dayClassName={(date) => 'day'}
            weekDayClassName={(day) => 'weekday'}
            dateFormat="MMMM d, yyyy"
          />
        </div>
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

RentalForm.propTypes = {
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addEquipment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user,
});

export default connect(mapStateToProps, { addEquipment })(RentalForm);
