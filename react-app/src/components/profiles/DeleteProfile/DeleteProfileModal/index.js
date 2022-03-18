import Modal from '../../../other/Modal';
import DeleteProfile from '../DeleteProfile'

const DeleteProfileModal = ({showModal, setShowModal, id}) => {
    console.log("id is ", id);
    return (
        <>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <DeleteProfile id={id} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default DeleteProfileModal;
