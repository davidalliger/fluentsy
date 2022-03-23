import { useState } from 'react';
import { useDispatch } from "react-redux";
import{ updateLanguage } from '../../../../../store/languages'
import { languages, levelsWithDescriptions, levels } from '../../../../../utils';

const EditTargetLanguageForm = ({ user, setShowModal, editTargetLanguage }) => {
    const [errors, setErrors] = useState([]);
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
        } else if (data.name) {
            setShowModal(false);
        } else {
            setErrors(data);
        }
    }

    // console.log('Errors is ', errors);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <h2>Edit Target Language</h2>
                {/* <p>What is your native language?</p> */}
                <div className='form-field'>
                    <label htmlFor='native-language'>
                        Edit a target language
                        <select
                            id='native-language'
                            name='nativeLanguage'
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
                <div className='form-field'>
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
                    Submit
                </button>
            </form>
        </div>
    )
}

export default EditTargetLanguageForm;
