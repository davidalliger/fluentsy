import { deleteLanguage } from "../../../../store/languages";
import { useDispatch } from "react-redux";
import { useState } from "react";

const DeleteLanguageForm = ({setShowModal, id}) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = await dispatch(deleteLanguage(id));
        if (data.errors) {
            setErrors(data.errors);
        } else if (data.level) {
            setShowModal(false);
        } else {
            setErrors(data);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='basic-form'
        >
            <h2>Delete Language?</h2>
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
            <div>
                {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                ))}
            </div>
        </form>
    )
}

export default DeleteLanguageForm;
