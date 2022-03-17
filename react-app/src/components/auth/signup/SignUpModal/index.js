import { useState } from 'react';
import Modal from '../../../other/Modal';
import SignUpForm from '../SignUpForm';

const SignUpModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='nav-button' onClick={()=> {setShowModal(true)}}>
                Sign Up
            </button>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <SignUpForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default SignUpModal;
