import React from 'react';

const RentalLabel = () => {
  return (
    <div>
      <div className="equip-label">
        <div className="equip-img">
          <img src="https://cdn.ironpla.net/i/1935/235/1935235_3742_159_0001.jpg"></img>
        </div>

        <div className="equip-text">
          <div className="equip-header">
            <h5 className="equip-brand">Bobcat</h5>
            <h5 className="equip-model">T590</h5>
          </div>
          <div className="equip-location">
            <h5>Location:</h5>
            <h5>Tiffin Pointe</h5>
          </div>
        </div>
      </div>
      <div className="equip-label">
        <div className="equip-img">
          <img src="https://images-na.ssl-images-amazon.com/images/I/613METIImuL._AC_SY355_.jpg"></img>
        </div>

        <div className="equip-text">
          <div className="equip-header">
            <h5 className="equip-brand">Air Compressor #117</h5>
            <h5 className="equip-model"></h5>
          </div>
          <div className="equip-location">
            <h5>Location:</h5>
            <h5>Tiffin Pointe</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalLabel;
