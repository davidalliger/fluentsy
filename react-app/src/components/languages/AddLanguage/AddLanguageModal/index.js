import Modal from '../../../../other/Modal';
import AddLanguageForm from '../AddNativeLanguageForm'

const AddLanguageModal = ({showAddLanguageModal, setShowAddLanguageModal, id}) => {
    return (
        <>
            {showAddLanguageModal && (
                <Modal onClose={()=> setShowAddLanguageModal(false)}>
                    <AddLanguageProfile id={id} setShowModal={setShowAddLanguageModal} />
                </Modal>
            )}
        </>
    )
}

export default AddLanguageModal;
