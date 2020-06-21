import React from 'react';
import { withRouter } from 'react-router-dom';

const EquipmentSelection = ({ history }) => {
  return (
    <div className="equipment-selection">
      <div
        className="equipment-box equip-machines"
        onClick={() => {
          history.push('/equipment/machine');
        }}
      >
        <i className="fas fa-snowplow"></i>
        <p>MACHINES</p>
      </div>
      <div
        className="equipment-box equip-shoring"
        onClick={() => {
          history.push('/equipment/shoring');
        }}
      >
        <i className="fas fa-boxes"></i>
        <p>SHORING</p>
      </div>
      <div
        className="equipment-box equip-rentals"
        onClick={() => {
          history.push('/equipment/rental');
        }}
      >
        <i className="fas fa-tags"></i>
        <p>RENTALS</p>
      </div>
      <div
        className="equipment-box equip-other"
        onClick={() => {
          history.push('/equipment/other');
        }}
      >
        <i className="fas fa-ellipsis-h"></i>
        <p>OTHER</p>
      </div>
    </div>
  );
};

export default withRouter(EquipmentSelection);
