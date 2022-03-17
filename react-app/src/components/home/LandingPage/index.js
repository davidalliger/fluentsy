import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SignUpModal from "../../auth/signup/SignUpModal";
import ProfilesFeed from "../../profiles/ProfilesFeed";

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.session.user);

    if (user) {
        return (
            <ProfilesFeed />
        )
    }

    return (
        <div>
            <h1>Landing Page</h1>
            <button onClick={() => setShowModal(true)}>Get Started</button>
            <SignUpModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );

}

export default LandingPage;
