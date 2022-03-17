import { useModal } from "../../../context/Modal";
import ReactDOM from "react-dom";
import './Modal.css'

const Modal = ({onClose, children}) => {
    const modalNode = useModal();
    if(!modalNode) return null;

    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={onClose} />
            <div id='modal-content'>
                {children}
            </div>
        </div>,
        modalNode
    );
}

export default Modal;
