import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ProfilePage.css'
import { getAge } from '../../../utils';

const ProfilePage = () => {
    const { id } = useParams();
    const profileState = useSelector(state => state.profiles);
    const profiles = Object.values(profileState);
    const userProfile = profiles.reduce((profileMatch,profile) => {
        if (profile.userId === +id) profileMatch = profile;
        return profileMatch;
    }, null);
    console.log(userProfile);
    console.log(userProfile.imgUrl);

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
