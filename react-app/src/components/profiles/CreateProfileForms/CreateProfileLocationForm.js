import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addProfileLocation } from "../../../store/profiles";
import { states, countries, timezones, statesDefaultTimezones, countriesDefaultTimezones } from '../../../utils';

const CreateProfileLocationForm = ({setShowLocationForm, setShowAboutForm}) => {
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [timezone, setTimezone] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const history = useHistory();

    useEffect(() => {
        if (country === 'United States') {
            setShowState(true);
        } else {
            setShowState(false);
        }

        return () => {
            setShowState(false);
        }
    }, [country]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const location = {
            country,
            state,
            timezone
        };
        const data = await dispatch(addProfileLocation(location));
        if (data.errors) {
            setErrors(data.errors);
        } else if (data.success) {
            setShowLocationForm(false);
            setShowAboutForm(true);
        }
    }

    return (
        <div>
            <h2>Hello, {user.username}!</h2>
            <p>Where are you located?</p>
            <form onSubmit={handleSubmit}>
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
                    onClick={history.goBack}
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
