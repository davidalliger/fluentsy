import { deleteLanguage } from "../../../../store/languages";
import { useDispatch } from "react-redux";
import { useState } from "react";

const DeleteLanguageForm = ({setShowModal, id}) => {
    console.log(' in delete form, deleteLanguageId is ', id)
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('deleteLanguageId is ', id);
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
        <form onSubmit={handleSubmit}>
            {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
            <h2>Delete Language?</h2>
            <button type='button' onClick={()=> setShowModal(false)}>Cancel</button>
            <button>Delete</button>
        </form>
    )
}

export default DeleteLanguageForm;
