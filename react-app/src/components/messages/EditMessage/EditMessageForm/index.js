import { useEffect, useState } from 'react';

const EditMessageForm = ({user, editPayload, sendEditMessage, messageToEdit, setShowEditMessageModal, editErrors, setEditErrors}) => {

    const [content, setContent] = useState(messageToEdit.content);
    const [showEditErrors, setShowEditErrors] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            id: messageToEdit.id,
            recipient_id: messageToEdit.recipient_id,
            sender_id: user.id,
            content
        };
        sendEditMessage(payload);
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
