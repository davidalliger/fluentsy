import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateProfilePicture } from "../../../../store/profiles";

const EditProfilePictureForm = ({userProfile, setShowEditPictureModal}) => {
    const {about, id, username, userId, country, state, timezone, birthday, displayAge} = userProfile;
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [image, setImage] = useState(userProfile.imgUrl);
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch();


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(id);
        console.log(image);
        const formData = new FormData();
        formData.append('id', +id);
        formData.append('username', username);
        formData.append('user_id', +userId);
        formData.append('image', image);
        formData.append('country', country);
        formData.append('state', state);
        formData.append('timezone', timezone);
        formData.append('birthday', birthday);
        formData.append('display_age', displayAge);
        formData.append('about', about);
        console.log(formData)

        setImageLoading(true);

        // const editProfile = {
        //     id: +id,
        //     username,
        //     user_id: +userId,
        //     image: imgUrl,
        //     country,
        //     state,
        //     timezone,
        //     birthday,
        //     display_age: displayAge,
        //     about
        // };

        const data = await dispatch(updateProfilePicture(formData, id));
        if (data.errors) {
            setImageLoading(false);
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

    const updateImage = e => {
        const file = e.target.files[0];
        setImage(file);
        console.log(image);
    }

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
                        Image
                    </label>
                </div>
                {imageLoading && <p>Loading...</p>}
                <div className='basic-form-input-container'>
                    <input
                        type='file'
                        id='img-url'
                        name='image'
                        className='basic-form-input'
                        accept='image/*'
                        onChange={updateImage}
                        // value={imgUrl}
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
