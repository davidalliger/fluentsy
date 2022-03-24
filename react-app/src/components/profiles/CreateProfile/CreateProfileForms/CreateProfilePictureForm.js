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
        <div className='basic-form-inner'>
            <form
                onSubmit={handleSubmit}
                className='basic-form-inner'
            >
                <h2>Picture</h2>
                <div className='basic-form-label-question'>
                    Select your profile picture
                </div>
                <div className='basic-form-field'>
                    <div className='basic-form-label'>
                        <label htmlFor='img-url'>
                            Image Url
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
                        id='back'
                        onClick={handleBack}
                    >
                        Back
                    </button>
                    <button
                        type='submit'
                        id='next'
                        className='basic-form-button-smaller'
                    >
                        Next
                    </button>
                </div>
                <div
                    onClick={handleSkip}
                    type='div'
                    id='skip'
                    className='basic-form-extra-link'
                >
                    Skip this step
                </div>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
            </form>
        </div>
    )
}

export default CreateProfilePictureForm;
