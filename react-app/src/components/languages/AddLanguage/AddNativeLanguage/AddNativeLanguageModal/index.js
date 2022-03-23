import Modal from '../../../../other/Modal';
import AddNativeLanguageForm from '../AddNativeLanguageForm'

const AddNativeLanguageModal = ({showAddNativeLanguageModal, setShowAddNativeLanguageModal, user}) => {
    return (
        <>
            {showAddNativeLanguageModal && (
                <Modal onClose={()=> setShowAddNativeLanguageModal(false)}>
                    <AddNativeLanguageForm setShowModal={setShowAddNativeLanguageModal} user={user} />
                </Modal>
            )}
        </>
    )
}

export default AddNativeLanguageModal;
