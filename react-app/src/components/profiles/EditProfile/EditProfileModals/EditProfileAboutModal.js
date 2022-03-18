import Modal from '../../../other/Modal';
import EditProfileAboutForm from '../EditProfileForms/EditProfileAboutForm';

const EditProfileAboutModal = ({userProfile, showEditAboutModal, setShowEditAboutModal}) => {

    return (
        <>
            {showEditAboutModal && (
                <Modal onClose={()=> setShowEditAboutModal(false)}>
                    <EditProfileAboutForm setShowEditAboutModal={setShowEditAboutModal} userProfile={userProfile} />
                </Modal>
            )}
        </>
    )
}

export default EditProfileAboutModal;
