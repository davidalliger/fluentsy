import Modal from '../../../../other/Modal';
import EditTargetLanguageForm from '../EditTargetLanguageForm';

const EditTargetLanguageModal = ({showEditTargetLanguageModal, setShowEditTargetLanguageModal, editTargetLanguage, user}) => {
    return (
        <>
            {showEditTargetLanguageModal && (
                <Modal onClose={()=> setShowEditTargetLanguageModal(false)}>
                    <EditTargetLanguageForm editTargetLanguage={editTargetLanguage} setShowModal={setShowEditTargetLanguageModal} user={user} />
                </Modal>
            )}
        </>
    )
}

export default EditTargetLanguageModal;
