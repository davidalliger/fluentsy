const LOAD = 'languages/LOAD';
const ADD = 'languages/ADD';
const EDIT = 'languages/EDIT';
const REMOVE = 'languages/REMOVE';
const CLEAR = '/languages/CLEAR';

const loadLanguages = languages => ({type: LOAD, languages});
const addLanguage = new_language => ({type: ADD, new_language});
const editLanguage = edit_language => ({type: EDIT, edit_language});
const removeLanguage = delete_language => ({type: REMOVE, delete_language});
export const clearLanguages = id => ({type: CLEAR, id})

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
        console.log('in thunk, new language is ', new_language);
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
        method: 'DELETE',
    });
    if (response.ok) {
        const delete_language = await response.json();
        dispatch(removeLanguage(delete_language))
        return delete_language;
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
    const native = 'native';
    const target = 'target';
    switch(action.type) {
        case LOAD:
            action.languages.forEach(language => {
                if (newState[language.userId]) {
                    if (language.native) {
                        if (newState[language.userId][native]){
                            newState[language.userId][native][language.id] = language;
                        } else {
                            newState[language.userId][native] = {};
                            newState[language.userId][native][language.id] = language;
                        }
                    } else {
                        if (newState[language.userId][target]){
                            newState[language.userId][target][language.id] = language;
                        } else {
                            newState[language.userId][target] = {};
                            newState[language.userId][target][language.id] = language;
                        }
                    }
                } else {
                    newState[language.userId] = {};
                    if (language.native) {
                        newState[language.userId][native] = {};
                        newState[language.userId][native][language.id] = language;
                    } else {
                        newState[language.userId][target] = {};
                        newState[language.userId][target][language.id] = language;
                    }
                }
            });
            return newState;
        case ADD:
            if (newState[action.new_language.userId]) {
                if (action.new_language.native) {
                    if (newState[action.new_language.userId][native]){
                        console.log('in reducer!!!')
                        // newState[language.userId][native][language.id] = language;
                        newState[action.new_language.userId][native][action.new_language.id] = action.new_language;
                    } else {
                        newState[action.new_language.userId][native] = {}
                        newState[action.new_language.userId][native][action.new_language.id] = action.new_language;
                    }
                } else {
                    if (newState[action.new_language.userId][target]){
                        newState[action.new_language.userId][target][action.new_language.id] = action.new_language;
                    } else {
                        newState[action.new_language.userId][target] = {}
                        newState[action.new_language.userId][target][action.new_language.id] = action.new_language;
                    }
                }
            } else {
                newState[action.new_language.userId] = {};
                if (action.new_language.native) {
                    newState[action.new_language.userId][native] = {}
                    newState[action.new_language.userId][native][action.new_language.id] = action.new_language;
                } else {
                    newState[action.new_language.userId][target] = {}
                    newState[action.new_language.userId][target][action.new_language.id] = action.new_language;
                }
            }
            // newState[action.new_language.id] = action.new_language;
            return newState;
        case EDIT:
            if (action.edit_language.native) {
                newState[action.edit_language.userId][native][action.edit_language.id] = action.edit_language;
            } else {
                newState[action.edit_language.userId][target][action.edit_language.id] = action.edit_language;
            }
            return newState;
        case REMOVE:
            if (action.delete_language.native) {
                delete newState[action.delete_language.userId][native][action.delete_language.id];
            } else {
                delete newState[action.delete_language.userId][target][action.delete_language.id];
            }
            return newState;
        case CLEAR:
            delete newState[action.id];
            return newState;
        default:
            return newState;

    }
}

export default languagesReducer;
