import Modal from '../../../../other/Modal';
import EditNativeLanguageForm from '../EditNativeLanguageForm';

const EditNativeLanguageModal = ({showEditNativeLanguageModal, setShowEditNativeLanguageModal, editNativeLanguage, user}) => {
    return (
        <>
            {showEditNativeLanguageModal && (
                <Modal onClose={()=> setShowEditNativeLanguageModal(false)}>
                    <EditNativeLanguageForm editNativeLanguage={editNativeLanguage} setShowModal={setShowEditNativeLanguageModal} user={user} />
                </Modal>
            )}
        </>
    )
}

export default EditNativeLanguageModal;
