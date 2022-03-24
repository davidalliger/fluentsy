import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addProfileAbout } from "../../../../store/profiles";

const CreateProfileAboutForm = ({month, setMonth, day, setDay, year, setYear, displayAge, setDisplayAge, about, setAbout, setShowLocationForm, setShowAboutForm, setShowPictureForm}) => {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const aboutInfo = {
            month,
            day,
            year,
            display_age: displayAge,
            about
        };
        const data = await dispatch(addProfileAbout(aboutInfo));
        if (data.errors) {
            setErrors(data.errors);
        } else if (data.success) {
            setShowPictureForm(true);
            setShowAboutForm(false);
        } else {
            setErrors(data);
        }
    }

    const handleBack = () => {
            setShowAboutForm(false);
            setShowLocationForm(true);
    }

    const handleSkip = () => {
            setShowAboutForm(false);
            setShowPictureForm(true);
            if (!about) {
                setAbout('Hi! I\'m a new user!')
            }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <h2>About</h2>
                <p>Tell us a bit more about yourself...</p>
                <div className='form-field'>
                    Birthday:
                    <label htmlFor='month'>
                        Month
                        <input
                            type='number'
                            id='month'
                            name='month'
                            className='form-input'
                            onChange={e => setMonth(e.target.value)}
                            value={month}
                        />
                    </label>
                    <label htmlFor='day'>
                        Day
                        <input
                            type='number'
                            id='day'
                            name='day'
                            className='form-input'
                            onChange={e => setDay(e.target.value)}
                            value={day}
                        />
                    </label>
                    <label htmlFor='year'>
                        Year
                        <input
                            type='number'
                            id='year'
                            name='year'
                            className='form-input'
                            onChange={e => setYear(e.target.value)}
                            value={year}
                        />
                    </label>
                </div>
                <div className='form-field'>
                    <label htmlFor='displayAge'>
                        <input
                        type='checkbox'
                            id='displayAge'
                            name='displayAge'
                            className='form-input'
                            onChange={e => setDisplayAge(!displayAge)}
                            value={displayAge}
                        />
                        Display age in profile
                    </label>
                </div>
                <div className='form-field'>
                    <label htmlFor='about'>
                        How would you describe yourself?
                        <textarea
                            id='about'
                            placeholder='Add a brief description of yourself including favorite pastimes, hobbies, and interests...'
                            name='about'
                            className='form-input'
                            onChange={e => setAbout(e.target.value)}
                            value={about}
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

export default CreateProfileAboutForm;
