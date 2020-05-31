import React from 'react';
import { withRouter } from 'react-router-dom';
import IndividualHeader from '.././IndividualHeader';

const Job = (props) => {
  const jobId = props.match.params.id;

  return (
    <div>
      <IndividualHeader title="Tiffin Pointe" backRoute="jobs" />

      <div className="job-body">
        <h1>Equipment</h1>
        <div className="equip-label">
          <div className="equip-img">
            <img
              src="https://cdn.ironpla.net/i/1935/235/1935235_3742_159_0001.jpg"
              alt=""
            ></img>
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
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/613METIImuL._AC_SY355_.jpg"
              alt=""
            ></img>
          </div>

          <div className="equip-text">
            <div className="equip-header">
              <h5 className="equip-brand">Air Compressor #117</h5>
              <h5 className="equip-model">&nbsp;</h5>
            </div>
            <div className="equip-location">
              <h5>Location:</h5>
              <h5>Tiffin Pointe</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Job);
