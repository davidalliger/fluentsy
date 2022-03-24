import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import{ createLanguage } from '../../../store/languages'
import { addProfileLanguages } from '../../../store/profiles';
import { languages, levels, levelsWithDescriptions } from '../../../utils';
import '../../../index.css'
const CreateProfileLanguagesForm = ({ user, setShowModal, nativeLanguage, setNativeLanguage, targetLanguage, setTargetLanguage, setShowLocationForm, setShowLanguageForm, setShowPictureForm, level, setLevel }) => {
    const [errors, setErrors] = useState([]);
    const [showLevel, setShowLevel] = useState(false);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (targetLanguage && nativeLanguage) {
    //         if (nativeLanguage === targetLanguage) {
    //             // setTargetLanguage('');
    //             setErrors(['Error: Native language and target language cannot be the same.'])
    //             if (showLevel) {
                    // setShowLevel(true);
    //             }
    //         } else {
    //             setShowLevel(true);
    //             setErrors([]);
    //         }
    //     } else {
    //         setErrors([]);
    //     }
    // }, [nativeLanguage])

    useEffect(() => {
        if (targetLanguage && nativeLanguage) {
            if (nativeLanguage === targetLanguage) {
                // setTargetLanguage('');
                // setErrors(['Error: Native language and target language cannot be the same.'])
                // if (showLevel) {
                    setShowLevel(true);
                // }
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
        // const native = {
        //     name: nativeLanguage,
        //     user_id: user.id,
        //     level: 'Native',
        //     native: true,
        //     primary: true
        // };
        // const target = {
        //     name: targetLanguage,
        //     user_id: user.id,
        //     level: level,
        //     native: false,
        //     primary: true
        // };
        // console.log(native);
        // console.log(target);
        const data = await dispatch(addProfileLanguages({
            native_language: nativeLanguage,
            learning_language: targetLanguage,
            proficiency_level: level}));
        if (data.errors) {
            setErrors(data.errors);
        } else if (data.success) {
            // const nativeData = await dispatch(createLanguage(native));
            // const targetData = await dispatch(createLanguage(target));
            // if (nativeData.errors) {
            //     if (targetData.errors) {
            //         setErrors([...nativeData.errors, ...targetData.errors]);
            //     } else {
            //         setErrors(nativeData.errors);
            //     }
            // } else if (targetData.errors) {
            //     setErrors(targetData.errors);
            // } else if (nativeData.name && targetData.name) {
                setShowLocationForm(true);
                setShowLanguageForm(false);
            // } else {
            //     setErrors(nativeData);
            // }
        } else setErrors(data);
    }

    // console.log('Errors is ', errors);

    return (
        <div className='basic-form-inner'>
            <form
                className='basic-form-inner'
                onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <h2>Hello, {user.username}!</h2>
                {/* <p>What is your native language?</p> */}
                <div className='basic-form-field'>
                    <div className='basic-form-label'>
                        <label htmlFor='native-language'>
                            What is your native language?
                        </label>
                    </div>
                    <div className='basic-form-input-container'>
                        <select
                            className='basic-form-input'
                            id='native-language'
                            name='nativeLanguage'
                            onChange={e => setNativeLanguage(e.target.value)}
                            value={nativeLanguage}
                        >
                            <option value='' disabled>Native</option>
                            {languages.map((language, index) => (
                                <option value={language} key={index}>{language}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='basic-form-field'>
                    <div className='basic-form-label'>
                        <label htmlFor='target-language'>
                            What language are you currently learning?
                        </label>
                    </div>
                    <div className='basic-form-input-container'>
                        <select
                            className='basic-form-input'
                            id='target-language'
                            name='targetLanguage'
                            onChange={e => setTargetLanguage(e.target.value)}
                            value={targetLanguage}
                            style={{width: '100%'}}
                        >
                            <option style={{width: '100%'}} value='' disabled>Target</option>
                            {languages.map((language, index) => (
                                <option style={{width: '100%'}} value={language} key={index}>{language}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {showLevel && (
                    <div className='basic-form-field'>
                        <fieldset>
                            <div className='basic-form-label'>
                                <legend>What is your current level of proficiency?</legend>
                            </div>
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
                <div className='basic-form-extra'>
                    You will be able to add more languages later.
                </div>
                <div className='basic-form-double-button-div'>
                    <button
                        type='button'
                        className='basic-form-button-smaller'
                        id='back'
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className='basic-form-button-smaller'
                        type='submit'
                        id='next'
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateProfileLanguagesForm;
