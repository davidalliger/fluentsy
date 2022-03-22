import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SelectedMessages from "../SelectedMessages";

const Messages = () => {
    const messageState = useSelector(state => state.messages);
    const profileState = useSelector(state => state.profiles);
    const user = useSelector(state => state.session.user);
    const profiles = Object.values(profileState);
    const location = useLocation();
    const { currentCorrespondent } = location.state;
    // console.log(currentCorrespondent);
    // const { currentCorrespondentId } = location.state;
    const correspondents = Object.keys(messageState);
    const [selected, setSelected] = useState(currentCorrespondent ? currentCorrespondent.userId : null);
    console.log('in messages, currentCorrespondent is ', currentCorrespondent);
    console.log('in messages, selected is ', selected);
    // will be
    // const [selectedName, setSelectedName] = useState(currentCorrespondent);

    // useEffect(() => {
    if (!user) {
        return <Redirect to='/' />
    }
    // }, [user])

    // const handleSelect = (e) => {
    //     const { correspondent, correspondentId } = e.target.value;
    //     setSelected(correspondentId);
    //     console.log(selected)
    //     setSelectedName(correspondent);
    //     console.log(selectedName)
    // }

    return (
        <div id='messages-page'>
            <div id='message-container'>
                {correspondents && (
                    <div id='correspondent-list'>
                        {correspondents.map((correspondentId, ind) => {
                            const correspondentMessageState = messageState[correspondentId];
                            // const correspondentMessageIds = Object.keys(correspondentMessageState);
                            const correspondentMessages = Object.values(correspondentMessageState);
                            const mostRecent = correspondentMessages[correspondentMessages.length -1]
                            let correspondent;
                            if (mostRecent) {
                                if (mostRecent.sender_id === user.id) {
                                    correspondent = mostRecent.recipient;
                                } else {
                                    correspondent = mostRecent.sender;
                                }
                                return (
                                    <div key={ind} className='correspondent' id={(correspondentId === selected) ? 'selected' : ind} onClick={()=>setSelected(correspondentId)}>
                                            <div className='correspondent-name'>
                                                {correspondent}
                                            </div>
                                            <div className='correspondent-message'>
                                                {mostRecent.sender}: {mostRecent.content.length > 15 ? mostRecent.content.slice(0,15) + '...' : mostRecent.content}
                                            </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                )}
                {(!correspondents) && (
                    <div id='correspondent-list'></div>
                )}
                <SelectedMessages user={user} selected={selected} profiles={profiles} currentCorrespondent={currentCorrespondent} />
            </div>
        </div>
    )
}

export default Messages
