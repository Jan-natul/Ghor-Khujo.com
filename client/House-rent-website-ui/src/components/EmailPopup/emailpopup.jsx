import React from "react";
import "./emailPopup.scss";

const EmailPopup = ({ isOpen, onClose, poster }) => {

    console.log("EmailPopup je data peyeche:", poster);

  if (!isOpen || !poster) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="poster-info">
          <img alt={poster.username} />
          
          <p>You can contact the owner via this email:</p>
      
          <a href={`mailto:${poster.email}`}>{poster.email}</a>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;