import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SignUpModal from "../../auth/signup/SignUpModal";
import ProfilesFeed from "../../profiles/ProfilesFeed";
import './LandingPage.css'

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.session.user);


    if (user) {
        return <ProfilesFeed />
    }

    const landingPageImg = '/images/landing-page.jpg';

    return (
        <div id='landing-page'>
            <div>
                <div id='landing-page-card'>
                    <div id='landing-page-intro-text-div'>
                        <h1>Become fluent in any language</h1>
                        <div id='landing-page-list'>
                            <p id='landing-page-list-1'>
                                Bullet Point
                            </p>
                            <p id='landing-page-list-2'>
                                Bullet Point
                            </p>
                            <p id='landing-page-list-3'>
                                Bullet Point
                            </p>
                        </div>
                        <button id='landing-page-get-started' onClick={() => setShowModal(true)}>Get Started</button>
                        <SignUpModal showModal={showModal} setShowModal={setShowModal} />
                    </div>
                    <div id='landing-page-img-div'>
                        <div id='landing-page-img' style={{backgroundImage: `url(${landingPageImg})`}}>
                        </div>
                    </div>
                </div>
                <div id='attribution-link'>
                    <a  href="https://www.freepik.com/vectors/people">People vector created by pikisuperstar - www.freepik.com</a>
                </div >
            </div>
        </div>
    );

}

export default LandingPage;
