import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addProfileAbout } from "../../../../store/profiles";

const CreateProfileAboutForm = ({month, setMonth, day, setDay, year, setYear, displayAge, setDisplayAge, about, setAbout, setShowLocationForm, setShowAboutForm, setShowPictureForm}) => {
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
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
            document.querySelector('.basic-form-wide').scrollTop = 0;
        } else if (data.success) {
            setShowPictureForm(true);
            setShowAboutForm(false);
        } else {
            setErrors(data);
            document.querySelector('.basic-form-wide').scrollTop = 0;
        }
    }

    const handleBack = () => {
            setShowAboutForm(false);
            setShowLocationForm(true);
    }

    useEffect(() => {
        if (errors?.length) {
            setShowErrors(true);
        }
    }, [errors]);

    // const handleSkip = () => {
    //         setShowAboutForm(false);
    //         setShowPictureForm(true);
    //         if (!about) {
    //             setAbout('Hi! I\'m a new user!')
    //         }
    // }

    return (
        <div className='basic-form-inner'>
            <form onSubmit={handleSubmit} className='basic-form-inner'>
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
                <h2>About</h2>
                {/* <div className='basic-form-label-question'>
                    Tell us a bit more about yourself...
                </div> */}
                <div className='basic-form-label-question'>
                    What is your birthday?
                </div>
                <div className='basic-form-field-multi'>
                    <span className='basic-form-inline'>
                        {/* <span className='basic-form-label'> */}
                            <label htmlFor='month'>
                                Month
                            </label>
                        {/* </span> */}
                        <input
                            type='number'
                            id='month'
                            name='month'
                            className='basic-form-input-small'
                            onChange={e => setMonth(e.target.value)}
                            value={month}
                        />
                    </span>
                    <span className='basic-form-inline'>
                        {/* <span className='basic-form-label'> */}
                            <label htmlFor='day'>
                                Day
                            </label>
                        {/* </span> */}
                        <input
                            type='number'
                            id='day'
                            name='day'
                            className='basic-form-input-small'
                            onChange={e => setDay(e.target.value)}
                            value={day}
                        />
                    </span>
                    <span className='basic-form-inline'>
                        <label htmlFor='year'>
                            Year
                        </label>
                        <input
                            type='number'
                            id='year'
                            name='year'
                            className='basic-form-input-small'
                            onChange={e => setYear(e.target.value)}
                            value={year}
                        />
                    </span>
                </div>
                <div className='basic-form-field'>
                    <label htmlFor='displayAge'>
                        <input
                        type='checkbox'
                            id='displayAge'
                            name='displayAge'
                            className='form-input'
                            onChange={e => setDisplayAge(!displayAge)}
                            value={displayAge}
                            checked={displayAge}
                        />
                        Display age in profile
                    </label>
                </div>
                <div className='basic-form-field'>
                    <div className='basic-form-label-question'>
                        <label htmlFor='about'>
                            Tell us a bit more about yourself...
                        </label>
                    </div>
                        <textarea
                            id='about'
                            placeholder='Add a brief description of yourself including favorite pastimes, hobbies, and interests...'
                            name='about'
                            className='basic-form-text-area'
                            onChange={e => setAbout(e.target.value)}
                            value={about}
                        />
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
                {/* <button
                    onClick={handleSkip}
                    type='button'
                    id='skip'
                    className='form-button'
                >
                    Skip this step
                </button> */}
            </form>
        </div>
    )
}

export default CreateProfileAboutForm;
