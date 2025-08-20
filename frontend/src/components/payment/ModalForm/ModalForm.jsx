import styles from './ModalForm.module.css'; 
import { IoMdClose } from "react-icons/io";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.content}>
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label='close window'
          type='button'
        >
          <IoMdClose/>
        </button>
        
        {children}
      </div>
    </div>
  );
};

export default Modal;
