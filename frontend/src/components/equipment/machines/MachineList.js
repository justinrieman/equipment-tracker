import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CategoryHeader from '../../CategoryHeader';
import EquipmentLabel from '../EquipmentLabel';
import MachineForm from './MachineForm';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getJobs } from '../../../redux/actions/jobAction';
import { setUser } from '../../../redux/actions/userAction';
import { getEquipment } from '../../../redux/actions/equipmentAction';

const token = localStorage.getItem('token');

const MachineList = (props) => {
  const { user } = props.user;
  const { equipment } = props.equipment;

  useEffect(() => {
    if (!user) {
      props.setUser(token);
      props.getJobs();
      props.getEquipment();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CategoryHeader
        title="Machines"
        backRoute="/equipment"
        form={<MachineForm />}
      />
      <div className="job-list">
        {equipment
          .filter((item) => item.equipType === 'machine')
          .map((item) => {
            return (
              <EquipmentLabel
                key={item._id}
                id={item._id}
                brand={item.equipBrand}
                model={item.equipModel}
                jobLocation={item.equipLocation}
                img={'http://localhost:5000/' + item.equipImage}
              />
            );
          })}
      </div>
    </div>
  );
};

MachineList.propTypes = {
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
  withRouter(MachineList)
);
