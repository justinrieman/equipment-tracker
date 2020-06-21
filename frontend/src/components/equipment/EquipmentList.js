import React, { useEffect } from 'react';
import EquipmentSelection from './EquipmentSelection';
import IndividualHeader from '../IndividualHeader';

import { connect } from 'react-redux';
import { getJobs } from '../../redux/actions/jobAction';
import { setUser } from '../../redux/actions/userAction';
import { getEquipment } from '../../redux/actions/equipmentAction';
import PropTypes from 'prop-types';

const token = localStorage.getItem('token');

const EquipmentList = (props) => {
  const { user } = props.user;

  useEffect(() => {
    // this will make a call to the database only if page was reloaded
    if (!user) {
      props.setUser(token);
      props.getJobs();
      props.getEquipment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <IndividualHeader backRoute="" title="Equipment" />
      <EquipmentSelection />
    </div>
  );
};

EquipmentList.propTypes = {
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  equipment: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  getEquipment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user,
  equipment: state.equipment,
});

export default connect(mapStateToProps, { setUser, getJobs, getEquipment })(
  EquipmentList
);
