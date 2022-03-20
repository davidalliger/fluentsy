const LOAD = 'messages/LOAD';
const ADD = 'messages/ADD';
const EDIT = 'messages/EDIT';
const REMOVE = 'messages/REMOVE';

const loadMessages = (messages, id) => ({type: LOAD, messages, id});
export const addMessage = (new_message, id) => ({type: ADD, new_message, id});
const editMessage = edit_message => ({type: EDIT, edit_message});
export const removeMessage = id => ({type: REMOVE, id});

export const getMessages = (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}/messages`);
    if (response.ok) {
        const messages = await response.json();
        dispatch(loadMessages(messages, id))
        return messages;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
}

// export const recordMessage = (payload) => async dispatch => {
//     const response = await fetch('/api/messages/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     });
//     if (response.ok) {
//         const new_message = await response.json();
//         dispatch(addMessage(new_message))
//         return new_message;
//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data;
//         }
//     } else {
//         return ['An error occured. Please try again.'];
//     }
// }

export const updateMessage = (payload) => async dispatch => {
    const response = await fetch(`/api/messages/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const edit_message = await response.json();
        dispatch(editMessage(edit_message))
        return edit_message;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occured. Please try again.'];
    }

}

// export const deleteMessage = (id) => async dispatch => {
//     const response = await fetch(`/api/messages/${id}`, {
//         method: 'DELETE'
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(removeMessage(id))
//         return data;
//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data;
//         }
//     } else {
//         return ['An error occured. Please try again.'];
//     }
// }

const messagesReducer = (state= {}, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD:
            action.messages.forEach(message => {
                if (message.sender_id !== action.id) {
                    if (newState[message.sender_id]) {
                        newState[message.sender_id][message.id] = message;
                    } else {
                        newState[message.sender_id]= {};
                        newState[message.sender_id][message.id] = message;
                    }
                } else {
                    if (newState[message.recipient_id]) {
                        newState[message.recipient_id][message.id] = message;
                    } else {
                        newState[message.recipient_id]= {};
                        newState[message.recipient_id][message.id] = message;
                    }
                }
            });
            return newState;
        case ADD:
            if (action.new_message.sender_id !== action.id) {
                if (newState[action.new_message.sender_id]) {
                    newState[action.new_message.sender_id][action.new_message.id] = action.new_message;
                } else {
                    newState[action.new_message.sender_id]= {};
                    newState[action.new_message.sender_id][action.new_message.id] = action.new_message;
                }
            } else {
                if (newState[action.new_message.recipient_id]) {
                    newState[action.new_message.recipient_id][action.new_message.id] = action.new_message;
                } else {
                    newState[action.new_message.recipient_id]= {};
                    newState[action.new_message.recipient_id][action.new_message.id] = action.new_message;
                }
            }
            return newState;
        case EDIT:
            newState[action.edit_message.id] = action.edit_message;
            return newState;
        case REMOVE:
            delete newState[action.id];
            return newState
        default:
            return newState;

    }
}

export default messagesReducer;
