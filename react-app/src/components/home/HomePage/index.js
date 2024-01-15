import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hellos, getAge } from '../../../utils'
import './HomePage.css'
import NoProfile from '../../profiles/NoProfile';
import Modal from '../../other/Modal';
import PreviewLanguages from '../../languages/PreviewLanguages'

const HomePage = () => {
    const [count, setCount] = useState(0);
    const [rendered, setRendered] = useState(false);
    const profileState = useSelector(state => state.profiles);
    const profiles = Object.values(profileState).reverse();
    const user = useSelector(state => state.session.user);
    const [showNoProfileModal, setShowNoProfileModal] = useState(false);
    const [element, setElement] = useState(null);
    const userProfile = profiles?.reduce((profileMatch, profile) => {
        if (profile.userId === +user.id) profileMatch = profile;
        return profileMatch;
    }, null);
    const showProfiles = profiles?.filter(profile => profile?.id !== userProfile?.id).slice(0,3);

    useEffect(()=> {
        setRendered(true);
    }, []);

    useEffect(() => {
        if (rendered) {
            setElement(document.getElementById('greetings'));
        }

    }, [rendered])

    useEffect(() => {
        if (element) {
            element.addEventListener('animationiteration', ()=> {
                setCount(prevCount => (prevCount + 1) % hellos.length);
            })
            return () => element.removeEventListener('animationiteration', ()=> {
                setCount(prevCount => (prevCount + 1) % hellos.length);
            })
        }
    }, [element])

    useEffect(() => {

        const timeOut = setTimeout(() => {
            if (user && profiles && !userProfile) {
                setShowNoProfileModal(true);
            } else {
                setShowNoProfileModal(false);
            }
        }, 1800)


        return () => clearTimeout(timeOut);
    }, [userProfile, user, profiles]);

    const expand = () => {
        const about1 =document.getElementById('homepage-about-section-1');
        const about2 = document.getElementById('homepage-about-section-2');
        about1.classList.add('expanded');
        about2.classList.add('hidden');
    }

    const truncate = () => {
        const about1 =document.getElementById('homepage-about-section-1');
        const about2 = document.getElementById('homepage-about-section-2');
        about1.classList.remove('expanded');
        about2.classList.remove('hidden');
    }

    return (
        <div id='homepage'>
            <div id='greetings'>
                {hellos[count]}
            </div>
            <div id='homepage-about-section'>
                Fluentsy is a community of language learners from all walks of life and every corner of the world.
                Level up your language skills by practicing with a native speaker or team up with a conversation
                partner who's learning the same language you are. Connect in real time via live chat or plan a call
                using your preferred third-party video conferencing platform. With Fluentsy in your tool belt, you'll
                be fluent in no time!
            </div>
            <div id='homepage-about-section-1' className='hidden'>
                Fluentsy is a community of language learners from all walks of life and every corner of the world.
                Level up your language skills by practicing with a native speaker or team up with a conversation
                partner who's learning the same language you are. Connect in real time via live chat or plan a call
                using your preferred third-party video conferencing platform. With Fluentsy in your tool belt, you'll
                be fluent in no time!
                <span
                    className="collapsible"
                    onClick={truncate}
                >
                    Less
                </span>
            </div>
            <div id='homepage-about-section-2' className='truncated'>
                Fluentsy is a community of language learners from all walks of life and every corner of the world.
                Level up your language skills...
                <span
                    className="collapsible"
                    onClick={expand}
                >
                    Expand
                </span>
            </div>
            <div id='homepage-new-users-title-div'>
                New Users:
                <span>
                    <Link to='/users' >
                        See more
                    </Link>
                </span>
            </div>
            <div id='home-page-new-users-area'>
                {showProfiles.map(profile => (
                        <div className='homepage-user-container' key={profile.id}>
                            <div className='homepage-user-left'>

                                <div className='homepage-image'>
                                    {profile.imgUrl && (
                                        <div className='homepage-user-image' style={{backgroundImage: `url(${profile.imgUrl})`}} />
                                        )}
                                    {(!profile.imgUrl) && (
                                        <i className="fa-solid fa-circle-user homepage-user-no-image"></i>
                                    )}
                                </div>
                                <div className='homepage-user-basic-info'>
                                    <div className='homepage-username'>
                                        <h2>{profile.username}</h2>
                                    </div>
                                    {(profile.birthday && profile.displayAge) && (
                                        <div className='homepage-age'>
                                            {getAge(profile.birthday)} years old
                                        </div>
                                    )}
                                    <div className='homepage-location'>
                                        <p>
                                            {profile.state && (
                                            <span>{profile.state}, </span>
                                            )}
                                            {profile.country}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='homepage-user-right'>
                                <PreviewLanguages userProfile={profile} id={profile.id} />
                            </div>
                        </div>

                ))}
            </div>
            {showNoProfileModal && (
                <Modal onClose={()=> setShowNoProfileModal(false)}>
                    <NoProfile setShowModal={setShowNoProfileModal} />
                </Modal>
            )}
        </div>
    )
}

export default HomePage;
