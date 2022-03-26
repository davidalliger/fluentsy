import { useSelector } from "react-redux"
import { getAge } from "../../../utils";
import './ProfilesFeed.css'
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Modal from "../../other/Modal";
import NoProfile from "../NoProfile";

const ProfilesFeed = () => {
    const profileState = useSelector(state => state.profiles);
    const profiles = Object.values(profileState).reverse();
    const user = useSelector(state => state.session.user);
    const [ignore, setIgnore] = useState(false);
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [showNoProfileModal, setShowNoProfileModal] = useState(false);
    const userProfile = profiles?.reduce((profileMatch, profile) => {
        if (profile.userId === +user.id) profileMatch = profile;
        return profileMatch;
    }, null);
    const showProfiles = profiles.filter(profile => profile.id !== userProfile.id);

    useEffect(() => {

        const timeOut = setTimeout(() => {
            if (user && profiles && !userProfile) {
                setShowNoProfileModal(true);
            } else {
                setShowNoProfileModal(false);
            }
        }, 700)


        return () => clearTimeout(timeOut);
    }, [userProfile])



    return (
        <div id='profiles-feed-page'>
            {showProfiles.map(profile => (
                <Link  className='profiles-feed-link' key={profile.id} to={`/users/${profile.userId}`}>
                    <div className='profiles-feed-container'>
                        <div className='profiles-feed-image'>
                            {profile.imgUrl && (
                                <div className='profiles-feed-user-image' style={{backgroundImage: `url(${profile.imgUrl})`}} />
                                )}
                            {(!profile.imgUrl) && (
                                <i className="fa-solid fa-circle-user profiles-feed-user-no-image"></i>
                            )}
                        </div>
                        <div className='profiles-feed-basic-info'>
                            <div className='profiles-feed-username'>
                                <h2>{profile.username}</h2>
                            </div>
                            <div className='profiles-feed-location'>
                                <p>
                                    {profile.state && (
                                    <span>{profile.state}, </span>
                                    )}
                                    {profile.country}
                                </p>
                            </div>
                            {(profile.birthday && profile.displayAge) && (
                                <div className='profiles-feed-age'>
                                    {getAge(profile.birthday)} years old
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
            {showNoProfileModal && (
                <Modal onClose={()=> setShowNoProfileModal(false)}>
                    <NoProfile setShowModal={setShowNoProfileModal} setIgnore={setIgnore}/>
                </Modal>
            )}
        </div>
    )
}

export default ProfilesFeed;
