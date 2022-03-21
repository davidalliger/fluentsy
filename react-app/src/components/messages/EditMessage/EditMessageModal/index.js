import Modal from '../../../other/Modal';
import EditMessageForm from '../EditMessageForm';

const EditMessageModal = ({user, editPayload, sendEditMessage, messageToEdit, setEditPayload, showEditMessageModal, setShowEditMessageModal}) => {

    return (
        <>
            {showEditMessageModal && (
                <Modal onClose={()=> setShowEditMessageModal(false)}>
                    <EditMessageForm sendEditMessage={sendEditMessage} user={user} editPayload={editPayload} setEditPayload={setEditPayload} setShowEditMessageModal={setShowEditMessageModal} messageToEdit={messageToEdit} />
                </Modal>
            )}
        </>
    )
}

export default EditMessageModal;
