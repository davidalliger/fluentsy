import {useEffect, useState} from 'react';
import CreateProfileLocationForm from './CreateProfileLocationForm';
import CreateProfileAboutForm from './CreateProfileAboutForm';
import CreateProfilePictureForm from './CreateProfilePictureForm';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createProfile } from '../../../store/profiles';

const CreateProfileForms = ({setShowModal}) => {
    const [showLocationForm, setShowLocationForm] = useState(true);
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
                    const birthday = new Date(year, (month - 1), day);

                    const new_profile = {
                        user_id: user.id,
                        img_url: imgUrl,
                        country,
                        state,
                        timezone,
                        about: about ? about : 'Hi! I\'m a new user!',
                        birthday,
                        display_age: displayAge
                    }

                    const data = await dispatch(createProfile(new_profile));
                    if (data.errors) {
                        console.log("data.errors ", data.errors);
                        setErrors(data.errors);
                    } else if (data.userId) {
                        setShowModal(false);
                        console.log(data.userId);
                        history.push(`/users/${data.userId}`);
                    } else {
                        console.log("data ", data);
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
            {showLocationForm && (
                <CreateProfileLocationForm setShowLocationForm={setShowLocationForm} setShowAboutForm={setShowAboutForm} country={country} setCountry={setCountry} state={state} setState={setState} timezone={timezone} setTimezone={setTimezone} setShowModal={setShowModal}/>
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
