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
            img_url: userProfile.imgUrl,
            country,
            state,
            timezone,
            birthday: `${year}, ${month}, ${day}`,
            display_age: displayAge,
            about
        };
        const data = await dispatch(updateProfile(editProfile));
        console.log(data);
        if (data.errors) {
            setErrors(data.errors);
        } else if (data.id) {
            setShowEditHeaderModal(false);
            return;
        } else {
            setErrors(data);
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
                <h2>Edit Basic Info</h2>
                <div className='form-field'>
                    <label htmlFor='country'>
                        Update Country:
                        <select
                            id='country'
                            name='country'
                            className='form-select'
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                        >
                            <option value='' disabled>Please select your country...</option>
                            {countries.map((country, index) => (
                                <option value={country} key={index}>{country}</option>
                            ))}
                        </select>
                    </label>
                </div>
                {showState && (
                    <div className='form-field'>
                        <label htmlFor='state'>
                            Update State:
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
                        </label>
                    </div>
                )}
                <div className='form-field'>
                    <label htmlFor='timezone'>
                        Update Time Zone:
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
                    </label>
                </div>
                <div className='form-field'>
                    Birthday:
                    <label htmlFor='month'>
                        Month
                        <input
                            type='text'
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
                            type='text'
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
                            type='text'
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
                <button
                    type='button'
                    className='form-button'
                    id='cancel'
                    onClick={() => setShowEditHeaderModal(false)}
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

export default EditProfileHeaderForm;
