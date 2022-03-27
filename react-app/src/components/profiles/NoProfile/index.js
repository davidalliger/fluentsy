import { useState } from 'react';
import CreateProfileForms from '../CreateProfile/CreateProfileForms';

const NoProfile = ({setShowModal}) => {
    const [showNoProfile, setShowNoProfile] = useState(true);
    const [showCreateProfile, setShowCreateProfile] = useState(false);

    const handleCreateProfile = () => {
        setShowNoProfile(false);
        setShowCreateProfile(true);
    }

    const handleIgnore = () => {
        setShowModal(false);
    }

    return (
        <div className='basic-form-wide'>
            {showNoProfile && (
                <div className='basic-form-inner'>
                    <div className='basic-form-topic'>
                        You haven't created a profile yet!
                    </div>
                    <div className='basic-form-content'>
                        Create a profile to start adding languages and exchanging messages with other users.
                    </div>
                    <div className='basic-form-button-div'>
                        <button
                            className='basic-form-button-small'
                            onClick={handleCreateProfile}
                        >
                            Create Profile
                        </button>
                    </div>
                    <div className='basic-form-button-div'>
                        <button
                            className='basic-form-button-small'
                            onClick={handleIgnore}
                        >
                            Skip for Now
                        </button>
                    </div>
                </div>
            )}
            {showCreateProfile && (
                <CreateProfileForms setShowModal={setShowModal} />
            )}

        </div>
    )
}

export default NoProfile;
