import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import EquipmentForm from '../EquipmentForm';
import EquipmentLabel from '../EquipmentLabel';
import CategoryHeader from '../../CategoryHeader';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const OtherList = (props) => {
  const [otherList, setOtherList] = useState([]);

  const { user } = props.user;
  const { equipment } = props.equipment;

  useEffect(() => {
    if (!user) {
      props.history.push('/equipment');
    }

    setOtherList(equipment.filter((item) => item.equipType === 'other'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipment]);

  return (
    <div>
      <CategoryHeader
        title="Other"
        backRoute="/equipment"
        icon="fas fa-plus"
        form={<EquipmentForm equipType="other" />}
      />
      <div className="job-body">
        {otherList.length === 0 && <h1>No equipment available.</h1>}
        <div className="equip-list">
          {equipment
            .filter((item) => item.equipType === 'other')
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

OtherList.propTypes = {
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  equipment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user,
  equipment: state.equipment,
});

export default connect(mapStateToProps)(withRouter(OtherList));
