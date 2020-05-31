import React from 'react';
import { withRouter } from 'react-router-dom';

const EquipmentLabel = (props) => {
  return (
    <div className="equip-label" onClick={() => props.history.push('/')}>
      <div className="equip-img">
        <img src={props.img} alt=""></img>
      </div>

      <div className="equip-text">
        <div className="equip-header">
          <h5 className="equip-brand">{props.brand}</h5>
          <h5 className="equip-model">{props.model}</h5>
        </div>
        <div className="equip-location">
          <h5>Location:</h5>
          <h5>{props.jobLocation}</h5>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EquipmentLabel);
