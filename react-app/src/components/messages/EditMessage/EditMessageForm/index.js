import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

let messageForm;

const EditMessageForm = ({user, editPayload, sendEditMessage, messageToEdit, showEditMessageModal, setShowEditMessageModal, setEditPayload, selected, editErrors, setEditErrors}) => {
    // const {about, id, username, userId, imgUrl, country, state, timezone, birthday, displayAge} = userProfile;
    // const [editErrors, setEditErrors] = useState([]);
    // const [currentErrors, setCurrentErrors] = useState([]);
    const [content, setContent] = useState(messageToEdit.content);
    const [showEditErrors, setShowEditErrors] = useState(false);
    // const [editAttempt, setEditAttempt] = useState(false);
    // const [editHandled, setEditHandled] = useState(false);
    // const messageState = useSelector(state=> state.messages);
    console.log('showing editmessagemodal form, showEditMessageModal is ', showEditMessageModal);

    // useEffect(() => {
    //     console.log('update in message state, resetting');
    //     console.log('in edit, selected is ', selected);
    //     console.log('before setting, currentErrors is ', currentErrors)
    //     if (messageState && messageState['errors'] && messageState['errors'][selected]) {
    //         if (editAttempt) {
    //             setCurrentErrors([messageState['errors'][selected]['message']]);
    //         }
    //         // setChatInput(messageState['errors'][selected]['content'])
    //     } else if (messageState && messageState['errors'] && !messageState['errors'][selected]) {
    //         if (editAttempt) {
    //             setCurrentErrors([])
    //         }
    //     }
    // }, [messageState, selected])

    // useEffect(() => {
    //     console.log('edit attempt, beginning timer...');
    //     // console.log('chat sent is', chatSent);
    //     // console.log('chat handled is ', chatHandled);
    //     console.log('editErrors is ', currentErrors);

    //     let timer;
    //     if (editAttempt) {
    //         timer = setTimeout(() => {
    //             if (editAttempt && !currentErrors?.length) {
    //                 setShowEditMessageModal(false);
    //                 setEditHandled(true);
    //                 setCurrentErrors([]);
    //             }
    //     }, 500);
    // }

    //     return () => clearTimeout(timer);
    // }, [editAttempt, currentErrors])

    // useEffect(() => {
    //     if (editHandled) {
    //         setEditAttempt(false);
    //     }
    // }, [editHandled]);

    // useEffect(()=> {
    //     if (editErrors) {
    //         setCurrentErrors(editErrors);
    //     }
    // }, [editErrors, messageState])
    // useEffect(() => {
    //     console.log('edit attempt, beginning timer...');
    //     // console.log('chat sent is', chatSent);
    //     // console.log('chat handled is ', chatHandled);
    //     console.log('editErrors is ', editErrors);
    //     const timer = setTimeout(() => {
    //         if (editAttempt && !editErrors?.length) {
    //             setShowEditMessageModal(false);
    //             setEditHandled(true);
    //             setEditErrors([]);
    //         }
    //     }, 500);

    //     return () => clearTimeout(timer);
    // }, [editAttempt, editErrors])

    // useEffect(() => {
    //     if (editHandled) {
    //         setEditAttempt(false);
    //     }
    // }, [editHandled]);

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
        // setShowEditMessageModal(false);
        // setEditAttempt(true);
        // setEditHandled(false);
    }

    const changeEditInput = (e) => {
        setContent(e.target.value);
        if (e.target.value.length > 0 && e.target.value.length <= 255) {
            setEditErrors([]);
            setShowEditErrors(false);
        }
        if (e.target.value.length > 255) {
            setEditErrors(['Message must be 255 characters or less']);
        }
        console.log(editErrors);
        if (e.target.value.length === 0) {
            if (editErrors.pop() === 'Message must be 255 characters or less') {
            setEditErrors([]);
            setShowEditErrors(false);
            }
        }
    }

    useEffect(() => {
        if (editErrors?.length) {
            setShowEditErrors(true);
        }
    }, [editErrors]);

    return (
        <form
            onSubmit={handleSubmit}
            className='basic-form-wide'
        >
            {showEditErrors && (
                    <div className='basic-form-errors'>
                        <ul className='basic-form-errors-ul'>
                            {editErrors.map((error, ind) => (
                            <li key={ind} className='basic-form-errors-li'>
                                {error}
                            </li>
                            ))}
                        </ul>
                    </div>
                )}
            <h2>Edit your message</h2>
            <div className='basic-form-field'>
                <textarea
                    id='content'
                    name='content'
                    className='basic-form-text-area'
                    onChange={changeEditInput}
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

        </form>
    )
}


export default EditMessageForm;
