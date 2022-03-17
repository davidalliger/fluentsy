

const NoProfile = ({setShowModal}) => {

    return (
        <div>
            <p>You haven't created a profile yet!</p>
            <p>Create a profile to start using features like messages.</p>
            <button>Create Profile</button>
            <button onClick={()=> setShowModal(false)}>Skip for Now</button>

        </div>
    )
}

export default NoProfile;
