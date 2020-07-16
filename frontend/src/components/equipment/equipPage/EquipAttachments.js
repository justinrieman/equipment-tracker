import React, { useState } from 'react';

const EquipAttachments = (props) => {
  const [attachment, setAttachment] = useState(null);

  const handleChange = (e) => {
    setAttachment(e.target.value);
  };

  const handleAdd = (e) => {
    props.handleAdd(e, attachment);
    setAttachment('');
  };

  const handleDelete = (e) => {
    props.handleDelete(e.target.parentNode.getAttribute('index'));
  };

  return (
    <div className="equip-page-container">
      <div className="equip-individual-img">
        <img
          src={'http://localhost:5000/' + props.equipImage}
          alt={props.equipBrand}
        ></img>
      </div>
      <div className="equip-extras">
        <h1 className="job-page-title equip-page-title">Attachments</h1>
        <div className="equip-page-table">
          {props.attachments.map((attachment, i) => {
            return (
              <div
                key={i}
                index={i}
                className="table-section table-section-flex"
              >
                <h2 className="table-value">{attachment}</h2>
                <i
                  onClick={handleDelete}
                  className="far fa-trash-alt table-delete"
                ></i>
              </div>
            );
          })}

          <form className="table-section table-section-flex">
            <input
              onChange={handleChange}
              className="table-input"
              type="text"
              name="attachment"
              value={attachment}
              placeholder="Add an attachment ..."
            />
            <button className="table-add" type="submit" onClick={handleAdd}>
              <i className="fas fa-plus-circle table-add"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EquipAttachments;
