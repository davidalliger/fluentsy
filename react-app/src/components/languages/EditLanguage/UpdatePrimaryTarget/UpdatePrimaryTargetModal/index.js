import Modal from '../../../../other/Modal';
import UpdatePrimaryTargetForm from '../UpdatePrimaryTargetForm';

const UpdatePrimaryTargetModal = ({showUpdatePrimaryTargetModal, setShowUpdatePrimaryTargetModal, newTargetPrimaryPayload, oldTargetPrimaryPayload, setPrimaryTarget}) => {
    return (
        <>
            {showUpdatePrimaryTargetModal && (
                <Modal onClose={()=> setShowUpdatePrimaryTargetModal(false)}>
                    <UpdatePrimaryTargetForm newTargetPrimaryPayload={newTargetPrimaryPayload} oldTargetPrimaryPayload={oldTargetPrimaryPayload} setPrimaryTarget={setPrimaryTarget} setShowModal={setShowUpdatePrimaryTargetModal} />
                </Modal>
            )}
        </>
    )
}

export default UpdatePrimaryTargetModal;
