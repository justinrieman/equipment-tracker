import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import CategoryHeader from '../../CategoryHeader';
import EquipmentLabel from '../EquipmentLabel';
import EquipmentForm from '../EquipmentForm';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MachineList = (props) => {
  const [machines, setMachines] = useState([]);

  const { user } = props.user;
  const { equipment } = props.equipment;

  useEffect(() => {
    if (!user) {
      props.history.push('/equipment');
    }

    setMachines(equipment.filter((item) => item.equipType === 'machine'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipment]);

  return (
    <div>
      <CategoryHeader
        title="Machines"
        backRoute="/equipment"
        icon="fas fa-plus"
        form={<EquipmentForm equipType="machine" />}
      />
      <div className="job-body">
        {machines.length === 0 && <h1>No machines available.</h1>}
        <div className="individual-job-list">
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
                  available={item.available}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

MachineList.propTypes = {
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  equipment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user,
  equipment: state.equipment,
});

export default connect(mapStateToProps)(withRouter(MachineList));
