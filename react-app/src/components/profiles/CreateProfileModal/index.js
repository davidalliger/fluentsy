import Modal from '../../../other/Modal';
import CreateProfileForms from '../CreateProfileForms';

const LoginModal = ({showModal, setShowModal}) => {

    return (
        <>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <CreateProfileForms setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default LoginModal;
