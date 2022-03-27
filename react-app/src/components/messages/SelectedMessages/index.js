import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import '../Messages/Messages.css';
import EditMessageModal from '../EditMessage/EditMessageModal';


let messageSocket;

const SelectedMessages = ({selected, user, profiles, currentCorrenspondent}) => {
    const [chatInput, setChatInput] = useState('');
    const [errors, setErrors] = useState([]);
    const [editErrors, setEditErrors] = useState([]);
    const [messageHistory, setMessageHistory] = useState(null);
    const messageState = useSelector(state=> state.messages);

    const [selectedName, setSelectedName] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [showEditMessageModal, setShowEditMessageModal] = useState(false);
    const [messageToEdit, setMessageToEdit] = useState(null);
    const [editPayload, setEditPayload] = useState(null);
    const [noMessages, setNoMessages] = useState(false);
    const [yesMessages, setYesMessages] = useState(false);

    useEffect(() => {
        if (!(Object.values(messageState).length) && !selected) {
            setNoMessages(true);
            setYesMessages(false);
        } else if ((Object.values(messageState).length) && !selected) {
            setYesMessages(true);
            setNoMessages(false);
        } else {
            setYesMessages(false);
            setNoMessages(false);
        }
    }, [messageState, selectedName])

    useEffect(()=> {

        messageSocket = io();
        messageSocket.emit('join', {room_id: +user.id});
        messageSocket.on('error', error_message => {
            if (error_message.message && (error_message.type === 'edit')) {
                setEditErrors([error_message.message]);
            } else if (error_message.message && (error_message.type === 'chat')) {
                setErrors([error_message.message]);
            } else if (error_message.none) {
                setChatInput('');
                setShowEditMessageModal(false);
            }
        })
        return (() => {
            messageSocket.disconnect();
        })

    }, []);

    useEffect(()=> {
        if (selected && profiles.length) {
            const userProfile = profiles?.reduce((profileMatch, profile) => {
                if (profile.userId === +selected) profileMatch = profile;
                return profileMatch;
            }, null);
            setSelectedName(userProfile.username);
            setSelectedProfile(userProfile);
            if (messageState && Object.keys(messageState).length) {

                const selectedMessages = messageState[selected];
                if (selectedMessages && Object.keys(selectedMessages).length) {
                    const previousMessages = Object.values(selectedMessages).reverse();
                    setMessageHistory(previousMessages);
                } else {
                    setMessageHistory(null);
                }
            } else {
                setMessageHistory(null);
            }
        } else {
            setMessageHistory(null);
        }
    }, [messageState, selected, profiles]);


    const updateChatInput = (e) => {
        setChatInput(e.target.value);
        if(e.target.value.length > 0 && e.target.value.length <= 255) {
            setErrors([]);
        }
        if(e.target.value.length > 255) {
            setErrors(['Message must be 255 characters or less']);
        }
    }

    useEffect(()=> {
        if (selected) {
            setErrors([]);
            setEditErrors([]);
        }
    }, [selected])

    const sendChat = (e) => {
        e.preventDefault();
        const payload = {
            sender_id: user.id,
            content: chatInput,
            recipient_id: +selected,
            recipient: selectedName,
            sender: user.username
        }
        messageSocket.emit('chat', payload);

    }



    const deleteMessage = (e) => {
        const payload = {
            id: +e.currentTarget.id,
            sender_id: user.id
        }
        messageSocket.emit('delete_chat', payload);
    }

    const openEditMessage = (e) => {
        const selectedMessages = messageState[selected];
        const editId = (e.currentTarget.id).split('-')[0];
        const message = selectedMessages[+editId];
        setMessageToEdit(message);
        setEditErrors([]);
        setShowEditMessageModal(true);
    }

    const sendEditMessage = (editPayload) => {
        messageSocket.emit('edit_chat', editPayload);
    }

    return (
        <div id='selected-messages'>
            <div id='message-panel'>
                <div id='message-header'>
                    {selectedProfile && (
                        <div id='message-selected-profile-info'>
                            {selectedProfile.imgUrl && (
                                <div id='message-selected-profile-image' style={{backgroundImage: `url(${selectedProfile.imgUrl})`}} />
                            )}
                            {(!selectedProfile.imgUrl) && (
                                <i className="fa-solid fa-circle-user message-selected-no-profile-image"></i>
                            )}
                            <div id='message-selected-profile-username'>
                                {selectedProfile.username}
                            </div>
                        </div>
                    )}
                </div>
                <div id='message-display'>
                    {errors.map((error, ind) => (
                        <div key={ind} className='message-error'>
                            {error}
                        </div>
                    ))}
                    {!messageHistory && (
                            <div className='message-display-title-div'>
                                {selectedName && (
                                    <div className='message-display-title'>
                                        <span className='message-display-title-user'>{user.username}</span>'s messages with <span className='message-display-title-user'>{selectedName}</span>
                                    </div>
                                )}
                                {yesMessages && (
                                    <div className='message-display-title'>
                                        Select a name on the left to start chatting
                                    </div>
                                )}
                                {noMessages && (
                                    <div className='message-display-title'>
                                        Your message inbox is empty
                                    </div>
                                )}
                            </div>
                    )}
                    {messageHistory && (
                        <>
                            {messageHistory.map((message, ind) => {
                                if (message.sender_id === user.id) {
                                    return (
                                            <div className='message-bubble-area-right' key={ind}>
                                                <div className='message-bubble'>
                                                    <div className='message-bubble-sender'>
                                                        {message.sender}
                                                    </div>
                                                    <div className='message-bubble-content'>
                                                        {message.content}
                                                    </div>
                                                </div>
                                                <div className='message-icon-area'>
                                                    <span id={`${message.id}-edit`}
                                                        className='message-edit-delete-icon'
                                                        onClick={openEditMessage}
                                                    >
                                                        <i className="fa-solid fa-pen"></i>
                                                    </span>
                                                    <span id={message.id}
                                                        className='message-edit-delete-icon'
                                                        onClick={deleteMessage}
                                                    >
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                } else {
                                    return (
                                        <div className='message-bubble-area-left' key={ind}>
                                            <div className='message-bubble'>
                                                <div className='message-bubble-sender'>
                                                    {message.sender}
                                                </div>
                                                <div className='message-bubble-content'>
                                                    {message.content}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                            <div className='message-display-title-div'>
                                <div className='message-display-title'>
                                    <span className='message-display-title-user'>{user.username}</span>'s messages with <span className='message-display-title-user'>{selectedName}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div id='message-form-div'>
                    <form id='message-form'onSubmit={sendChat}>
                        <textarea
                            id='message-input'
                            wrap='soft'
                            placeholder='Type your message here, then hit send'
                            value={chatInput}
                            onChange={updateChatInput}
                        />
                        <button id='message-button' type='submit'>Send</button>
                    </form>
                </div>
                <EditMessageModal sendEditMessage={sendEditMessage} user={user} editPayload={editPayload} setEditPayload={setEditPayload} showEditMessageModal={showEditMessageModal} setShowEditMessageModal={setShowEditMessageModal} messageToEdit={messageToEdit} selected={selected} editErrors={editErrors} setEditErrors={setEditErrors} setErrors={setErrors} />
            </div>
        </div>
    )
};

export default SelectedMessages;
