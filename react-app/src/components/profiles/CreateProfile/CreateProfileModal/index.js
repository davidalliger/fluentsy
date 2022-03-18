import Modal from '../../../other/Modal';
import CreateProfileForms from '../CreateProfileForms'

const CreateProfileModal = ({showModal, setShowModal}) => {

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

export default CreateProfileModal;
