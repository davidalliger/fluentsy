import Modal from '../../../other/Modal';
import DeleteProfile from '../DeleteProfile'

const DeleteProfileModal = ({showDeleteModal, setShowDeleteModal, id}) => {
    return (
        <>
            {showDeleteModal && (
                <Modal onClose={()=> setShowDeleteModal(false)}>
                    <DeleteProfile id={id} setShowModal={setShowDeleteModal} />
                </Modal>
            )}
        </>
    )
}

export default DeleteProfileModal;
