import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addProfileLocation } from "../../../../store/profiles";
import { states, countries, timezones, statesDefaultTimezones, countriesDefaultTimezones } from '../../../../utils';

const CreateProfileLocationForm = ({country, setCountry, state, setState, timezone, setTimezone, setShowModal, setShowLanguageForm, setShowLocationForm, setShowAboutForm}) => {
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [showState, setShowState] = useState(false);
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
        const location = {
            country,
            state: (country === 'United States') ? state : null,
            timezone
        };
        const data = await dispatch(addProfileLocation(location));
        if (data.errors) {
            setErrors(data.errors);
            document.querySelector('.basic-form-wide').scrollTop = 0;
        } else if (data.success) {
            setShowLocationForm(false);
            setShowAboutForm(true);
        } else {
            setErrors(data);
            document.querySelector('.basic-form-wide').scrollTop = 0;
        }
    }

    const handleBack = () => {
        setShowLocationForm(false);
        setShowLanguageForm(true);
    }

    useEffect(() => {
        if (errors?.length) {
            setShowErrors(true);
        }
    }, [errors]);

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
                <h2>Location</h2>
                <div className='basic-form-field'>
                    <div className='basic-form-label'>
                        <label htmlFor='country'>
                            Please select your country
                        </label>
                    </div>
                    <div className='basic-form-input-container'>
                        <select
                            className='basic-form-input-select-wide'
                            id='country'
                            name='country'
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                        >
                            <option value='' disabled>Country</option>
                            {countries.map((country, index) => (
                                <option value={country} key={index}>{country}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {showState && (
                    <div className='basic-form-field'>
                        <div className='basic-form-label'>
                            <label htmlFor='state'>
                                Please select your state
                            </label>
                        </div>
                        <div className='basic-form-input-container'>
                            <select
                                id='state'
                                name='state'
                                className='basic-form-input-select-wide'
                                onChange={e => setState(e.target.value)}
                                value={state}
                            >
                                <option value='' disabled>State</option>
                                {states.map((state, index) => (
                                    <option value={state} key={index}>{state}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
                <div className='basic-form-field'>
                    <div className='basic-form-label'>
                        <label htmlFor='timezone'>
                            Please select your timezone
                        </label>
                    </div>
                    <div className='basic-form-input-container'>
                        <select
                            id='timezone'
                            name='timezone'
                            className='basic-form-input-select-wide'
                            onChange={e => setTimezone(e.target.value)}
                            value={timezone}
                        >
                            <option value='' disabled>Time Zone</option>
                            {timezones.map((timezone, index) => (
                                <option value={timezone} key={index}>{timezone}</option>
                            ))}
                        </select>
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
                        id='submit'
                        className='basic-form-button-smaller'
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateProfileLocationForm;
