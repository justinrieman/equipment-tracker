import React from 'react';
import { withRouter } from 'react-router-dom';

const EquipmentLabel = (props) => {
  return (
    <div
      className="equip-label"
      onClick={() => props.history.push(`/equipment/${props.id}`)}
    >
      <div className="equip-label-img">
        <img src={props.img} alt=""></img>
      </div>

      <div className="equip-label-container">
        <div className="equip-label-header">
          <h5 className="equip-label-brand">{props.brand}</h5>
          <h5 className="equip-label-model">{props.model}</h5>
        </div>
        <div className="equip-location-box">
          <div className="equip-location">
            <h5 className="equip-location-location">Location:</h5>
            {props.jobLocation === '' ? (
              <h5>N/A</h5>
            ) : (
              <h5>{props.jobLocation}</h5>
            )}
          </div>

          {props.available && <h5 className="equip-available">Available</h5>}
          {props.needsMaintenance && (
            <h5 className="equip-broke">Maintenace Required</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(EquipmentLabel);
