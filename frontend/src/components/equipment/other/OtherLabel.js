import React from 'react';

const OtherLabel = () => {
  return (
    <div>
      <div className="equip-label">
        <div className="equip-img">
          <img src="https://s3.eu-west-3.amazonaws.com/auctionport-images/4ec23ec9-6815-463a-8bf9-69b2dd625811.jpg"></img>
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
      <div className="equip-label">
        <div className="equip-img">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/613METIImuL._AC_SY355_.jpg"
            alt="honda"
          ></img>
        </div>

        <div className="equip-text">
          <div className="equip-header">
            <h5 className="equip-brand">Honda</h5>
            <h5 className="equip-model">GHx452</h5>
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

export default OtherLabel;
