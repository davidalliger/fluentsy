import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteProfile } from "../../../../store/profiles";

const DeleteProfileForm = ({setShowModal, id}) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = await dispatch(deleteProfile(id));
        if (data.errors) {
            setErrors(data.errors);
        } else if (data.success) {
            setShowModal(false);
            history.push('/users')
        } else {
            setErrors(data);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='basic-form-wide'
        >

            <h2>Delete Profile?</h2>
            <div className='basic-form-topic'>
                WARNING!
            </div>
            <div className="basic-form-content">
                This action cannot be undone.
                Deleting your profile will permanently delete
                all associated data, including your languages and
                chat history. Once your profile has been deleted,
                you will be unable to send and receive messages.
                You will need to create a new one in order to start
                using these features again. Are you sure you want to
                delete your profile?
            </div>
            <div className="basic-form-double-button-div">
                <button
                    type='button'
                    onClick={()=> setShowModal(false)}
                    className='basic-form-button-smaller'
                >
                    Cancel
                </button>
                <button
                    className='basic-form-button-smaller'
                >
                    Delete
                </button>
            </div>
            {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
            ))}
        </form>
    )
}

export default DeleteProfileForm;
