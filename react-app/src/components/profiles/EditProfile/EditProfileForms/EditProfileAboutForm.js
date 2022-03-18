import { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../../store/profiles";
import { convertBirthday } from '../../../../utils';

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
        console.log(data);
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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <h2>Edit About</h2>
                <div className='form-field'>
                    <label htmlFor='about'>
                        Tell us a bit about yourself...
                        <textarea
                            id='about'
                            placeholder='Add a brief description of yourself including favorite pastimes, hobbies, and interests...'
                            name='about'
                            className='form-input'
                            onChange={e => setAboutInfo(e.target.value)}
                            value={aboutInfo}
                        />
                    </label>
                </div>
                <button
                    type='button'
                    className='form-button'
                    id='cancel'
                    onClick={() => setShowEditAboutModal(false)}
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    id='Submit'
                    className='form-button'
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default EditProfileAboutForm;
