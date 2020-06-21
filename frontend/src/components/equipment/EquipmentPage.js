import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import CategoryHeader from '../CategoryHeader';
import EquipmentEditForm from './EquipmentEditForm';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  markAvailable,
  markUnavailable,
} from '../../redux/actions/equipmentAction';

const EquipmentPage = (props) => {
  const equipId = props.match.params.id;
  const { equipment } = props.equipment;

  const [currentEquip, setCurrentEquip] = useState({});

  useEffect(() => {
    if (equipment.length === 0) {
      props.history.push('/equipment');
    } else {
      let equip = equipment.filter((item) => item._id === equipId)[0];
      setCurrentEquip(equip);

      // is the equipment available ? then have the box checked off already
      if (equip.available) {
        document.getElementById('availableCheck').checked = true;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipment]);

  const handleCheck = (e) => {
    console.log(e.target.checked);

    // if e.target.checked === true, markAvailable()
    if (e.target.checked === true) {
      props.markAvailable(equipId);
    }
    // if e.target.checked === false, markUnAvailable()
    if (e.target.checked === false) {
      props.markUnavailable(equipId);
    }
  };

  return (
    <div>
      <CategoryHeader
        title={currentEquip.equipBrand}
        backRoute={`/equipment/${currentEquip.equipType}`}
        icon="fas fa-pen-square"
        form={<EquipmentEditForm equipId={equipId} />}
      />

      <div className="equip-page-body">
        <div className="equip-individual-img">
          <img
            src={'http://localhost:5000/' + currentEquip.equipImage}
            alt={currentEquip.equipBrand}
          ></img>
        </div>
        <div className="equip-page-table">
          <div className="table-section">
            <h2 className="table-label">Brand</h2>
            <h2 className="table-value">{currentEquip.equipBrand}</h2>
          </div>
          <div className="table-section">
            <h2 className="table-label">Model</h2>
            <h2 className="table-value">{currentEquip.equipModel}</h2>
          </div>
          <div className="table-section">
            <h2 className="table-label">Location</h2>
            <h2 className="table-value">{currentEquip.equipLocation}</h2>
          </div>
          <div className="table-section">
            <div className="switch-container">
              <h2 className="switch-text">Mark as available</h2>
              <div className="switch">
                <input
                  id="availableCheck"
                  type="checkbox"
                  className="switch-input"
                  onChange={handleCheck}
                />
                <label htmlFor="availableCheck" className="switch-label">
                  Switch
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="check-container-container">
          <label className="check-container">
            <input
              className="checkbox"
              id="availableCheck"
              type="checkbox"
              onChange={handleCheck}
            ></input>
            <span className="checkmark"></span>
            Mark as available
          </label>
        </div> */}
        {/* <div className="switch-container">
          <div className="switch">
            <input
              id="availableCheck"
              type="checkbox"
              className="switch-input"
              onChange={handleCheck}
            />
            <label htmlFor="availableCheck" className="switch-label">
              Switch
            </label>
          </div>
          <h2 className="switch-text">Mark as available</h2>
        </div> */}
      </div>
    </div>
  );
};

EquipmentPage.propTypes = {
  job: PropTypes.object.isRequired,
  equipment: PropTypes.object.isRequired,
  markAvailable: PropTypes.func.isRequired,
  markUnavailable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  equipment: state.equipment,
});

export default connect(mapStateToProps, { markAvailable, markUnavailable })(
  withRouter(EquipmentPage)
);
