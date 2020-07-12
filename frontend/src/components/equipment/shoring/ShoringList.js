import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import EquipmentLabel from '../EquipmentLabel';
import EquipmentForm from '../EquipmentForm';
import CategoryHeader from '../../CategoryHeader';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ShoringList = (props) => {
  const [shoringList, setShoringList] = useState([]);

  const { user } = props.user;
  const { equipment } = props.equipment;

  useEffect(() => {
    if (!user) {
      props.history.push('/equipment');
    }

    setShoringList(equipment.filter((item) => item.equipType === 'shoring'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipment]);

  return (
    <div>
      <CategoryHeader
        title="Shoring"
        backRoute="/equipment"
        icon="fas fa-plus"
        form={<EquipmentForm equipType="shoring" />}
      />
      <div className="job-body">
        {shoringList.length === 0 && <h1>No shoring available.</h1>}
        <div className="equip-list">
          {equipment
            .filter((item) => item.equipType === 'shoring')
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
          <div className="equip-filler"></div>
        </div>
      </div>
    </div>
  );
};

ShoringList.propTypes = {
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  equipment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user,
  equipment: state.equipment,
});

export default connect(mapStateToProps)(withRouter(ShoringList));
