import Modal from '../../../other/Modal';
import EditProfilePictureForm from '../EditProfileForms/EditProfilePictureForm';

const EditProfilePictureModal = ({userProfile, showEditPictureModal, setShowEditPictureModal}) => {

    return (
        <>
            {showEditPictureModal && (
                <Modal onClose={()=> setShowEditPictureModal(false)}>
                    <EditProfilePictureForm setShowEditPictureModal={setShowEditPictureModal} userProfile={userProfile} />
                </Modal>
            )}
        </>
    )
}

export default EditProfilePictureModal;
