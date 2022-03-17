import {useState} from 'react';
import CreateProfileLocationForm from './CreateProfileLocationForm';
import CreateProfileAboutForm from './CreateProfileAboutForm';
import CreateProfilePictureForm from './CreateProfilePictureForm';

const CreateProfileForms = ({setShowModal}) => {
    const [showLocationForm, setShowLocationForm] = useState(true);
    const [showAboutForm, setShowAboutForm] = useState(false);
    const [showPictureForm, setShowPictureForm] = useState(false);

    return (
        <div>
            {showLocationForm && (
                <CreateProfileLocationForm setShowLocationForm={setShowLocationForm} setShowAboutForm={setShowAboutForm} />
            )}
            {showAboutForm && (
                <CreateProfileAboutForm setShowAboutForm={setShowAboutForm} setShowPictureForm={setShowPictureForm} />
            )}
            {showPictureForm && (
                <CreateProfilePictureForm setShowPictureForm={setShowPictureForm} />
            )}
        </div>
    )
}

export default CreateProfileForms;
