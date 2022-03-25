import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import '../Messages/Messages.css';
// import { useParams } from 'react-router-dom';
import { clearError } from '../../../store/messages';
import Loading from '../../other/Loading';
// import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import EditMessageModal from '../EditMessage/EditMessageModal';
// import {useSocket} from '../../../context/Socket';

let messageSocket;

const SelectedMessages = ({selected, user, profiles, currentCorrenspondent}) => {
    // console.log('in SelectedMessages, selected is ', selected);
    // console.log('in SelectedMessages, user is ', user);
    // console.log('in SelectedMessages, profiles is ', profiles);
    const [chatInput, setChatInput] = useState('');
    const [errors, setErrors] = useState([]);
    const [messageHistory, setMessageHistory] = useState(null);
    // const user = useSelector(state => state.session.user);
    const messageState = useSelector(state=> state.messages);

    const [selectedName, setSelectedName] = useState('');
    const [showEditMessageModal, setShowEditMessageModal] = useState('');
    const [messageToEdit, setMessageToEdit] = useState(null);
    const [editPayload, setEditPayload] = useState(null);
    const [noMessages, setNoMessages] = useState(false);
    const [yesMessages, setYesMessages] = useState(false);
    const [chatSent, setChatSent] = useState(false);
    const [chatHandled, setChatHandled] = useState(false);
    const dispatch = useDispatch();
    // const {socket} = useSocket();
    // let messageHistory;

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

    useEffect(() => {
        console.log('update in message state, resetting');
        if (messageState && messageState['errors'] && messageState['errors'][selected]) {
            setErrors([messageState['errors'][selected]['message']]);
            setChatInput(messageState['errors'][selected]['content'])
        } else if (messageState && messageState['errors'] && !messageState['errors'][selected]) {
            setErrors([])
        }
    }, [messageState, selected])

    useEffect(()=> {

        messageSocket = io();
        messageSocket.emit('join', {room_id: +user.id});
            // socket.on('chat', chat => {
            //     dispatch(addMessage(chat));
            // })
            // setSocket(socket);
        //   }
        //   setLoaded(true);
        return (() => {
            messageSocket.disconnect();
        })

    }, []);

    // useEffect(()=> {

    // }, [messageState])

    useEffect(()=> {
        if (selected && profiles.length) {
            // console.log('in useEffect, selected is ', selected);
            const userProfile = profiles?.reduce((profileMatch, profile) => {
                if (profile.userId === +selected) profileMatch = profile;
                return profileMatch;
            }, null);
            setSelectedName(userProfile.username);
            // console.log('in useEffect, selectedName is ', selectedName);
            if (messageState && Object.keys(messageState).length) {

                // console.log('in useEffect, messageState is ', messageState);
                const selectedMessages = messageState[selected];
                // console.log('in useEffect, selectedMessages is ', selectedMessages);
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

    // useEffect(()=> {
    //     if (selected && messageState && Object.keys(messageState).length) {
    //         const selectedMessages = messageState[selected];
    //         if (selectedMessages) {
    //             const previousMessages = Object.values(selectedMessages).reverse();
    //             let name;
    //             if (previousMessages.length) {
    //                 if (previousMessages[0].sender_id === user.id) {
    //                     name = previousMessages[0].recipient;
    //                 } else {
    //                     name = previousMessages[0].sender;
    //                 }
    //                 setSelectedName(name);
    //                 setMessageHistory(previousMessages);
    //             }
    //         }
    //     }
    // }, [messageState, selected]);


    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    }

    useEffect(() => {
        console.log('chat sent, beginning timer...');
        console.log('chat sent is', chatSent);
        console.log('chat handled is ', chatHandled);
        console.log('errors is ', errors);
        const timer = setTimeout(() => {
            if (chatSent && !errors?.length) {
                setChatInput('')
                setChatHandled(true);
                setErrors([]);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [chatSent, errors])

    useEffect(() => {
        if (chatHandled) {
            setChatSent(false);
        }
    }, [chatHandled]);

    useEffect(()=> {
        dispatch(clearError(selected));
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
        // console.log('in send chat, payload is ', payload)
        // dispatch(addMessage(payload, user.id))
        messageSocket.emit('chat', payload);
        // messageSocket.emit('self_chat', payload);
        setChatSent(true);
        console.log('chat sent');
        console.log('chat sent is', chatSent);
        setChatHandled(false);
        console.log('chat not yet handled');
        console.log('chat handled is ', chatHandled);
    }

    // document.getElementById("message-button").addEventListener('keypress')

    const deleteMessage = (e) => {
        const payload = {
            id: +e.currentTarget.id,
            sender_id: user.id
        }
        messageSocket.emit('delete_chat', payload);
    }

    const openEditMessage = (e) => {
        // console.log('in EditMessage, messageState is ', messageState)
        const selectedMessages = messageState[selected];
        // console.log('in EditMessage, selectedMessages is ', selectedMessages)
        // console.log('in EditMessage, editId is ', e.currentTarget.id)
        const editId = (e.currentTarget.id).split('-')[0];
        const message = selectedMessages[+editId];
        // console.log('in EditMessage, message is ', message)
        setMessageToEdit(message);
        setShowEditMessageModal(true);
    }

    const sendEditMessage = (editPayload) => {
        messageSocket.emit('edit_chat', editPayload);
    }

    return (
        <div id='selected-messages'>
            <div id='message-panel'>
                <div id='message-header'></div>
                {!messageHistory && (
                    <div id='message-display'>
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
                    </div>
                )}
                {messageHistory && (
                    <div id='message-display'>
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
                    </div>
                )}
                {errors.map((error, ind) => (
                    <div key={ind} className='message-error'>
                        {error}
                    </div>
                ))}
                <div id='message-form-div'>
                    <form id='message-form'onSubmit={sendChat}>
                        <textarea
                            id='message-input'
                            wrap='soft'
                            placeholder='Type your message here'
                            value={chatInput}
                            onChange={updateChatInput}
                        />
                        <button id='message-button' type='submit'>Send</button>
                    </form>
                </div>
                <EditMessageModal sendEditMessage={sendEditMessage} user={user} editPayload={editPayload} setEditPayload={setEditPayload} showEditMessageModal={showEditMessageModal} setShowEditMessageModal={setShowEditMessageModal} messageToEdit={messageToEdit} />
            </div>
        </div>
    )
};

export default SelectedMessages;
