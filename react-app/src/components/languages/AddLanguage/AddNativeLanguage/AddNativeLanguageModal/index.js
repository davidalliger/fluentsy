import Modal from '../../../../other/Modal';
import AddNativeLanguageForm from '../AddNativeLanguageForm'

const AddNativeLanguageModal = ({showAddNativeLanguageModal, setShowAddNativeLanguageModal, userProfile}) => {
    return (
        <>
            {showAddNativeLanguageModal && (
                <Modal onClose={()=> setShowAddNativeLanguageModal(false)}>
                    <AddNativeLanguageForm setShowModal={setShowAddNativeLanguageModal} userProfile={userProfile} />
                </Modal>
            )}
        </>
    )
}

export default AddNativeLanguageModal;
