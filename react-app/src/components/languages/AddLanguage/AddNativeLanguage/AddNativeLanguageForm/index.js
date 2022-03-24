import { useState } from 'react';
import { useDispatch } from "react-redux";
import{ createLanguage } from '../../../../../store/languages'
import { languages } from '../../../../../utils';

const AddNativeLanguageForm = ({ user, setShowModal }) => {
    const [errors, setErrors] = useState([]);
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
        } else if (data.name) {
            setShowModal(false);
        } else {
            setErrors(data);
        }
    }

    // console.log('Errors is ', errors);

    return (
        <form
            onSubmit={handleSubmit}
            className='basic-form'
        >
            <h2>Add Native Language</h2>
            {/* <p>What is your native language?</p> */}
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
                        className='basic-form-input'
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
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
        </form>
    )
}

export default AddNativeLanguageForm;
