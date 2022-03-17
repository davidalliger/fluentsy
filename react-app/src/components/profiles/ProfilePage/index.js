import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './ProfilePage.css'

const ProfilePage = () => {
    const { id } = useParams();
    const profileState = useSelector(state => state.profiles);
    const profiles = Object.values(profileState);
    const userProfile = profiles.reduce((profileMatch,profile) => {
        if (profile.user_id === +id) profileMatch = profile;
        return profileMatch;
    }, null);
    const [showAge, setShowAge] = useState(false);

    const getAge = (date) => {
        const today = new Date();
        const birthday = new Date(date);
        birthday.setDate(birthday.getUTCDate());
        const year = 1000 * 60 * 60 * 24 * 365;
        const age = Math.floor((today - birthday)/year);
        return age;
    }

    // if (userProfile.birthday && userProfile.displayAge) {
    //     setShowAge(true);
    // }

    return (
        <div id='profile-page'>
            <div id='profile-page-heading'>
                <div id='profile-page-heading-image'>
                    {userProfile.imgUrl && (
                        <div className='profile-page-user-image' style={{backgroundImage: `url(${userProfile.imgUrl})`}} />
                        )}
                    {(!userProfile.imgUrl) && (
                        <i className="fa-solid fa-circle-user profile-page-user-no-image"></i>
                    )}
                </div>
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
                </div>
            </div>
            <div id='profile-page-lower'>
                <div id='profile-page-about'>
                    <h3>About Me</h3>
                    {userProfile.about}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;
