import Modal from '../../../other/Modal';
// import EditLanguagesForm from '

const EditLanguagesModal = ({ showModal, setShowModal}) => {

    return (
        <>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <EditMessageForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default EditLanguagesModal;
