import {useEffect, useState} from 'react';
import CreateProfileLanguagesForm from '../../../languages/ProfileLanguagesForm';
import CreateProfileLocationForm from './CreateProfileLocationForm';
import CreateProfileAboutForm from './CreateProfileAboutForm';
import CreateProfilePictureForm from './CreateProfilePictureForm';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkProfileExists, createProfile } from '../../../../store/profiles';
import { createLanguage } from '../../../../store/languages';

const CreateProfileForms = ({setShowModal}) => {
    const [showLanguageForm, setShowLanguageForm] = useState(true);
    const [showLocationForm, setShowLocationForm] = useState(false);
    const [showAboutForm, setShowAboutForm] = useState(false);
    const [showPictureForm, setShowPictureForm] = useState(false);
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [level, setLevel] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [timezone, setTimezone] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [displayAge, setDisplayAge] = useState(false);
    const [about, setAbout] = useState('');
    const [image, setImage] = useState();
    const [allStepsCompleted, setAllStepsCompleted] = useState(false);
    const [noProfile, setNoProfile] = useState(false);
    const [languagesAdded, setLanguagesAdded] = useState(false);
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        (async()=> {
            if (noProfile) {
                const native = {
                    name: nativeLanguage,
                    user_id: user.id,
                    level: 'Native',
                    native: true,
                    primary: true
                };
                const target = {
                    name: targetLanguage,
                    user_id: user.id,
                    level: level,
                    native: false,
                    primary: true
                };

                const nativeData = await dispatch(createLanguage(native));
                const targetData = await dispatch(createLanguage(target));
                if (nativeData.errors) {
                    if (targetData.errors) {
                        setErrors([...nativeData.errors, ...targetData.errors]);
                        document.querySelector('.basic-form-wide').scrollTop = 0;
                    } else {
                        setErrors(nativeData.errors);
                        document.querySelector('.basic-form-wide').scrollTop = 0;
                    }
                } else if (targetData.errors) {
                    setErrors(targetData.errors);
                    document.querySelector('.basic-form-wide').scrollTop = 0;
                } else if (nativeData.name && targetData.name) {
                    setLanguagesAdded(true);
                } else {
                    setErrors(nativeData);
                    document.querySelector('.basic-form-wide').scrollTop = 0;
                }
            }
        })()

    }, [noProfile, dispatch, level, nativeLanguage, targetLanguage, user.id]);

    useEffect(() => {
        (async() => {
            if (allStepsCompleted) {
                const data = await dispatch(checkProfileExists(user.id));
                if (data.none) {
                    setNoProfile(true);
                } else if (data.exists) {
                    setErrors(['This user has already created a profile.'])
                } else if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setErrors(data);
                }
            }
        })()
    }, [allStepsCompleted, dispatch, user.id])

    useEffect(()=> {
        if (languagesAdded) {
            (async() => {
                const birthday = `${year}/${month}/${day}`;
                const formData = new FormData();
                formData.append('user_id', user.id);
                formData.append('image', image);
                formData.append('country', country);
                formData.append('state', state);
                formData.append('timezone', timezone);
                formData.append('about', about);
                formData.append('birthday', birthday);
                formData.append('display_age', displayAge);
                const data = await dispatch(createProfile(formData));
                if (data.errors) {
                    setErrors(data.errors);
                    document.querySelector('.basic-form-wide').scrollTop = 0;
                } else if (data.userId) {
                    setShowModal(false);
                    history.push(`/users/${data.userId}`);
                } else {
                    setErrors(data);
                    document.querySelector('.basic-form-wide').scrollTop = 0;
                }
            })()
        }
    }, [languagesAdded]);

    useEffect(() => {
        if (errors?.length) {
            setShowErrors(true);
        }
    }, [errors]);

    return (
        <div className='basic-form-inner'>
            {showErrors && (
                <div className='basic-form-errors'>
                    <ul className='basic-form-errors-ul'>
                        {errors.map((error, ind) => (
                        <li key={ind} className='basic-form-errors-li'>
                            {error}
                        </li>
                        ))}
                    </ul>
                </div>
            )}
            {showLanguageForm && (
                <CreateProfileLanguagesForm user={user} setShowLocationForm={setShowLocationForm} setShowLanguageForm={setShowLanguageForm} setShowModal={setShowModal} nativeLanguage={nativeLanguage} setNativeLanguage={setNativeLanguage} targetLanguage={targetLanguage} setTargetLanguage={setTargetLanguage} level={level} setLevel={setLevel} />
            )}
            {showLocationForm && (
                <CreateProfileLocationForm setShowLanguageForm={setShowLanguageForm} setShowLocationForm={setShowLocationForm} setShowAboutForm={setShowAboutForm} country={country} setCountry={setCountry} state={state} setState={setState} timezone={timezone} setTimezone={setTimezone} />
            )}
            {showAboutForm && (
                <CreateProfileAboutForm setShowLocationForm={setShowLocationForm} setShowAboutForm={setShowAboutForm} setShowPictureForm={setShowPictureForm} month={month} setMonth={setMonth} day={day} setDay={setDay} year={year} setYear={setYear} displayAge={displayAge} setDisplayAge={setDisplayAge} about={about} setAbout={setAbout}/>
            )}
            {showPictureForm && (
                <CreateProfilePictureForm setShowAboutForm={setShowAboutForm} setShowPictureForm={setShowPictureForm} image={image} setImage={setImage} setAllStepsCompleted={setAllStepsCompleted} />
            )}
        </div>
    )
}

export default CreateProfileForms;
