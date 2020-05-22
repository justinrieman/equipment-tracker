import React from 'react';

const EquipmentSelection = ({ history }) => {
  return (
    <div className="equipment-selection">
      <div className="equipment-box equip-machines">
        <i class="fas fa-snowplow"></i>
        <p>MACHINES</p>
      </div>
      <div className="equipment-box equip-shoring">
        <i class="fas fa-boxes"></i>
        <p>SHORING</p>
      </div>
      <div className="equipment-box equip-rentals">
        <i class="fas fa-tags"></i>
        <p>RENTALS</p>
      </div>
      <div className="equipment-box equip-other">
        <i class="fas fa-ellipsis-h"></i>
        <p>OTHER</p>
      </div>
    </div>
  );
};

export default EquipmentSelection;
