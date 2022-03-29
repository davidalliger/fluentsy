import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SelectedMessages from "../SelectedMessages";

const Messages = () => {
    const messageState = useSelector(state => state.messages);
    console.log('messageState is ', messageState);
    const profileState = useSelector(state => state.profiles);
    const user = useSelector(state => state.session.user);
    const profiles = Object.values(profileState);
    const [correspondents, setCorrespondents] = useState([]);
    const location = useLocation();
    const { currentCorrespondent } = location.state;
    // const correspondents = Object.keys(messageState);
    const [selected, setSelected] = useState(currentCorrespondent ? currentCorrespondent.userId : null);

    useEffect(() => {
        if (profileState && messageState) {
            console.log('in useEffect, messageState is ', messageState);
            setCorrespondents(Object.keys(messageState))
        }
    }, [profileState, messageState])

    if (!user) {
        return <Redirect to='/' />
    }


    return (
        <div id='messages-page'>
            <div id='message-container'>
                {correspondents && (
                    <div id='messages-sidebar'>
                        <div id='message-conversation-title'>
                            My Conversations
                        </div>
                        <div id='correspondent-list'>
                            {correspondents?.map((correspondentId, ind) => {
                                if (messageState[correspondentId]) {
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
                                }
                                } else return null;
                            })}
                        </div>
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
