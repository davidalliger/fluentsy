const LOAD = 'profiles/LOAD';

const loadProfiles = profiles => ({type: LOAD, profiles});

export const getProfiles = () => async dispatch => {
    const response = await fetch('/api/profiles/');
    if (response.ok) {
        const profiles = await response.json();
        dispatch(loadProfiles(profiles))
        return profiles;
    } else {
        return false;
    }
}

const profilesReducer = (state= {}, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD:
            action.profiles.forEach(profile => newState[profile.id] = profile);
            return newState;
        default:
            return newState;

    }
}

export default profilesReducer;
