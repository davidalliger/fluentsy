import { useParams, Link, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './ProfilePage.css'
import { getAge } from '../../../utils';
import { useEffect, useState } from 'react';
import DeleteProfileModal from '../DeleteProfile/DeleteProfileModal';
import EditProfileAboutModal from '../EditProfile/EditProfileModals/EditProfileAboutModal';
import EditProfileHeaderModal from '../EditProfile/EditProfileModals/EditProfileHeaderModal';
import EditProfilePictureModal from '../EditProfile/EditProfileModals/EditProfilePictureModal';
import SendMessageModal from '../../messages/SendMessage/SendMessageModal';
import Loading from '../../other/Loading';
import Languages from '../../languages/ProfileLanguages';
import NoProfile from '../NoProfile';
import Modal from '../../other/Modal';
import { checkProfileExists } from '../../../store/profiles';


const ProfilePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const profileState = useSelector(state => state.profiles);
    const profiles = Object.values(profileState);
    const userProfile = profiles?.reduce((profileMatch, profile) => {
        if (profile.userId === +id) profileMatch = profile;
        return profileMatch;
    }, null);
    const hasProfile = profiles?.reduce((profileMatch, profile) => {
        if (profile.userId === +user.id) profileMatch = profile;
        return profileMatch;
    }, null);
    const [showNoProfileModal, setShowNoProfileModal] = useState(false);
    const [showEditAboutModal, setShowEditAboutModal] = useState(false);
    const [showEditHeaderModal, setShowEditHeaderModal] = useState(false);
    const [showEditPictureModal, setShowEditPictureModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userHasProfile, setUserHasProfile] = useState(false);
    const [ignore, setIgnore] = useState(false);
    // const history = useHistory();
    const handleDelete = () => {
        setShowDeleteModal(true);
    }


    useEffect(() => {
        (async() => {
            console.log('in useEffect, checking for profile')
            const response = await dispatch(checkProfileExists(id));
            console.log('response is ', response);
            if (response.not_found) {
                history.push('/404-not-found');
            }
        })()
    }, [])

    useEffect(() => {
        if (hasProfile) {
            setUserHasProfile(true);
        }
    }, [hasProfile])

    // const handleMessage = () => {
    //     history.push(`/messages/${userProfile.userId}`)
    //     // setShowMessageModal(true);
    // }


    return (
        <div>
            {!userProfile && (
                <Loading />
            )}
            {userProfile && (
                <div id='profile-page'>
                    <div id='profile-page-card'>
                        <div id='profile-page-heading'>
                            <div id='profile-page-heading-image'
                                // onMouseEnter={handleHover}
                                // onMouseLeave={handleLeave}
                            >
                                {userProfile.imgUrl && (
                                    <div className='profile-page-user-image' style={{backgroundImage: `url(${userProfile.imgUrl})`}} />
                                    )}
                                {(!userProfile.imgUrl) && (
                                    <i className="fa-solid fa-circle-user profile-page-user-no-image"></i>
                                )}
                            </div>
                            {(user.id === +id) && (
                                <div
                                    id='profile-page-edit-picture'
                                    onClick={()=>setShowEditPictureModal(true)}
                                >
                                    <i className="fa-solid fa-camera"></i>
                                    <p id='profile-page-edit-picture-text'>Update Image</p>
                                </div>
                            )}
                            <EditProfilePictureModal showEditPictureModal={showEditPictureModal} setShowEditPictureModal={setShowEditPictureModal} userProfile={userProfile}/>
                            <div id='profile-page-heading-info-containter'>
                                <div id='profile-page-heading-info'>
                                    <div id='profile-page-username'>
                                        <h1>{userProfile.username}</h1>
                                    </div>
                                    <div id='profile-page-location'>
                                        <p>
                                            {userProfile.state && (
                                                <span>{userProfile.state}, </span>
                                                )}
                                            {userProfile.country}
                                        </p>
                                    </div>
                                    <div id='profile-page-timezone'>
                                        {/* {userProfile.timezone} */}
                                    </div>
                                    {(userProfile.birthday && userProfile.displayAge) && (
                                        <div id='profile-page-timezone'>
                                            {getAge(userProfile.birthday)} years old
                                        </div>
                                    )}
                                    {(user.id !== +id) && (
                                        <>
                                            {userHasProfile && (
                                                <Link to={{pathname: '/messages', state:{currentCorrespondent: userProfile}}}>
                                                    <button
                                                        id='profile-page-message-button'
                                                    >
                                                        Message
                                                    </button>
                                                </Link>
                                            )}
                                            {!userHasProfile && (
                                                    <button
                                                        id='profile-page-message-button'
                                                        onClick={() => setShowNoProfileModal(true)}
                                                    >
                                                        Message
                                                    </button>
                                            )}
                                        </>
                                    )}
                                    {/* <SendMessageModal showMessageModal={showMessageModal} setShowMessageModal={setShowMessageModal} userProfile={userProfile} user={user}/> */}
                                </div>
                                {(user.id === +id) && (
                                    <div
                                        className='profile-page-edit-button'
                                        onClick={() => setShowEditHeaderModal(true)}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </div>
                                )}
                                <EditProfileHeaderModal showEditHeaderModal={showEditHeaderModal} setShowEditHeaderModal={setShowEditHeaderModal} userProfile={userProfile}/>
                            </div>
                        </div>
                        <Languages userProfile={userProfile} user={user} id={id} />
                        <div id='profile-page-lower'>
                            <div id='profile-page-about-container'>
                                <div id='profile-page-about'>
                                    <h3 className='profile-section-heading'>About Me</h3>
                                    {userProfile.about}
                                </div>
                                {(user.id === +id) && (
                                    <div
                                        className='profile-page-edit-button'
                                        onClick={() => setShowEditAboutModal(true)}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </div>
                                )}
                                <EditProfileAboutModal showEditAboutModal={showEditAboutModal} setShowEditAboutModal={setShowEditAboutModal} userProfile={userProfile}/>
                            </div>
                        </div>
                    </div>
                    {(user.id === +id) && (
                        <div id='profile-page-delete-div'>
                            <button className='profile-page-delete-button' onClick={handleDelete}>Delete Profile</button>
                        </div>
                    )}
                    <DeleteProfileModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} id={userProfile?.id} user={user}/>
                    {showNoProfileModal && (
                        <Modal onClose={()=> setShowNoProfileModal(false)}>
                            <NoProfile setShowModal={setShowNoProfileModal} setIgnore={setIgnore}/>
                        </Modal>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProfilePage;
