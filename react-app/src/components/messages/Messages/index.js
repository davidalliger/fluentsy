import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { useState } from "react";
import SelectedMessages from "../SelectedMessages";

const Messages = () => {
    const messageState = useSelector(state => state.messages);
    const profileState = useSelector(state => state.profiles);
    const user = useSelector(state => state.session.user);
    const profiles = Object.values(profileState);
    const location = useLocation();
    const { currentCorrespondent } = location.state;
    const correspondents = Object.keys(messageState);
    const [selected, setSelected] = useState(currentCorrespondent ? currentCorrespondent.userId : null);

    if (!user) {
        return <Redirect to='/' />
    }

    return (
        <div id='messages-page'>
            <div id='message-container'>
                {correspondents && (
                    <div id='correspondent-list'>
                        <div id='message-conversation-title'>
                            My Conversations
                        </div>
                        {correspondents.map((correspondentId, ind) => {
                            const correspondentMessageState = messageState[correspondentId];
                            const correspondentMessages = Object.values(correspondentMessageState);
                            const mostRecent = correspondentMessages[correspondentMessages?.length -1]
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
                            } else return null;
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
