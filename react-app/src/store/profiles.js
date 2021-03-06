const LOAD = 'profiles/LOAD';
const ADD = 'profiles/ADD';
const EDIT = 'profiles/EDIT';
const REMOVE = 'profiles/REMOVE';

const loadProfiles = profiles => ({type: LOAD, profiles});
const addProfile = new_profile => ({type: ADD, new_profile});
const editProfile = edit_profile => ({type: EDIT, edit_profile});
const removeProfile = id => ({type: REMOVE, id});

export const getProfiles = () => async dispatch => {
    const response = await fetch('/api/profiles/');
    if (response.ok) {
        const profiles = await response.json();
        dispatch(loadProfiles(profiles))
        return profiles;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
}

export const checkProfileExists = (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}/profiles`);
    if (response.ok) {
        const message = await response.json();
        return message;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
}

export const addProfileLanguages = (payload) => async dispatch => {
    const response = await fetch('/api/profiles/languages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const message = await response.json();
        return message;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
}

export const addProfileLocation = (payload) => async dispatch => {
    const response = await fetch('/api/profiles/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const message = await response.json();
        return message;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
}

export const addProfileAbout = (payload) => async dispatch => {
    const response = await fetch('/api/profiles/about', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const message = await response.json();
        return message;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
}

export const addProfilePicture = (payload) => async dispatch => {
    const response = await fetch('/api/profiles/picture', {
        method: 'POST',
        body: payload
    });
    if (response.ok) {
        const message = await response.json();
        return message;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
}

export const createProfile = (payload) => async dispatch => {
    const response = await fetch('/api/profiles/', {
        method: 'POST',
        body: payload
    });
    if (response.ok) {
        const new_profile = await response.json();
        dispatch(addProfile(new_profile))
        return new_profile;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
}

export const updateProfilePicture = (payload, id) => async dispatch => {
    const response = await fetch(`/api/profiles/${id}/picture`, {
        method: 'PUT',
        body: payload
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editProfile(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }

}

export const updateProfileHeader = (payload) => async dispatch => {
    const response = await fetch(`/api/profiles/${payload.id}/header`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editProfile(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }

}

export const updateProfileAbout = (payload) => async dispatch => {
    const response = await fetch(`/api/profiles/${payload.id}/about`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editProfile(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }

}

export const deleteProfile = (id) => async dispatch => {
    const response = await fetch(`/api/profiles/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeProfile(id))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
}

const profilesReducer = (state= {}, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD:
            action.profiles.forEach(profile => newState[profile.id] = profile);
            return newState;
        case ADD:
            newState[action.new_profile.id] = action.new_profile;
            return newState;
        case EDIT:
            newState[action.edit_profile.id] = action.edit_profile;
            return newState;
        case REMOVE:
            delete newState[action.id];
            return newState
        default:
            return newState;

    }
}

export default profilesReducer;
