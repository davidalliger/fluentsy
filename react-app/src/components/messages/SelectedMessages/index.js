import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import '../Messages/Messages.css';
// import { useParams } from 'react-router-dom';
import { removeMessage } from '../../../store/messages';
import Loading from '../../other/Loading';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
// import {useSocket} from '../../../context/Socket';

let messageSocket;

const SelectedMessages = ({selected, user}) => {
    const [chatInput, setChatInput] = useState('');
    const [errors, setErrors] = useState([]);
    const [messageHistory, setMessageHistory] = useState(null);
    // const user = useSelector(state => state.session.user);
    const messageState = useSelector(state=> state.messages);
    const [selectedName, setSelectedName] = useState('');
    const dispatch = useDispatch();
    // const {socket} = useSocket();
    // let messageHistory;

    useEffect(()=> {

        messageSocket = io();
        messageSocket.emit('join', {room_id: +user.id});
            // socket.on('chat', chat => {
            //     dispatch(addMessage(chat));
            // })
            // setSocket(socket);
        //   }
        //   setLoaded(true);
        messageSocket.on('delete_chat', data => {
            dispatch(removeMessage(data.id));
        })
        return (() => {
            messageSocket.disconnect();
        })

    }, []);

    useEffect(()=> {
        if (selected && messageState && Object.keys(messageState).length) {
            console.log('in useEffect, selected is ', selected);
            console.log('in useEffect, messageState is ', messageState);
            const selectedMessages = messageState[selected];
            console.log('in useEffect, selectedMessages is ', selectedMessages);
            const previousMessages = Object.values(selectedMessages).reverse();
            let name;
            if (previousMessages[0].sender_id === user.id) {
                name = previousMessages[0].recipient;
            } else {
                name = previousMessages[0].sender;
            }
            setSelectedName(name);
            setMessageHistory(previousMessages);
        }
    }, [messageState, selected]);


    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    }

    const sendChat = (e) => {
        e.preventDefault();
        const payload = {
            sender_id: user.id,
            content: chatInput,
            recipient_id: +selected,
            recipient: selectedName,
            sender: user.username
        }
        // dispatch(addMessage(payload, user.id))
        messageSocket.emit('chat', payload);
        // messageSocket.emit('self_chat', payload);
        setChatInput('');
    }

    // document.getElementById("message-button").addEventListener('keypress')

    const deleteMessage = (e) => {
        const payload = {
            id: +e.currentTarget.id,
            sender_id: user.id
        }
        messageSocket.emit('delete_chat', payload);
    }

    return (
        <div id='selected-messages'>
            {!messageHistory && (
                <Loading />
            )}
            {messageHistory && (
                <div id='message-panel'>
                    <div id='message-header'></div>
                    <div id='message-display'>
                        {messageHistory.map((message, ind) => {
                            console.log(message)
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
                                            <span className='message-edit-delete-icon'>
                                                <i class="fa-solid fa-pen"></i>
                                            </span>
                                            <span id={message.id}
                                                className='message-edit-delete-icon'
                                                onClick={deleteMessage}
                                            >
                                                <i class="fa-solid fa-trash-can"></i>
                                            </span>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className='message-bubble-area-leftt' key={ind}>
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
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                    </div>
                    {/* <div>
                        {messages.map((message, ind) => (
                            <div key={ind}>
                                {`user ${message.sender_id}: ${message.content}`}
                            </div>
                        ))}
                    </div> */}
                    <div id='message-form-div'>
                        <form id='message-form'onSubmit={sendChat}>
                            <textarea
                                id='message-input'
                                value={chatInput}
                                onChange={updateChatInput}
                                />
                            <button id='message-button' type='submit'>Send</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
};

export default SelectedMessages;
