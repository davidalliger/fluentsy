import { useState } from "react";
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { deleteProfile } from "../../../../store/profiles";

const DeleteProfileForm = ({setShowModal, id}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = await dispatch(deleteProfile(id));
        if (data.errors) {
            setErrors(data.errors);
        } else if (data.success) {
            setShowModal(false);
            // history.push('/');
        } else {
            setErrors(data);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
            <h2>Delete Profile?</h2>
            <p>WARNING!</p>
            <p>
                This action cannot be undone.
                Deleting your profile will permanently delete
                all associated data, including your messages, and you
                will be unable to send and receive messages.
                Once your profile has been deleted, you will need
                to create a new one in order to start using these
                features again. Are you sure you want to delete your
                profile?
            </p>
            <button type='button' onClick={()=> setShowModal(false)}>Cancel</button>
            <button>Delete</button>
        </form>
    )
}

export default DeleteProfileForm;
