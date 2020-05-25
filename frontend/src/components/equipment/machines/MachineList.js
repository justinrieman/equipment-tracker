import React from 'react';
import { withRouter } from 'react-router-dom';
import CategoryHeader from '../../CategoryHeader';
import MachineForm from './MachineForm';
import MachineLabel from './MachineLabel';

const MachineList = () => {
  return (
    <div>
      <CategoryHeader
        title="Machines"
        backRoute="/equipment"
        form={<MachineForm />}
      />
      <div className="job-list">
        <MachineLabel />
      </div>
    </div>
  );
};

export default withRouter(MachineList);
