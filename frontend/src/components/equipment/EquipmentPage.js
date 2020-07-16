import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import CategoryHeader from '../CategoryHeader';
import EquipmentEditForm from './EquipmentEditForm';
import EquipInfo from './equipPage/EquipInfo';
import EquipAttachments from './equipPage/EquipAttachments';
import EquipComments from './equipPage/EquipComments';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  markAvailable,
  markUnavailable,
  markMaintenance,
  updateAttachment,
} from '../../redux/actions/equipmentAction';

const EquipmentPage = (props) => {
  const equipId = props.match.params.id;
  const { equipment } = props.equipment;

  const [currentEquip, setCurrentEquip] = useState({});
  const [page, setPage] = useState('equipInfo');

  useEffect(() => {
    if (equipment.length === 0) {
      props.history.push('/equipment');
    } else {
      let equip = equipment.filter((item) => item._id === equipId)[0];
      setCurrentEquip(equip);

      // This is for when a user deletes the equipment and hits the back button
      // so in CategoryHeader the props.history.goBack() doesn't return to this page
      if (!equip) {
        props.history.push('/equipment');
      }

      console.log(equip);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipment]);

  const handleCheck = (e) => {
    // if e.target.checked === true, markAvailable()
    if (e.target.checked === true) {
      props.markAvailable(equipId);
    }
    // if e.target.checked === false, markUnAvailable()
    if (e.target.checked === false) {
      props.markUnavailable(equipId);
    }
  };

  const handleMaintenaceChange = (e) => {
    props.markMaintenance(equipId, e.target.checked);
  };

  const handlePageChange = (e) => {
    setPage(e.target.id);
  };

  const handleUpdateAttachment = (e, attachment) => {
    e.preventDefault();

    let attachments = currentEquip.attachments;
    attachments.push(attachment);

    props.updateAttachment(equipId, attachments);
  };

  const handleDeleteAttachment = (i) => {
    let attachments = currentEquip.attachments;
    attachments.splice(i, 1);
    props.updateAttachment(equipId, attachments);
  };

  return (
    <div>
      <CategoryHeader
        title={currentEquip.equipBrand}
        icon="fas fa-pen-square"
        form={<EquipmentEditForm equipId={equipId} />}
      />

      <div className="equip-page-body">
        {page === 'equipInfo' && (
          <EquipInfo
            equipImage={currentEquip.equipImage}
            equipBrand={currentEquip.equipBrand}
            equipModel={currentEquip.equipModel}
            equipLocation={currentEquip.equipLocation}
            equipType={currentEquip.equipType}
            rentalDate={currentEquip.rentalDate}
            handleCheck={handleCheck}
            maintenanceChange={handleMaintenaceChange}
            available={currentEquip.available}
            needsMaintenance={currentEquip.needsMaintenance}
          />
        )}

        {page === 'equipAttachments' && (
          <EquipAttachments
            equipImage={currentEquip.equipImage}
            attachments={currentEquip.attachments}
            handleAdd={handleUpdateAttachment}
            handleDelete={handleDeleteAttachment}
          />
        )}
        {page === 'equipComments' && (
          <EquipComments
            equipImage={currentEquip.equipImage}
            equipBrand={currentEquip.equipBrand}
          />
        )}
      </div>

      <div className="equip-page-footer">
        <div className="ep-foot-container">
          <div
            id="equipInfo"
            className="ep-foot-btn"
            onClick={handlePageChange}
          >
            <i id="equipInfo" className="fas fa-info-circle"></i>
          </div>
          <div className="line"></div>
          <div
            id="equipAttachments"
            className="ep-foot-btn"
            onClick={handlePageChange}
          >
            <i id="equipAttachments" className="fas fa-paperclip"></i>
          </div>
          <div className="line"></div>
          <div
            id="equipComments"
            className="ep-foot-btn"
            onClick={handlePageChange}
          >
            <i id="equipComments" className="far fa-comments"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

EquipmentPage.propTypes = {
  job: PropTypes.object.isRequired,
  equipment: PropTypes.object.isRequired,
  markAvailable: PropTypes.func.isRequired,
  markUnavailable: PropTypes.func.isRequired,
  markMaintenance: PropTypes.func.isRequired,
  updateAttachment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  equipment: state.equipment,
});

export default connect(mapStateToProps, {
  markAvailable,
  markUnavailable,
  markMaintenance,
  updateAttachment,
})(withRouter(EquipmentPage));
