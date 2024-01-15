import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addProfilePicture } from "../../../../store/profiles";

const CreateProfilePictureForm = ({setShowAboutForm, setShowPictureForm, image, setImage, setAllStepsCompleted}) => {
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        setImageLoading(true);
        console.log(formData)



        // const picture = {
        //     img_url: imgUrl
        // };
        const data = await dispatch(addProfilePicture(formData));
        if (data.errors) {
            setImageLoading(false);
            setErrors(data.errors);
            document.querySelector('.basic-form-wide').scrollTop = 0;
        } else if (data.success) {
            setAllStepsCompleted(true);
        } else {
            setImageLoading(false);
            setErrors(data);
            document.querySelector('.basic-form-wide').scrollTop = 0;
        }
    }

    const handleBack = () => {
            setShowPictureForm(false);
            setShowAboutForm(true);
    }

    const handleSkip = () => {
        setImage('');
        setAllStepsCompleted(true);
    }

    useEffect(() => {
        if (errors?.length) {
            setShowErrors(true);
        }
    }, [errors]);

    const updateImage = e => {
        const file = e.target.files[0];
        setImage(file);
        const fileDisplay = file.name.length < 15 ? file.name : file.name.slice(0,15) + '...';
        setFileName(fileDisplay);
        console.log(file);
        console.log(image);
    }

    return (
        <div className='basic-form-inner'>
            <form
                onSubmit={handleSubmit}
                className='basic-form-inner'
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
                <h2>Picture</h2>
                <div className='basic-form-label-question'>
                    Select your profile picture
                </div>
                <div className='basic-form-file-field'>
                    <div className='basic-form-label'>
                        <label htmlFor='img-url'>
                            Image
                        </label>
                    </div>
                    <div className='basic-form-upload-field'>
                        <input className='basic-form-upload-filename'
                            placeholder='No File Selected'
                            value={fileName}
                            disabled='disabled'
                        />
                        {imageLoading && <p>Loading...</p>}
                        <div className='basic-form-file-upload-button'>
                            <span>Upload</span>
                            <input
                                type='file'
                                id='img-url'
                                name='imgUrl'
                                className='basic-form-file-input'
                                accept='image/*'
                                onChange={updateImage}
                                // value={imgUrl}
                            />
                        </div>
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
            </form>
        </div>
    )
}

export default CreateProfilePictureForm;
