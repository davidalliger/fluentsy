import Modal from '../../../../other/Modal';
import UpdatePrimaryNativeForm from '../UpdatePrimaryNativeForm';

const UpdatePrimaryNativeModal = ({showUpdatePrimaryNativeModal, setShowUpdatePrimaryNativeModal, newNativePrimaryPayload, oldNativePrimaryPayload, setPrimaryNative}) => {
    return (
        <>
            {showUpdatePrimaryNativeModal && (
                <Modal onClose={()=> setShowUpdatePrimaryNativeModal(false)}>
                    <UpdatePrimaryNativeForm newNativePrimaryPayload={newNativePrimaryPayload} oldNativePrimaryPayload={oldNativePrimaryPayload} setPrimaryNative={setPrimaryNative} setShowModal={setShowUpdatePrimaryNativeModal} />
                </Modal>
            )}
        </>
    )
}

export default UpdatePrimaryNativeModal;
