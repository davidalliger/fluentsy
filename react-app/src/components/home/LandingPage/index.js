import { useState } from "react";
import { useSelector } from "react-redux";
import SignUpModal from "../../auth/signup/SignUpModal";
import ProfilesFeed from "../../profiles/ProfilesFeed";
import './LandingPage.css'
import myImage from '../../../images/landing-page_small.jpeg'

const LandingPage = () => {
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const user = useSelector(state => state.session.user);


    if (user) {
        return <ProfilesFeed />
    }

    return (
        <div id='landing-page'>
                <div id='landing-page-card'>
                    <div id='landing-page-intro-text-div'>
                        <h1>Meet language learners around the world!</h1>
                        <div id='landing-page-list'>
                            <div id='landing-page-list-1'>
                                <div className='home-earth-icon'>
                                    <i class="fa-solid fa-earth-americas"></i>
                                </div>
                                Practice your conversation skills with native speakers
                            </div>
                            <div id='landing-page-list-2'>
                                <div className='home-earth-icon'>
                                    <i class="fa-solid fa-earth-americas"></i>
                                </div>
                                Connect instantly with other users via live chat
                            </div>
                            <div id='landing-page-list-3'>
                                <div className='home-earth-icon'>
                                    <i class="fa-solid fa-earth-americas"></i>
                                </div>
                                Have fun while broadening your cultural horizons
                            </div>
                        </div>
                        <button id='landing-page-get-started' onClick={() => setShowSignUpModal(true)}>Get Started</button>
                        <SignUpModal showSignUpModal={showSignUpModal} setShowSignUpModal={setShowSignUpModal} />
                    </div>
                    <div id='landing-page-img-div'>
                        <div id='landing-page-img' style={{backgroundImage: `url(https://fluentsy-s3.s3.us-east-2.amazonaws.com/landing-page_small.png)`}}>
                        </div>
                    </div>
                </div>
                <div id='attribution-link'>
                    <a  href="https://www.freepik.com/vectors/people">People vector created by pikisuperstar - www.freepik.com</a>
                </div >
        </div>
    );

}

export default LandingPage;
