import Modal from '../../../other/Modal';
import EditMessageForm from '../EditMessageForm';

const EditMessageModal = ({user, editPayload, sendEditMessage, messageToEdit, setEditPayload, showEditMessageModal, setShowEditMessageModal, editErrors, setErrors, setEditErrors, setErrorReceived}) => {
    console.log('mounting editmessagemodal, showEditMessageModal is ', showEditMessageModal);
    const handleClose = () => {
        // setErrors([]);
        // setEditErrors([]);
        // setErrorReceived([])
        setShowEditMessageModal(false);
    }

    return (
        <>
            {showEditMessageModal && (
                <Modal onClose={handleClose}>
                    <EditMessageForm sendEditMessage={sendEditMessage} user={user} editPayload={editPayload} setEditPayload={setEditPayload} setShowEditMessageModal={setShowEditMessageModal} messageToEdit={messageToEdit} editErrors={editErrors} setEditErrors={setEditErrors} showEditMessageModal={showEditMessageModal}/>
                </Modal>
            )}
        </>
    )
}

export default EditMessageModal;
