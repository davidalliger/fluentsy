import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import './MessagesWindow.css';
import { useParams } from 'react-router-dom';
import { recordMessage, getMessages } from '../../../store/messages';
import Loading from '../../other/Loading';

let socket;
let socket2;

const MessagesWindow = () => {
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [messages2, setMessages2] = useState([]);
    const [errors, setErrors] = useState([]);
    const [joined, setJoined] = useState(false);
    const [messageHistory, setMessageHistory] = useState(null);
    const  { recipient } = useParams();
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const recipient2 = 2;

    useEffect(() => {
        if (user) {
        //     (async()=>{
            socket = io();
            socket.on('join', chat => {
                setMessageHistory(chat)

                console.log(chat);
            })
            socket.emit('join', {sender_id: user.id, recipient_id: +recipient})
            console.log(user.id)
            console.log(recipient)

            socket.on('chat', chat => {
                console.log(chat.sender_id);
                console.log(+recipient);
                if (chat.sender_id === +recipient) {
                    setMessages(messages => [...messages, chat]);
                }
            })
            // setJoined(true);


            //         const messageState = await dispatch(getMessages(+user.id));
            //         const messageHistory = messageState.filter(message => (message.sender_id === recipient || message.recipient_id === recipient));
            //         setMessages([messages, ...messageHistory]);
        //     })()
        return (() => {
                    socket.disconnect()
            })
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            socket2 = io();
            // socket2.on('join', chat => {
            //     setMessageHistory(chat)

            //     console.log(chat);
            // })
            socket2.emit('join2', {sender_id: user.id, recipient_id: recipient2})
            // console.log(user.id)
            // console.log(recipient2)

            socket2.on('chat', chat => {
                console.log(chat.sender_id);
                console.log(recipient2);
                if (chat.sender_id === +recipient2) {
                    setMessages2(messages2 => [...messages2, chat]);
                }
            })
        return (() => {
                    socket2.disconnect()
            })
        }
    }, [user]);

    // useEffect(() => {
    //     if (joined) {
    //     }
    // })

    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    }

    const sendChat = (e) => {
        e.preventDefault();
        const payload = {
            sender_id: user.id,
            content: chatInput,
            recipient_id: +recipient
        }
        setMessages(messages => [...messages, payload]);
        console.log(payload)
        socket.emit('chat', payload);
        // const data = await dispatch(recordMessage(payload));
        // if (data.errors) {
        //     setErrors(data.errors);
        // } else if (data.content) {
            // } else {
                //     console.log("data ", data);
                //     setErrors(data);
                // }
                    setChatInput('');
            }


    return (user && (
        <div id='messages-window'>
            {!messageHistory && (
                <Loading />
            )}
            {messageHistory && (
                <div id='chat-display'>
                    <div>
                        ***NEW MESSAGES FROM MARNIE***
                        {messages2.map((message, ind) => (
                            <div key={ind}>
                                {`user ${message.sender_id}: ${message.content}`}
                            </div>
                        ))}
                    </div>
                    <div>
                        {user.username}'s messages with user id {recipient}
                    </div>
                    <div>
                            <div>
                            {messageHistory.map((message, ind) => (
                                <div key={ind}>
                                    {`user ${message.sender_id}: ${message.content}`}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                            ))}
                    </div>
                    <div>
                        {messages.map((message, ind) => (
                            <div key={ind}>
                                {`user ${message.sender_id}: ${message.content}`}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendChat}>
                        <input
                            // type='text'
                            value={chatInput}
                            onChange={updateChatInput}
                            />
                        <button type='submit'>Send</button>
                    </form>
                </div>
            )}
        </div>
    )
    )
};

export default MessagesWindow;
