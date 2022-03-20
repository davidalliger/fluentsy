import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import './Chat.css';

let socket;

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [joined, setJoined] = useState(false);

    const recipientId ='Demo'

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        socket = io();

        socket.on('chat', chat => {
            setMessages(messages => [...messages, chat])
        })

        return (() => {
            socket.disconnect()
        })
    }, []);

    if (socket && (!joined)) {
        socket.emit('join', {room: user.username})
    }

    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    }

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit('chat', {username: user.username, msg: chatInput, room: recipientId});
        setChatInput('');
    }


    return (user && (
        <div id='chat-display'>
            <div>
                Current user: {user.username}
            </div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>
                        {`${message.username}: ${message.msg}`}
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
    )
    )
};

export default Chat;
