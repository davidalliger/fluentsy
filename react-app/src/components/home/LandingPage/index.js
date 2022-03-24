import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SignUpModal from "../../auth/signup/SignUpModal";
import ProfilesFeed from "../../profiles/ProfilesFeed";
import './LandingPage.css'
import myImage from '../../../images/landing-page_small_good.jpg'

const LandingPage = () => {
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const user = useSelector(state => state.session.user);


    if (user) {
        return <ProfilesFeed />
    }

    // const landingPageImg = '../../../../public/images/landing-page_small_good.png';

    return (
        <div id='landing-page'>
            <div>
                <div id='landing-page-card'>
                    <div id='landing-page-intro-text-div'>
                        <h1>Meet language learners around the world!</h1>
                        <div id='landing-page-list'>
                            <p id='landing-page-list-1'>
                                Practice your conversation skills with native speakers
                            </p>
                            <p id='landing-page-list-2'>
                                Connect instantly with other users via live chat
                            </p>
                            <p id='landing-page-list-3'>
                                Have fun while broadening your cultural horizons
                            </p>
                        </div>
                        <button id='landing-page-get-started' onClick={() => setShowSignUpModal(true)}>Get Started</button>
                        <SignUpModal showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal} />
                    </div>
                    <div id='landing-page-img-div'>
                        <div id='landing-page-img' style={{backgroundImage: `url(${myImage})`}}>
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
