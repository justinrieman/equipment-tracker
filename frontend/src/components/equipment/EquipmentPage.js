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

      // This is for when a user deletes the equipment and hits the back button
      // so in CategoryHeader the props.history.goBack() doesn't return to this page
      if (!equip) {
        props.history.push('/equipment');
      } else if (equip.available) {
        document.getElementById('availableCheck').checked = true;
      }

      console.log(equip);
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
          {currentEquip.equipType === 'rental' && (
            <div className="table-section">
              <h2 className="table-label">Date Rented</h2>
              <h2 className="table-value">{currentEquip.rentalDate}</h2>
            </div>
          )}
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
