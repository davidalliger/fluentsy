import { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../../store/profiles";

const EditProfilePictureForm = ({userProfile, setShowEditPictureModal}) => {
    const {about, id, username, userId, country, state, timezone, birthday, displayAge} = userProfile;
    const [errors, setErrors] = useState([]);
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
        console.log(data);
        if (data.errors) {
            setErrors(data.errors);
        } else if (data.id) {
            setShowEditPictureModal(false);
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
                <h2>Update Image</h2>
                <div className='form-field'>
                    <label htmlFor='img-url'>
                        Url:
                        <input
                            type='text'
                            id='img-url'
                            name='imgUrl'
                            className='form-input'
                            onChange={e => setImgUrl(e.target.value)}
                            value={imgUrl}
                        />
                    </label>
                </div>
                <button
                    type='button'
                    className='form-button'
                    id='cancel'
                    onClick={() => setShowEditPictureModal(false)}
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

export default EditProfilePictureForm;
