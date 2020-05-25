import React from 'react';
import { withRouter } from 'react-router-dom';
import RentalForm from './RentalForm';
import RentalLabel from './RentalLabel';
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
        <RentalLabel />
      </div>
    </div>
  );
};

export default withRouter(RentalList);
