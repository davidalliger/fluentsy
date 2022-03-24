import { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../../store/profiles";

const EditProfileAboutForm = ({userProfile, setShowEditAboutModal}) => {
    const {about, id, username, userId, imgUrl, country, state, timezone, birthday, displayAge} = userProfile;
    const [errors, setErrors] = useState([]);
    const [aboutInfo, setAboutInfo] = useState(about);
    const dispatch = useDispatch();


    const handleSubmit = async(e) => {
        e.preventDefault();
        const editProfile = {
            id: +id,
            username,
            user_id: +userId,
            img_url: imgUrl,
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
        } else if (data.id) {
            setShowEditAboutModal(false);
            return;
        } else {
            setErrors(data);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='basic-form-wide'
        >
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
            <div>
                {errors && errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
        </form>
    )
}

export default EditProfileAboutForm;
