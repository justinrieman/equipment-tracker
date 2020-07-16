import React, { useEffect } from 'react';

const EquipInfo = (props) => {
  useEffect(() => {
    if (props.available) {
      document.getElementById('availableCheck').checked = true;
    }

    if (props.needsMaintenance) {
      document.getElementById('maintenanceCheck').checked = true;
    }
  }, [props.available, props.needsMaintenance]);

  return (
    <div className="equip-page-container">
      <div className="equip-individual-img">
        <img
          src={'http://localhost:5000/' + props.equipImage}
          alt={props.equipBrand}
        ></img>
      </div>
      <div className="equip-extras">
        <h1 className="job-page-title equip-page-title">Info</h1>
        <div className="equip-page-table">
          <div className="table-section">
            <h2 className="table-label">Brand</h2>
            <h2 className="table-value">{props.equipBrand}</h2>
          </div>
          <div className="table-section">
            <h2 className="table-label">Model</h2>
            <h2 className="table-value">{props.equipModel}</h2>
          </div>
          <div className="table-section">
            <h2 className="table-label">Location</h2>
            <h2 className="table-value">{props.equipLocation}</h2>
          </div>
          {props.equipType === 'rental' && (
            <div className="table-section">
              <h2 className="table-label">Date Rented</h2>
              <h2 className="table-value">{props.rentalDate}</h2>
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
                  onChange={props.handleCheck}
                />
                <label htmlFor="availableCheck" className="switch-label">
                  Switch
                </label>
              </div>
            </div>
          </div>
          <div className="table-section">
            <div className="switch-container">
              <h2 className="switch-text">Maintenance required</h2>
              <div className="switch">
                <input
                  id="maintenanceCheck"
                  type="checkbox"
                  className="switch-input maintenance-switch"
                  onChange={props.maintenanceChange}
                />
                <label
                  htmlFor="maintenanceCheck"
                  className="switch-label maintenance-switch"
                >
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

export default EquipInfo;
