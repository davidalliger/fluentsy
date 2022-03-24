import { updateLanguage } from "../../../../../store/languages";
import { useDispatch } from "react-redux";
import { useState } from "react";

const UpdatePrimaryTargetForm = ({setShowModal, newTargetPrimaryPayload, oldTargetPrimaryPayload, setPrimaryTarget}) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const newData = await dispatch(updateLanguage(newTargetPrimaryPayload));
        const oldData = await dispatch(updateLanguage(oldTargetPrimaryPayload));
        if (newData.errors) {
            if (oldData.errors) {
                setErrors([...newData.errors, ...oldData.errors]);
            } else {
                setErrors(newData.errors);
            }
        } else if (oldData.errors) {
            setErrors(oldData.errors);
        } else if (newData.name && oldData.name) {
            setPrimaryTarget(newData);
            setShowModal(false);
        } else {
            setErrors(newData);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='basic-form'
        >

            <h2>Update Primary Language</h2>
            <div className="basic-form-label-question">
                Make this your new primary target language?
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
                    Confirm
                </button>
            </div>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
        </form>
    )
}

export default UpdatePrimaryTargetForm;
