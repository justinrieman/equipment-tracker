import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import EquipmentLabel from '../EquipmentLabel';
import EquipmentForm from '../EquipmentForm';
import CategoryHeader from '../../CategoryHeader';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getJobs } from '../../../redux/actions/jobAction';
import { setUser } from '../../../redux/actions/userAction';
import { getEquipment } from '../../../redux/actions/equipmentAction';

const RentalList = (props) => {
  const [rentalList, setRentalList] = useState([]);
  const { user } = props.user;
  const { equipment } = props.equipment;

  useEffect(() => {
    if (!user) {
      props.history.push('/equipment');
    }

    setRentalList(equipment.filter((item) => item.equipType === 'rental'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipment]);

  return (
    <div>
      <CategoryHeader
        title="Rentals"
        backRoute="/equipment"
        icon="fas fa-plus"
        form={<EquipmentForm equipType="rental" />}
      />
      <div className="job-body">
        {rentalList.length === 0 && <h1>No rentals available.</h1>}
        <div className="equip-list">
          {equipment
            .filter((item) => item.equipType === 'rental')
            .map((item) => {
              return (
                <EquipmentLabel
                  key={item._id}
                  id={item._id}
                  brand={item.equipBrand}
                  model={item.equipModel}
                  jobLocation={item.equipLocation}
                  img={'http://localhost:5000/' + item.equipImage}
                  available={item.available}
                  needsMaintenance={item.needsMaintenance}
                />
              );
            })}
          <div className="equip-filler"></div>
        </div>
      </div>
    </div>
  );
};

RentalList.propTypes = {
  job: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  getEquipment: PropTypes.func.isRequired,
  equipment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user,
  equipment: state.equipment,
});

export default connect(mapStateToProps, { setUser, getJobs, getEquipment })(
  withRouter(RentalList)
);
