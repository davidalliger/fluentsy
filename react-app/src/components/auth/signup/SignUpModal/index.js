import Modal from '../../../other/Modal';
import SignUpForm from '../SignUpForm';

const SignUpModal = ({showModal, setShowModal}) => {

    return (
        <>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <SignUpForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default SignUpModal;
