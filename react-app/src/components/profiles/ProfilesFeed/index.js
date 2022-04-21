import { useSelector } from "react-redux"
import { getAge } from "../../../utils";
import './ProfilesFeed.css'
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Modal from "../../other/Modal";
import NoProfile from "../NoProfile";
import FeedLanguages from '../../languages/FeedLanguages'
import { languages, countries } from "../../../utils";

const ProfilesFeed = () => {
    const profileState = useSelector(state => state.profiles);
    const allProfiles = Object.values(profileState).reverse();
    const user = useSelector(state => state.session.user);
    const userProfile = allProfiles?.reduce((profileMatch, profile) => {
        if (profile.userId === +user?.id) profileMatch = profile;
        return profileMatch;
    }, null);
    const showProfiles = allProfiles?.filter(profile => profile?.id !== userProfile?.id);
    const [showNoProfileModal, setShowNoProfileModal] = useState(false);
    const [checked, setChecked] = useState(false);
    const [nativeClass, setNativeClass] = useState('native-off');
    const [username, setUsername] = useState('');
    const [language, setLanguage] = useState('');
    const [country, setCountry] = useState('');
    const [profiles, setProfiles] = useState(showProfiles)

    useEffect(() => {

        const timeOut = setTimeout(() => {
            if (!userProfile) {
                setShowNoProfileModal(true);
            } else {
                setShowNoProfileModal(false);
            }
        }, 1800)


        return () => clearTimeout(timeOut);
    }, [userProfile])

    useEffect(()=> {
        if (checked) {
            setNativeClass('native-on')
        } else {
            setNativeClass('native-off')
        }
    }, [checked]);

    useEffect(()=> {
        console.log("Inside useEffect");
        let filteredProfiles = showProfiles;
        if (username) {
            console.log('username is ', username);
            const regex = new RegExp(username, 'i');
            console.log('regex is ', regex);
            filteredProfiles = filteredProfiles.filter(profile => regex.test(profile.username));
            console.log('filteredProfiles is ', filteredProfiles);
        }
        if (language) {
            filteredProfiles = filteredProfiles.filter(profile => {
                const userLanguages = new Set(profile.languages.map(language => language.name));
                return userLanguages.has(language);
            });
            if (filteredProfiles.length && checked) {
                filteredProfiles = filteredProfiles.filter(profile => {
                    const foundLanguage = profile.languages.filter(currentLanguage => currentLanguage.name === language)[0];
                    return foundLanguage.native;
                })
            }
        }
        if (country) {
            filteredProfiles = filteredProfiles.filter(profile => profile.country === country);
        }
        setProfiles(filteredProfiles);

    }, [checked, language, country, username, profileState])

    const handleNative = () => {
        setChecked(!checked);
    }

    return (
        <>
            <div id='search-bar'>
                <form id='search-form'>
                    I'm looking for a partner named
                    <input
                        type='text'
                        placeholder='anything'
                        className="search-input"
                        onChange={e => setUsername(e.target.value)}
                    />
                    who speaks
                    <select
                        value={language}
                        className="search-input"
                        onChange={e => setLanguage(e.target.value)}
                    >
                        <option value=''>any language</option>
                        {languages.map((language, index) => (
                            <option
                                value={language}
                                key={index}
                            >{language}</option>
                        ))}
                    </select>
                    <label
                        htmlFor='nativeSpeaker'
                        // id='nativeToggle'
                        // className={nativeClass}
                    >
                        <input
                            type='checkbox'
                            id='nativeSpeaker'
                            name='nativeSpeaker'
                            className="search-input"
                            // className='form-input'
                            onChange={handleNative}
                            // value={displayAge}
                            checked={checked}
                        />
                        <span className={nativeClass}>natively</span>
                    </label> and lives in
                    <select
                        value={country}
                        className="search-input"
                        onChange={e => setCountry(e.target.value)}
                    >
                        <option value=''>any location</option>
                        {countries.map((country, index) => (
                            <option
                                value={country}
                                key={index}
                            >{country}</option>
                        ))}
                    </select>
                    .
                </form>
            </div>
            {!profiles.length && (
                <div id='no-profiles-matched'>
                    No users matched your search.
                </div>
            )}
            {profiles.length && (
                <div id='profiles-feed-page'>
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
                                    {(profile.birthday && profile.displayAge) && (
                                        <div className='profiles-feed-age'>
                                            {getAge(profile.birthday)} years old
                                        </div>
                                    )}
                                    <div className='profiles-feed-location'>
                                        <p>
                                            {profile.state && (
                                            <span>{profile.state}, </span>
                                            )}
                                            {profile.country}
                                        </p>
                                    </div>
                                </div>
                                <FeedLanguages userProfile={profile} id={profile.id} />
                            </div>
                        </Link>
                    ))}
                    {showNoProfileModal && (
                        <Modal onClose={()=> setShowNoProfileModal(false)}>
                            <NoProfile setShowModal={setShowNoProfileModal} />
                        </Modal>
                    )}
                </div>
            )}
        </>
    )
}

export default ProfilesFeed;
