import Modal from '../../../../other/Modal';
// import EditTargetLanguageForm from '../EditTargetLanguageForm';

const EditTargetLanguageModal = ({showEditTargetLanguageModal, setShowEditTargetLanguageModal, editTargetLanguage}) => {
    return (
        <>
            {showEditTargetLanguageModal && (
                <Modal onClose={()=> setShowEditTargetLanguageModal(false)}>
                    {/* <EditTargetLanguageForm editTargetLanguage={editTargetLanguage} setShowModal={setShowEditTargetLanguageModal} /> */}
                </Modal>
            )}
        </>
    )
}

export default EditTargetLanguageModal;
