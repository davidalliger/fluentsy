import Modal from '../../../other/Modal';
import LoginForm from '../LoginForm';

const LoginModal = ({showLoginModal, setShowLoginModal}) => {

    return (
        <>
            {showLoginModal && (
                <Modal onClose={()=> setShowLoginModal(false)}>
                    <LoginForm setShowLoginModal={setShowLoginModal} />
                </Modal>
            )}
        </>
    )
}

export default LoginModal;
