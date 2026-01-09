import styles from './ModalForm.module.css'; 

function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.content}>
        
        {/* ENVUELVE EL CONTENIDO EN EL DIV DEL BODY */}
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;