import Modal from '../../../other/Modal';
import DeleteProfile from '../DeleteProfile'

const DeleteProfileModal = ({showDeleteModal, setShowDeleteModal, id, user}) => {
    return (
        <>
            {showDeleteModal && (
                <Modal onClose={()=> setShowDeleteModal(false)}>
                    <DeleteProfile user={user} id={id} setShowModal={setShowDeleteModal} />
                </Modal>
            )}
        </>
    )
}

export default DeleteProfileModal;
