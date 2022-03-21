import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import{ createLanguage } from '../../../../store/languages'
import { languages, levels, levelsWithDescriptions } from '../../../../utils';

const EditLanguagesForm = ({ user, setShowModal, setShowLocationForm, setShowLanguageForm, setShowPictureForm }) => {
    const [errors, setErrors] = useState([]);
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [level, setLevel] = useState('');
    const [showLevel, setShowLevel] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (targetLanguage && nativeLanguage) {
            if (nativeLanguage === targetLanguage) {
                // setTargetLanguage('');
                setErrors(['Error: Native language and target language cannot be the same.'])
                if (showLevel) {
                    setShowLevel(false);
                }
            } else {
                setShowLevel(true);
                setErrors([]);
            }
        } else {
            setErrors([]);
        }
    }, [nativeLanguage])

    useEffect(() => {
        if (targetLanguage && nativeLanguage) {
            if (nativeLanguage === targetLanguage) {
                // setTargetLanguage('');
                setErrors(['Error: Native language and target language cannot be the same.'])
                if (showLevel) {
                    setShowLevel(false);
                }
            } else {
                setShowLevel(true);
                setErrors([]);
            }
        } else if (targetLanguage) {
            setShowLevel(true);
            setErrors([]);
        } else {
            setErrors([]);
        }
    }, [targetLanguage])

    const handleSubmit = async(e) => {
        e.preventDefault();
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
        console.log(native);
        console.log(target);
        const nativeData = await dispatch(createLanguage(native));
        const targetData = await dispatch(createLanguage(target));
        if (nativeData.errors) {
            if (targetData.errors) {
                setErrors([...nativeData.errors, ...targetData.errors]);
            } else {
                setErrors(nativeData.errors);
            }
        } else if (targetData.errors) {
            setErrors(targetData.errors);
        } else if (nativeData.name && targetData.name) {
            setShowLocationForm(true);
            setShowLanguageForm(false);
        } else {
            setErrors(nativeData);
        }
    }

    console.log('Errors is ', errors);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <h2>Hello, {user.username}!</h2>
                {/* <p>What is your native language?</p> */}
                <div className='form-field'>
                    <label htmlFor='native-language'>
                        What is your native language?
                        <select
                            id='native-language'
                            name='nativeLanguage'
                            className='form-select'
                            onChange={e => setNativeLanguage(e.target.value)}
                            value={nativeLanguage}
                        >
                            <option value='' disabled>Please select your native language...</option>
                            {languages.map((language, index) => (
                                <option value={language} key={index}>{language}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className='form-field'>
                    <label htmlFor='target-language'>
                        What language are you currently learning?
                        <select
                            id='target-language'
                            name='targetLanguage'
                            className='form-select'
                            onChange={e => setTargetLanguage(e.target.value)}
                            value={targetLanguage}
                        >
                            <option value='' disabled>Language</option>
                            {languages.map((language, index) => (
                                <option value={language} key={index}>{language}</option>
                            ))}
                        </select>
                    </label>
                </div>
                {showLevel && (
                    <div className='form-field'>
                        <fieldset>
                            <legend>What is your current level of proficiency?</legend>
                                {levels.map((currentLevel, index) => (
                                    <div key={index}>
                                        <label htmlFor={currentLevel}>
                                            <input
                                                type="radio"
                                                id={currentLevel}
                                                name="level"
                                                checked={level === currentLevel}
                                                onChange={(e) => setLevel(currentLevel)}
                                            />
                                            {currentLevel}
                                            <div>
                                                {levelsWithDescriptions[currentLevel]}
                                            </div>
                                        </label>
                                    </div>
                                ))}
                        </fieldset>
                    </div>
                )}
                <div>
                    You will be able to add more languages later.
                </div>
                <button
                    type='button'
                    className='form-button'
                    id='back'
                    onClick={() => setShowModal(false)}
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    id='next'
                    className='form-button'
                >
                    Next
                </button>
            </form>
        </div>
    )
}

export default EditLanguagesForm;
