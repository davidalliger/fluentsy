const LOAD = 'messages/LOAD';
const ADD = 'messages/ADD';
const EDIT = 'messages/EDIT';
const REMOVE = 'messages/REMOVE';
const CLEAR = 'messages/CLEAR';

const loadMessages = (messages, id) => ({type: LOAD, messages, id});
export const addMessage = (new_message, id) => ({type: ADD, new_message, id});
export const editMessage = (payload, id) => ({type: EDIT, payload, id});
export const removeMessage = (payload, id) => ({type: REMOVE, payload, id});
export const clearMessages = () => ({type: CLEAR});

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
            if (+action.new_message.sender_id !== +action.id) {
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
            if (action.payload.sender_id !== +action.id) {
                newState[action.payload.sender_id][action.payload.id].content = action.payload.content;
            } else {
                newState[action.payload.recipient_id][action.payload.id].content = action.payload.content;
            }
            return newState;
        case REMOVE:
            if (action.payload.sender_id !== +action.id) {
                delete newState[action.payload.sender_id][action.payload.id];
                if ((Object.values(newState[action.payload.sender_id])).length < 1) delete newState[action.payload.sender_id];
            } else {
                delete newState[action.payload.recipient_id][action.payload.id];
                if ((Object.values(newState[action.payload.recipient_id])).length < 1) delete newState[action.payload.recipient_id];
            }
            return newState;
        case CLEAR:
            newState = {}
            return newState
        default:
            return newState;

    }
}

export default messagesReducer;
