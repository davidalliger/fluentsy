import Modal from '../../../../other/Modal';
// import EditNativeLanguageForm from '../EditNativeLanguageForm';

const EditNativeLanguageModal = ({showEditNativeLanguageModal, setShowEditNativeLanguageModal, editNativeLanguage}) => {
    return (
        <>
            {showEditNativeLanguageModal && (
                <Modal onClose={()=> setShowEditNativeLanguageModal(false)}>
                    {/* <EditNativeLanguageForm editNativeLanguage={editNativeLanguage} setShowModal={setShowEditNativeLanguageModal} /> */}
                </Modal>
            )}
        </>
    )
}

export default EditNativeLanguageModal;
