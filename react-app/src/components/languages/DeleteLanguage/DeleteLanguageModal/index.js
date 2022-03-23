import Modal from '../../../other/Modal';
import DeleteLanguageForm from '../DeleteLanguageForm';

const DeleteLanguageModal = ({showDeleteLanguageModal, setShowDeleteLanguageModal, id}) => {
    return (
        <>
            {showDeleteLanguageModal && (
                <Modal onClose={()=> setShowDeleteLanguageModal(false)}>
                    <DeleteLanguageForm id={id} setShowModal={setShowDeleteLanguageModal} />
                </Modal>
            )}
        </>
    )
}

export default DeleteLanguageModal;
