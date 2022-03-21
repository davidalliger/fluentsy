import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

let messageForm;

const EditMessageForm = ({user, editPayload, sendEditMessage, messageToEdit, setShowEditMessageModal, setEditPayload}) => {
    // const {about, id, username, userId, imgUrl, country, state, timezone, birthday, displayAge} = userProfile;
    const [errors, setErrors] = useState([]);
    const [content, setContent] = useState(messageToEdit.content);
    // const [showSent, setShowSent] = useState(false);
    // const dispatch = useDispatch();

    // useEffect(()=>{
    //     messageForm = io();

    //     return (() => {
    //         messageForm.disconnect()
    //     })
    // }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            id: messageToEdit.id,
            sender_id: user.id,
            content
        };
        // setEditPayload(payload)
        sendEditMessage(payload);
        setShowEditMessageModal(false);
    }

    return (
        <div>
            {/* {(!showSent) && ( */}
            <form onSubmit={handleSubmit}>
                <div>
                    {errors && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <h2>Edit your message</h2>
                <div className='form-field'>
                    <label htmlFor='content'>
                        <textarea
                            id='content'
                            // placeholder={`What would you like to say to ${userProfile.username}?`}
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
                    onClick={() => setShowEditMessageModal(false)}
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
            {/* )} */}
            {/* {showSent && (
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
            )} */}
        </div>
    )
}

export default EditMessageForm;
