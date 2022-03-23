import Modal from '../../../../other/Modal';
import AddTargetLanguageForm from '../AddTargetLanguageForm'

const AddTargetLanguageModal = ({showAddTargetLanguageModal, setShowAddTargetLanguageModal, user}) => {
    return (
        <>
            {showAddTargetLanguageModal && (
                <Modal onClose={()=> setShowAddTargetLanguageModal(false)}>
                    <AddTargetLanguageForm setShowModal={setShowAddTargetLanguageModal} user={user} />
                </Modal>
            )}
        </>
    )
}

export default AddTargetLanguageModal;
