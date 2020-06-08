import React from 'react';
import { withRouter } from 'react-router-dom';
import OtherForm from './OtherForm';
import EquipmentLabel from '../EquipmentLabel';
import CategoryHeader from '../../CategoryHeader';

const OtherList = () => {
  return (
    <div>
      <CategoryHeader
        title="Other"
        backRoute="/equipment"
        form={<OtherForm />}
      />
      <div className="job-list">
        <EquipmentLabel
          brand="cat"
          model="T590"
          jobLocation="tiffin"
          img="https://cdn.ironpla.net/i/1935/235/1935235_3742_159_0001.jpg"
        />
      </div>
    </div>
  );
};

export default withRouter(OtherList);
