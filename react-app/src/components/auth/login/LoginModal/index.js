import Modal from '../../../other/Modal';
import LoginForm from '../LoginForm';

const LoginModal = ({showModal, setShowModal}) => {

    return (
        <>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default LoginModal;
