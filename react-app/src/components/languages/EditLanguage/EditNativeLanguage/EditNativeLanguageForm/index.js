import { useState } from 'react';
import { useDispatch } from "react-redux";
import{ updateLanguage } from '../../../../../store/languages'
import { languages } from '../../../../../utils';

const EditNativeLanguageForm = ({ editNativeLanguage, setShowModal, user }) => {
    const [errors, setErrors] = useState([]);
    const [nativeLanguage, setNativeLanguage] = useState(editNativeLanguage.name);
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {
            id: editNativeLanguage.id,
            name: nativeLanguage,
            user_id: user.id,
            level: 'Native',
            native: true,
            primary: editNativeLanguage.primary
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
                <h2>Edit Native Language</h2>
                {/* <p>What is your native language?</p> */}
                <div className='form-field'>
                    <label htmlFor='native-language'>
                        Edit a native language
                        <select
                            id='native-language'
                            name='nativeLanguage'
                            className='form-select'
                            onChange={e => setNativeLanguage(e.target.value)}
                            value={nativeLanguage}
                        >
                            <option value='' disabled>Language</option>
                            {languages.map((language, index) => (
                                <option value={language} key={index}>{language}</option>
                            ))}
                        </select>
                    </label>
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

export default EditNativeLanguageForm;
