import React from 'react';
import { withRouter } from 'react-router-dom';
import OtherForm from './OtherForm';
import EquipmentLabel from '../EquipmentLabel';
import CategoryHeader from '../../CategoryHeader';

const OtherList = ({ history }) => {
  return (
    <div>
      <CategoryHeader
        title="Other"
        backRoute="/equipment"
        form={<OtherForm />}
      />
      <div className="job-list">
        <EquipmentLabel />
      </div>
    </div>
  );
};

export default withRouter(OtherList);
