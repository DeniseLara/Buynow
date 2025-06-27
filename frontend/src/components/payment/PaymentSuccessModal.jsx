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
    <div className="modal-overlay-sucess">
      <div className="modal-content-sucess">
      <div className="modal-header-sucess">
        <h2 className='modal-content-title'> Payment Successful</h2>
            <strong><GrStatusGood/></strong>
      </div>
        <p>Your payment has been processed successfully.</p>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
