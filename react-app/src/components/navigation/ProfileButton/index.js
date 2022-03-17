import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from '../../auth/LogoutButton';
import { useHistory } from 'react-router-dom';
import Modal from '../../other/Modal';
import NoProfile from '../../profiles/NoProfile';
import '../Navigation.css'

const ProfileButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const profileState = useSelector(state => state.profiles);
    const profiles = Object.values(profileState);
    const userProfile = profiles.reduce((profileMatch,profile) => {
        if (profile.user_id === user.id) profileMatch = profile;
        return profileMatch;
    }, null);

    const handleProfile = () => {
        if (userProfile) {
            history.push(`/users/${user.id}`);
        } else {
            setShowModal(true);
        }
    }

    useEffect(() => {
        const closeMenu = () => {
            setShowMenu(false);
        }
        if (showMenu) {
            document.addEventListener('click', closeMenu);
            return () => document.removeEventListener('click', closeMenu);
        }
    }, [showMenu])

    return (
        <>
            <div id="profile-button" onClick={() => setShowMenu(true)}>
                <i className="fa-solid fa-circle-user"></i>
            </div>
            {showMenu && (
                <div id='menu'>
                    <div className='menu-item' onClick={handleProfile}>
                        My Profile
                    </div>
                    <LogoutButton className='menu-item' user={user}/>
                </div>
            )}
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <NoProfile setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default ProfileButton;
