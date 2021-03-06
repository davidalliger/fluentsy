import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import{ updateLanguage } from '../../../../../store/languages'
import { languages, levelsWithDescriptions, levels } from '../../../../../utils';

const EditTargetLanguageForm = ({ user, setShowModal, editTargetLanguage }) => {
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [targetLanguage, setTargetLanguage] = useState(editTargetLanguage.name);
    const [level, setLevel] = useState(editTargetLanguage.level);
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {
            id: editTargetLanguage.id,
            name: targetLanguage,
            user_id: user.id,
            level: level,
            native: false,
            primary: editTargetLanguage.primary
        };
        const data = await dispatch(updateLanguage(payload));
        if (data.errors) {
            setErrors(data.errors);
            document.querySelector('.basic-form-wide').scrollTop = 0;
        } else if (data.name) {
            setShowModal(false);
        } else {
            setErrors(data);
            document.querySelector('.basic-form-wide').scrollTop = 0;
        }
    }

    useEffect(() => {
        if (errors?.length) {
            setShowErrors(true);
        }
    }, [errors]);

    return (
        <form
            onSubmit={handleSubmit}
            className='basic-form-wide'
        >
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
            <h2>Edit Target Language</h2>
            <div className='basic-form-field'>
                <div className='basic-form-label-question'>
                    <label htmlFor='native-language'>
                        Edit a target language
                    </label>
                </div>
                <div className='basic-form-input-container'>
                    <select
                        id='native-language'
                        name='nativeLanguage'
                        className='basic-form-input-select-wide'
                        onChange={e => setTargetLanguage(e.target.value)}
                        value={targetLanguage}
                    >
                        <option value='' disabled>Language</option>
                        {languages.map((language, index) => (
                            <option value={language} key={index}>{language}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='basic-form-field'>
                <fieldset>
                    <legend>Level</legend>
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
                    type='submit'
                    id='next'
                    className='basic-form-button-smaller'
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default EditTargetLanguageForm;
