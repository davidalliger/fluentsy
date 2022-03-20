import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

let messageForm;

const SendMessageForm = ({user, userProfile, setShowMessageModal}) => {
    // const {about, id, username, userId, imgUrl, country, state, timezone, birthday, displayAge} = userProfile;
    const [errors, setErrors] = useState([]);
    const [content, setContent] = useState('');
    const [showSent, setShowSent] = useState(false);
    // const dispatch = useDispatch();

    useEffect(()=>{
        messageForm = io();

        return (() => {
            messageForm.disconnect()
        })
    }, [])


    const handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {
            sender_id: user.id,
            recipient_id: userProfile.userId,
            content: content,
            sender: user.username,
            recipient: userProfile.username
        };
        messageForm.emit('message_form', payload);
        setShowSent(true);
    }

    return (
        <div>
            {(!showSent) && (
                <form onSubmit={handleSubmit}>
                    <div>
                        {errors && errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <h2>Send a message to {userProfile.username}</h2>
                    <div className='form-field'>
                        <label htmlFor='content'>
                            <textarea
                                id='content'
                                placeholder={`What would you like to say to ${userProfile.username}?`}
                                name='content'
                                className='form-input'
                                onChange={e => setContent(e.target.value)}
                                value={content}
                            />
                        </label>
                    </div>
                    <button
                        type='button'
                        className='form-button'
                        id='cancel'
                        onClick={() => setShowMessageModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        id='Submit'
                        className='form-button'
                    >
                        Submit
                    </button>
                </form>
            )}
            {showSent && (
                <div>
                    <h2>Your message has been sent!</h2>
                    <button
                        type='button'
                        className='form-button'
                        id='cancel'
                        onClick={() => setShowMessageModal(false)}
                    >
                        Exit
                    </button>
                    <button
                        type='button'
                        id='Submit'
                        className='form-button'
                        onClick={() => setShowMessageModal(false)}
                    >
                        See Conversation
                    </button>
                </div>
            )}
        </div>
    )
}

export default SendMessageForm;

// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { useSelector } from 'react-redux';
// import './Chat.css';

// let socket;

// const Chat = () => {
//     const messages = useSelector(state => state.messages)
//     const [chatInput, setChatInput] = useState('');

//     const user = useSelector(state => state.session.user)

//     useEffect(() => {
//         socket = io();

//         socket.on('chat', chat => {
//             setMessages(messages => [...messages, chat])
//         })

//         return (() => {
//             socket.disconnect()
//         })
//     }, []);

//     const updateChatInput = (e) => {
//         setChatInput(e.target.value);
//     }

//     const sendChat = (e) => {
//         e.preventDefault();
//         socket.emit('chat', {user: user.username, msg: chatInput});
//         setChatInput('');
//     }

//     return (user && (
//         <div id='chat-display'>
//             <div>
//                 {messages.map((message, ind) => (
//                     <div key={ind}>
//                         {`${message.user}: ${message.msg}`}
//                     </div>
//                 ))}
//             </div>
//             <form onSubmit={sendChat}>
//                 <input
//                     // type='text'
//                     value={chatInput}
//                     onChange={updateChatInput}
//                 />
//                 <button type='submit'>Send</button>
//             </form>
//         </div>
//     )
//     )
// };

// export default Chat;
