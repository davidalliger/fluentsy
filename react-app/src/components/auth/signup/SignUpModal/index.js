import Modal from '../../../other/Modal';
import SignUpForm from '../SignUpForm';

const SignUpModal = ({showSignUpModal, setShowSignUpModal}) => {

    return (
        <>
            {showSignUpModal && (
                <Modal onClose={()=> setShowSignUpModal(false)}>
                    <SignUpForm setShowSignUpModal={setShowSignUpModal} />
                </Modal>
            )}
        </>
    )
}

export default SignUpModal;
