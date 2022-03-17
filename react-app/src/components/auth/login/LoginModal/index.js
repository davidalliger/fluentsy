import { useState } from 'react';
import Modal from '../../../other/Modal';
import LoginForm from '../LoginForm';

const LoginModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='nav-button' onClick={()=> {setShowModal(true)}}>
                Log In
            </button>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default LoginModal;
