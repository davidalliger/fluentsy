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
            recipient_id: messageToEdit.recipient_id,
            sender_id: user.id,
            content
        };
        // setEditPayload(payload)
        sendEditMessage(payload);
        setShowEditMessageModal(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='basic-form-wide'
        >
            <h2>Edit your message</h2>
            <div className='basic-form-field'>
                <textarea
                    id='content'
                    name='content'
                    className='basic-form-text-area'
                    onChange={e => setContent(e.target.value)}
                    value={content}
                />
            </div>
            <div className='basic-form-double-button-div'>
                <button
                    type='button'
                    className='basic-form-button-smaller'
                    id='cancel'
                    onClick={() => setShowEditMessageModal(false)}
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    id='Submit'
                    className='basic-form-button-smaller'
                >
                    Submit
                </button>
            </div>
            <div>
                {errors && errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
        </form>
    )
}

export default EditMessageForm;
