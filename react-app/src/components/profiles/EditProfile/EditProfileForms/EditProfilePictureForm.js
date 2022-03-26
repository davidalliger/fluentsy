import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../../store/profiles";

const EditProfilePictureForm = ({userProfile, setShowEditPictureModal}) => {
    const {about, id, username, userId, country, state, timezone, birthday, displayAge} = userProfile;
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [imgUrl, setImgUrl] = useState(userProfile.imgUrl);
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
            about
        };
        const data = await dispatch(updateProfile(editProfile));
        if (data.errors) {
            setErrors(data.errors);
            document.querySelector('.basic-form-wide').scrollTop = 0;
        } else if (data.id) {
            setShowEditPictureModal(false);
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
            <h2>Update Picture</h2>
            <div className='basic-form-field'>
                <div className='basic-form-label-question'>
                    <label htmlFor='img-url'>
                        Image URL
                    </label>
                </div>
                <div className='basic-form-input-container'>
                    <input
                        type='text'
                        id='img-url'
                        name='imgUrl'
                        className='basic-form-input'
                        onChange={e => setImgUrl(e.target.value)}
                        value={imgUrl}
                    />
                </div>
            </div>
            <div className='basic-form-double-button-div'>
                <button
                    type='button'
                    className='basic-form-button-smaller'
                    id='cancel'
                    onClick={() => setShowEditPictureModal(false)}
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

export default EditProfilePictureForm;
