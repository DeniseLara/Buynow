import './ModalForm.css'; 
import { IoMdClose } from "react-icons/io";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" 
        onClick={onClose}
        aria-label='close window'
        type='button'>
          <IoMdClose/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
