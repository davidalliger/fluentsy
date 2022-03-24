import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addProfileLocation } from "../../../../store/profiles";
import { states, countries, timezones, statesDefaultTimezones, countriesDefaultTimezones } from '../../../../utils';

const CreateProfileLocationForm = ({country, setCountry, state, setState, timezone, setTimezone, setShowModal, setShowLanguageForm, setShowLocationForm, setShowAboutForm}) => {
    const [errors, setErrors] = useState([]);
    const [showState, setShowState] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

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
        } else if (data.success) {
            setShowLocationForm(false);
            setShowAboutForm(true);
        } else {
            setErrors(data);
        }
    }

    const handleBack = () => {
        setShowLocationForm(false);
        setShowLanguageForm(true);
    }

    return (
        <div className='basic-form-inner'>
            <form onSubmit={handleSubmit} className='basic-form-inner'>
                <h2>Location</h2>
                {/* <p>Where are you located?</p> */}
                <div className='basic-form-field'>
                    <div className='basic-form-label'>
                        <label htmlFor='country'>
                            Please select your country
                        </label>
                    </div>
                    <div className='basic-form-input-container'>
                        <select
                            className='basic-form-input'
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
                    <div className='form-field'>
                        <label htmlFor='state'>
                            State:
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
                            className='basic-form-input'
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
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
            </form>
        </div>
    )
}

export default CreateProfileLocationForm;
