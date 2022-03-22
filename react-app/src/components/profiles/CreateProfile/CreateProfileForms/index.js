import {useEffect, useState} from 'react';
import CreateProfileLanguagesForm from '../../../languages/ProfileLanguagesForm';
import CreateProfileLocationForm from './CreateProfileLocationForm';
import CreateProfileAboutForm from './CreateProfileAboutForm';
import CreateProfilePictureForm from './CreateProfilePictureForm';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createProfile } from '../../../../store/profiles';

const CreateProfileForms = ({setShowModal}) => {
    const [showLanguageForm, setShowLanguageForm] = useState(true);
    const [showLocationForm, setShowLocationForm] = useState(false);
    const [showAboutForm, setShowAboutForm] = useState(false);
    const [showPictureForm, setShowPictureForm] = useState(false);
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [timezone, setTimezone] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [displayAge, setDisplayAge] = useState(false);
    const [about, setAbout] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [allStepsCompleted, setAllStepsCompleted] = useState(false);
    const [errors, setErrors] = useState([])
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        (async()=> {
                if (allStepsCompleted) {
                    const birthday = `${year}, ${month}, ${day}`;

                    const new_profile = {
                        user_id: user.id,
                        img_url: imgUrl,
                        country,
                        state,
                        timezone,
                        about: about ? about : 'Hi! I\'m a new user!',
                        birthday: birthday,
                        display_age: displayAge
                    }

                    const data = await dispatch(createProfile(new_profile));
                    if (data.errors) {
                        setErrors(data.errors);
                    } else if (data.userId) {
                        setShowModal(false);
                        history.push(`/users/${data.userId}`);
                    } else {
                        setErrors(data);
                    }

                }})()

    }, [allStepsCompleted])

    return (
        <div>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            {showLanguageForm && (
                <CreateProfileLanguagesForm user={user} setShowLocationForm={setShowLocationForm} setShowLanguageForm={setShowLanguageForm} setShowModal={setShowModal} />
            )}
            {showLocationForm && (
                <CreateProfileLocationForm setShowLanguageForm={setShowLanguageForm} setShowLocationForm={setShowLocationForm} setShowAboutForm={setShowAboutForm} country={country} setCountry={setCountry} state={state} setState={setState} timezone={timezone} setTimezone={setTimezone} />
            )}
            {showAboutForm && (
                <CreateProfileAboutForm setShowLocationForm={setShowLocationForm} setShowAboutForm={setShowAboutForm} setShowPictureForm={setShowPictureForm} month={month} setMonth={setMonth} day={day} setDay={setDay} year={year} setYear={setYear} displayAge={displayAge} setDisplayAge={setDisplayAge} about={about} setAbout={setAbout}/>
            )}
            {showPictureForm && (
                <CreateProfilePictureForm setShowAboutForm={setShowAboutForm} setShowPictureForm={setShowPictureForm} imgUrl={imgUrl} setImgUrl={setImgUrl} setAllStepsCompleted={setAllStepsCompleted} />
            )}
        </div>
    )
}

export default CreateProfileForms;
