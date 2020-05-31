import React from 'react';
import { withRouter } from 'react-router-dom';
import ShoringForm from './ShoringForm';
import EquipmentLabel from '../EquipmentLabel';
import CategoryHeader from '../../CategoryHeader';

const ShoringList = ({ history }) => {
  return (
    <div>
      <CategoryHeader
        title="Shoring"
        backRoute="/equipment"
        form={<ShoringForm />}
      />
      <div className="job-list">
        <EquipmentLabel />
      </div>
    </div>
  );
};

export default withRouter(ShoringList);
