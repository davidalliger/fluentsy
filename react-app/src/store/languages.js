const LOAD = 'languages/LOAD';
const ADD = 'languages/ADD';
const EDIT = 'languages/EDIT';
const REMOVE = 'languages/REMOVE';

const loadLanguages = languages => ({type: LOAD, languages});
const addLanguage = new_language => ({type: ADD, new_language});
const editLanguage = edit_language => ({type: EDIT, edit_language});
const removeLanguage = id => ({type: REMOVE, id});

export const getLanguages = () => async dispatch => {
    const response = await fetch('/api/languages/');
    if (response.ok) {
        const languages = await response.json();
        dispatch(loadLanguages(languages))
        return languages;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
}

export const createLanguage = (payload) => async dispatch => {
    const response = await fetch('/api/languages/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const new_language = await response.json();
        dispatch(addLanguage(new_language))
        return new_language;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
}

export const updateLanguage = (payload) => async dispatch => {
    const response = await fetch(`/api/languages/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editLanguage(data))
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

export const deleteLanguage = (id) => async dispatch => {
    const response = await fetch(`/api/languages/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeLanguage(id))
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

const languagesReducer = (state= {}, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD:
            action.languages.forEach(language => newState[language.id] = language);
            return newState;
        case ADD:
            newState[action.new_language.id] = action.new_language;
            return newState;
        case EDIT:
            newState[action.edit_language.id] = action.edit_Language;
            return newState;
        case REMOVE:
            delete newState[action.id];
            return newState
        default:
            return newState;

    }
}

export default languagesReducer;
