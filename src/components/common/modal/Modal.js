import React from "react";
import "./Modal.scss";
import kakaoTalk from "../../../assets/images/KakaoTalk.png";
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <img src={kakaoTalk}></img>
      </div>
    </div>
  );
};

export default Modal;
