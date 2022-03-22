import Modal from '../../../../other/Modal';
import AddNativeLanguageForm from '../AddNativeLanguageForm'

const AddNativeLanguageModal = ({showAddNativeLanguageModal, setShowAddNativeLanguageModal, id}) => {
    return (
        <>
            {showAddNativeLanguageModal && (
                <Modal onClose={()=> setShowAddNativeLanguageModal(false)}>
                    <AddNativeLanguageForm id={id} setShowModal={setShowAddNativeLanguageModal} />
                </Modal>
            )}
        </>
    )
}

export default AddNativeLanguageModal;
