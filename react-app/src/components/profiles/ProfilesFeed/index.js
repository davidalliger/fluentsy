import { useSelector } from "react-redux"
import { getAge } from "../../../utils";
import './ProfilesFeed.css'
import {Link} from 'react-router-dom';

const ProfilesFeed = () => {
    const profileState = useSelector(state => state.profiles);
    const profiles = Object.values(profileState).reverse();

    return (
        <div>
            {profiles.map(profile => (
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
        </div>
    )
}

export default ProfilesFeed;
