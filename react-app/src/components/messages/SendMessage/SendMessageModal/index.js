import Modal from '../../../other/Modal';
import SendMessageForm from '../SendMessageForm';

const SendMessageModal = ({userProfile, showMessageModal, setShowMessageModal, user}) => {

    return (
        <>
            {showMessageModal && (
                <Modal onClose={()=> setShowMessageModal(false)}>
                    <SendMessageForm setShowMessageModal={setShowMessageModal} userProfile={userProfile} user={user}/>
                </Modal>
            )}
        </>
    )
}

export default SendMessageModal;
