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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <h2>Location</h2>
                <p>Where are you located?</p>
                <div className='form-field'>
                    <label htmlFor='country'>
                        Country:
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
                <div className='form-field'>
                    <label htmlFor='timezone'>
                        Time Zone:
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
                    id='submit'
                    className='form-button'
                >
                    Next
                </button>
            </form>
        </div>
    )
}

export default CreateProfileLocationForm;
