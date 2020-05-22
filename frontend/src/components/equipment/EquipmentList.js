import React from 'react';
import EquipmentSelection from './EquipmentSelection';

const EquipmentList = ({ history }) => {
  return (
    <div>
      <div className="category-header">
        <div
          className="category-back"
          onClick={() => {
            history.push('/');
          }}
        >
          <i className="fas fa-angle-double-left"></i>
        </div>
        <h1 className="category-title">Equipment</h1>
        <div className="category-add"></div>
      </div>
      <EquipmentSelection />
    </div>
  );
};

export default EquipmentList;
