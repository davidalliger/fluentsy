import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import{ createLanguage } from '../../../../../store/languages'
import { languages } from '../../../../../utils';

const AddNativeLanguageForm = ({ user, setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [nativeLanguage, setNativeLanguage] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const new_language = {
            name: nativeLanguage,
            user_id: user.id,
            level: 'Native',
            native: true,
            primary: false
        };
        const data = await dispatch(createLanguage(new_language));
        if (data.errors) {
            setErrors(data.errors);
            document.querySelector('.basic-form').scrollTop = 0;
        } else if (data.name) {
            setShowModal(false);
        } else {
            setErrors(data);
            document.querySelector('.basic-form').scrollTop = 0;
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
            className='basic-form'
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
            <h2>Add Native Language</h2>
            <div className='basic-form-field'>
                <div className='basic-form-label-question'>
                    <label htmlFor='native-language'>
                        Add a native language
                    </label>
                </div>
                <div className='basic-form-input-container'>
                    <select
                        id='native-language'
                        name='nativeLanguage'
                        className='basic-form-input-select'
                        onChange={e => setNativeLanguage(e.target.value)}
                        value={nativeLanguage}
                    >
                        <option value='' disabled>Language</option>
                        {languages.map((language, index) => (
                            <option value={language} key={index}>{language}</option>
                        ))}
                    </select>
                </div>
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

export default AddNativeLanguageForm;
