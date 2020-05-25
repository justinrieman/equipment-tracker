import React from 'react';
import { withRouter } from 'react-router-dom';
import OtherForm from './OtherForm';
import OtherLabel from './OtherLabel';
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
        <OtherLabel />
      </div>
    </div>
  );
};

export default withRouter(OtherList);
