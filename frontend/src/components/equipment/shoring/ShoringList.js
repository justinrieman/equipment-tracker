import React from 'react';
import { withRouter } from 'react-router-dom';
import ShoringForm from './ShoringForm';
import ShoringLabel from './ShoringLabel';
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
        <ShoringLabel />
      </div>
    </div>
  );
};

export default withRouter(ShoringList);
