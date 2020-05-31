import React from 'react';
import { withRouter } from 'react-router-dom';
import RentalForm from './RentalForm';
import EquipmentLabel from '../EquipmentLabel';
import CategoryHeader from '../../CategoryHeader';

const RentalList = ({ history }) => {
  return (
    <div>
      <CategoryHeader
        title="Rentals"
        backRoute="/equipment"
        form={<RentalForm />}
      />
      <div className="job-list">
        <EquipmentLabel
          brand="Bobcat"
          model="T590"
          jobLocation="Tiffin Pointe"
          img="https://cdn.ironpla.net/i/1935/235/1935235_3742_159_0001.jpg"
        />
        <EquipmentLabel
          brand="Air Compressor #117"
          model=""
          jobLocation="Ashta Chemicals"
          img="https://images-na.ssl-images-amazon.com/images/I/613METIImuL._AC_SY355_.jpg"
        />
      </div>
    </div>
  );
};

export default withRouter(RentalList);
