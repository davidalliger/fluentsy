import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../../store/profiles";
import { states, countries, timezones, statesDefaultTimezones, countriesDefaultTimezones } from '../../../../utils';
import { findYear, findMonth, findDay } from '../../../../utils';

const EditProfileHeaderForm = ({userProfile, setShowEditHeaderModal}) => {
    const {username, birthday, about} = userProfile;
    const [errors, setErrors] = useState([]);
    const [country, setCountry] = useState(userProfile.country);
    const [state, setState] = useState(userProfile.state);
    const [timezone, setTimezone] = useState(userProfile.timezone);
    const [year, setYear] = useState(findYear(birthday));
    const [month, setMonth] = useState(findMonth(birthday));
    const [day, setDay] = useState(findDay(birthday));
    const [displayAge, setDisplayAge] = useState(userProfile.displayAge);
    const [showState, setShowState] = useState(userProfile.state ? true : false);
    const [showErrors, setShowErrors] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (country === 'United States') {
            setShowState(true);
        } else {
            setShowState(false);
            setState('');
        }
        if (countriesDefaultTimezones[country]) {
            setTimezone(countriesDefaultTimezones[country])
        }
        return () => {
            setShowState(false);
        }
    }, [country, setTimezone]);

    useEffect(() => {
        if (statesDefaultTimezones[state]) {
            setTimezone(statesDefaultTimezones[state])
        }
    }, [state, setTimezone]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const editProfile = {
            id: +userProfile.id,
            username,
            user_id: +userProfile.userId,
            image: userProfile.imgUrl,
            country,
            state,
            timezone,
            birthday: `${year}, ${month}, ${day}`,
            display_age: displayAge,
            about
        };
        const data = await dispatch(updateProfile(editProfile));
        if (data.errors) {
            setErrors(data.errors);
            document.querySelector('.basic-form-wide').scrollTop = 0;
        } else if (data.id) {
            setShowEditHeaderModal(false);
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
            className='basic-form-wide'
            onSubmit={handleSubmit}
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
            <h2>Edit Basic Info</h2>
            <div className='basic-form-field'>
                <div className='basic-form-label-question'>
                    <label htmlFor='country'>
                        Country
                    </label>
                </div>
                <div className='basic-form-input-container'>
                    <select
                        id='country'
                        name='country'
                        className='basic-form-input'
                        onChange={e => setCountry(e.target.value)}
                        value={country}
                    >
                        <option value='' disabled>Please select your country...</option>
                        {countries.map((country, index) => (
                            <option value={country} key={index}>{country}</option>
                        ))}
                    </select>
                </div>
            </div>
            {showState && (
                <div className='basic-form-field'>
                    <div className='basic-form-label-question'>
                        <label htmlFor='state'>
                            State
                        </label>
                    </div>
                    <div className='basic-form-input-container'>
                        <select
                            id='state'
                            name='state'
                            className='form-select'
                            onChange={e => setState(e.target.value)}
                            value={state}
                        >
                            <option value='' disabled>Please select your state...</option>
                            {states.map((state, index) => (
                                <option value={state} key={index}>{state}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            <div className='basic-form-field'>
                <div className='basic-form-label-question'>
                    <label htmlFor='timezone'>
                        Time Zone
                    </label>
                </div>
                <div className='basic-form-input-container'>
                    <select
                        id='timezone'
                        name='timezone'
                        className='form-select'
                        onChange={e => setTimezone(e.target.value)}
                        value={timezone}
                    >
                        <option value='' disabled>Please select your time zone...</option>
                        {timezones.map((timezone, index) => (
                            <option value={timezone} key={index}>{timezone}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='basic-form-field'>
                <div className='basic-form-label'>
                    Birthday
                </div>
            </div>
            <div className='basic-form-field-multi'>
                <span className='basic-form-inline'>
                    <label htmlFor='month'>
                        Month
                    </label>
                    <input
                        type='text'
                        id='month'
                        name='month'
                        className='basic-form-input-small'
                        onChange={e => setMonth(e.target.value)}
                        value={month}
                    />
                </span>
                <span className='basic-form-inline'>
                    <label htmlFor='day'>
                        Day
                    </label>
                    <input
                        type='text'
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
                        type='text'
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
                        checked={displayAge}
                        id='displayAge'
                        name='displayAge'
                        className='form-input'
                        onChange={e => setDisplayAge(!displayAge)}
                        value={displayAge}
                    />
                    Display age in profile
                </label>
            </div>
            <div className='basic-form-double-button-div'>
                <button
                    type='button'
                    className='basic-form-button-smaller'
                    id='cancel'
                    onClick={() => setShowEditHeaderModal(false)}
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

export default EditProfileHeaderForm;
