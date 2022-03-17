import { useState } from 'react';
import CreateProfileForms from '../CreateProfileForms';

const NoProfile = ({setShowModal}) => {
    const [showNoProfile, setShowNoProfile] = useState(true);
    const [showCreateProfile, setShowCreateProfile] = useState(false);

    const handleCreateProfile = () => {
        setShowNoProfile(false);
        setShowCreateProfile(true);
    }

    return (
        <div>
            {showNoProfile && (
                <div>
                    <p>You haven't created a profile yet!</p>
                    <p>Create a profile to start using features like messages.</p>
                    <button onClick={handleCreateProfile}>
                        Create Profile
                    </button>
                    <button onClick={()=> setShowModal(false)}>Skip for Now</button>
                </div>
            )}
            {showCreateProfile && (
                <CreateProfileForms setShowModal={setShowModal} />
            )}

        </div>
    )
}

export default NoProfile;
