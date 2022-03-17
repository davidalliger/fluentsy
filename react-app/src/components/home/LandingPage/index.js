import { useState } from "react";
import SignUpModal from "../../auth/signup/SignUpModal";

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <h1>Landing Page</h1>
            <button onClick={() => setShowModal(true)}>Get Started</button>
            <SignUpModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export default LandingPage;
