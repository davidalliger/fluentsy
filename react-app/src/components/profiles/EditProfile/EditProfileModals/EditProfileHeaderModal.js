import Modal from '../../../other/Modal';
import EditProfileHeaderForm from '../EditProfileForms/EditProfileHeaderForm';

const EditProfileHeaderModal = ({userProfile, showEditHeaderModal, setShowEditHeaderModal}) => {

    return (
        <>
            {showEditHeaderModal && (
                <Modal onClose={()=> setShowEditHeaderModal(false)}>
                    <EditProfileHeaderForm setShowEditHeaderModal={setShowEditHeaderModal} userProfile={userProfile} />
                </Modal>
            )}
        </>
    )
}

export default EditProfileHeaderModal;
