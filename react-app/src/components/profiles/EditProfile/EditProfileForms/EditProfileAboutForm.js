import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../../store/profiles";

const EditProfileAboutForm = ({userProfile, setShowEditAboutModal}) => {
    const {about, id, username, userId, imgUrl, country, state, timezone, birthday, displayAge} = userProfile;
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [aboutInfo, setAboutInfo] = useState(about);
    const dispatch = useDispatch();


    const handleSubmit = async(e) => {
        e.preventDefault();
        const editProfile = {
            id: +id,
            username,
            user_id: +userId,
            image: imgUrl,
            country,
            state,
            timezone,
            birthday,
            display_age: displayAge,
            about: aboutInfo
        };
        const data = await dispatch(updateProfile(editProfile));
        if (data.errors) {
            setErrors(data.errors);
            document.querySelector('.basic-form-wide').scrollTop = 0;
        } else if (data.id) {
            setShowEditAboutModal(false);
            return;
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
            <h2>Edit About</h2>
            <div className='basic-form-field'>
                <div className='basic-form-label-question'>
                    <label htmlFor='about'>
                        Tell us a bit about yourself...
                    </label>
                </div>
                <textarea
                    id='about'
                    placeholder='Add a brief description of yourself including favorite pastimes, hobbies, and interests...'
                    name='about'
                    className='basic-form-text-area'
                    onChange={e => setAboutInfo(e.target.value)}
                    value={aboutInfo}
                />
            </div>
            <div className='basic-form-double-button-div'>
                <button
                    type='button'
                    className='basic-form-button-smaller'
                    id='cancel'
                    onClick={() => setShowEditAboutModal(false)}
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    id='Submit'
                    className='basic-form-button-smaller'
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default EditProfileAboutForm;
