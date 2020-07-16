import React from 'react';

const EquipComments = (props) => {
  return (
    <div className="equip-page-container">
      <div className="equip-individual-img">
        <img
          src={'http://localhost:5000/' + props.equipImage}
          alt={props.equipBrand}
        ></img>
      </div>

      <div className="equip-extras">
        <h1 className="job-page-title equip-page-title">Comments</h1>
        <div className="equip-page-table">
          <div className="table-section table-comments">
            {/* <div className="comment">
              <p className="comment-name">Justin</p>
              <p className="comment-time">March 3, 2020</p>
              <p className="comment-text">
                hello this is a comment a very long comment with absolutely no
                meaning what so ever i thing that might have to be one word but
                im really not sure
              </p>
            </div> */}

            <div className="comment">
              <p className="comment-text">
                There are no comments on this equipment.
              </p>
            </div>
            {/* <div className="comment">
              <p className="comment-name">Justin</p>
              <p className="comment-time">January 3, 2020</p>
              <p className="comment-text">this machine is awesome</p>
            </div>
            <div className="comment">
              <p className="comment-name">Justin</p>
              <p className="comment-time">March 3, 2020</p>
              <p className="comment-text">hello this is a comment</p>
            </div>
            <div className="comment">
              <p className="comment-name">Justin</p>
              <p className="comment-time">March 3, 2020</p>
              <p className="comment-text">hello this is a comment</p>
            </div> */}
          </div>
          <form className="table-section table-section-flex table-comment">
            <div className="table-comment-container">
              <input
                className="table-input"
                type="text"
                name="commentName"
                placeholder="Name"
              />
              <textarea
                className="table-input"
                rows="4"
                name="commentText"
                placeholder="Add a comment ..."
              />
            </div>
            <button className="table-add" type="submit">
              <i className="fas fa-plus-circle table-add"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EquipComments;
