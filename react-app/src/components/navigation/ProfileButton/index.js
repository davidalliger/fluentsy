import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from '../../auth/LogoutButton';
import { useHistory, Link } from 'react-router-dom';
import Modal from '../../other/Modal';
import NoProfile from '../../profiles/NoProfile';
import '../Navigation.css'

const ProfileButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState(false)
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const profileState = useSelector(state => state.profiles);
    const profiles = Object.values(profileState);
    const userProfile = profiles.reduce((profileMatch,profile) => {
        if (profile.userId === user.id) profileMatch = profile;
        return profileMatch;
    }, null);

    useEffect(() => {
        if (userProfile) {
            setProfile(true);
        } else {
            setProfile(false);
        }
    }, [userProfile])


    const handleProfile = () => {
        if (userProfile) {
            history.push(`/users/${user.id}`);
        } else {
            setShowModal(true);
        }
    }

    const handleLanguages = () => {
        if (userProfile) {
            history.push('/languages');
        } else {
            setShowModal(true);
        }
    }

    const openMenu = (e) => {
        if (showMenu) return;
        setShowMenu(true);
    };

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
            <div onClick={openMenu}>
                {userProfile?.imgUrl && (
                    <div className='nav-bar-user-image' style={{backgroundImage: `url(${userProfile.imgUrl})`}} />
                )}
                {(!userProfile?.imgUrl) && (
                    <i className="fa-solid fa-circle-user" id='profile-button'></i>
                )}
            </div>
            {showMenu && (
                <div id='menu'>
                    <div id='menu-title'>
                        Logged in as: <span id='menu-title-username'>{user.username}</span>
                    </div>
                    <div className='menu-item' onClick={handleProfile}>
                        My Profile
                    </div>
                    <div className='menu-item' onClick={handleLanguages}>
                        My Languages
                    </div>
                    {profile && (
                        <Link className='menu-item' to={{pathname: "/messages", state:{currentCorrespondent: null}}}>
                            <div>
                                My Messages
                            </div>
                        </Link>
                    )}
                    {!profile && (
                        <div className='menu-item' onClick={() =>setShowModal(true)}>
                            My Messages
                        </div>
                    )}
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
