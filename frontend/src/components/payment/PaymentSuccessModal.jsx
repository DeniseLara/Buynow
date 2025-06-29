import './ModalForm.css'; 
import { useEffect } from 'react';
import { GrStatusGood } from "react-icons/gr";

function PaymentSuccessModal({ onClose }) {

  // UseEffect para cerrar el modal automáticamente después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Llamamos a onClose después de 3 segundos
    }, 3000); // 3000ms = 3 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador en caso de que el componente se desmonte
  }, [onClose]);

  return (
    <div 
      className="modal-overlay-sucess" 
      role="alertdialog" 
      aria-modal="true"  
      aria-labelledby="modal-success-title" 
      aria-describedby="modal-success-message"
    >
      <section className="modal-content-sucess">
        <header className="modal-header-sucess">
          <h2 id="modal-success-title" className='modal-content-title'> Payment Successful</h2>
          <strong><GrStatusGood/></strong>
        </header>

        <p id="modal-success-message">Your payment has been processed successfully.</p>
      </section>
    </div>
  );
};

export default PaymentSuccessModal;
