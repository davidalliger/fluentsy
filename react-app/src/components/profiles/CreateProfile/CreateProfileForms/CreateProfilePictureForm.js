import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addProfilePicture } from "../../../../store/profiles";

const CreateProfilePictureForm = ({setShowAboutForm, setShowPictureForm, imgUrl, setImgUrl, setAllStepsCompleted}) => {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const picture = {
            img_url: imgUrl
        };
        const data = await dispatch(addProfilePicture(picture));
        if (data.errors) {
            setErrors(data.errors);
        } else if (data.success) {
            setAllStepsCompleted(true);
        } else {
            setErrors(data);
        }
    }

    const handleBack = () => {
            setShowPictureForm(false);
            setShowAboutForm(true);
    }

    const handleSkip = () => {
            setAllStepsCompleted(true);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <h2>Picture</h2>
                <p>Set your profile picture</p>
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
                    id='back'
                    onClick={handleBack}
                >
                    Back
                </button>
                <button
                    type='submit'
                    id='next'
                    className='form-button'
                >
                    Next
                </button>
                <button
                    onClick={handleSkip}
                    type='button'
                    id='skip'
                    className='form-button'
                >
                    Skip this step
                </button>
            </form>
        </div>
    )
}

export default CreateProfilePictureForm;
