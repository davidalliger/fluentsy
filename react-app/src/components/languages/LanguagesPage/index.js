import { Redirect, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './LanguagesPage.css'
import AddNativeLanguageModal from "../AddLanguage/AddNativeLanguage/AddNativeLanguageModal";
import AddTargetLanguageModal from "../AddLanguage/AddTargetLanguage/AddTargetLanguageModal";
import { useSelector } from "react-redux";
import DeleteLanguageModal from "../DeleteLanguage/DeleteLanguageModal";
import EditNativeLanguageModal from "../EditLanguage/EditNativeLanguage/EditNativeLanguageModal";
import EditTargetLanguageModal from "../EditLanguage/EditTargetLanguage/EditTargetLanguageModal";
import UpdatePrimaryNativeModal from "../EditLanguage/UpdatePrimaryNative/UpdatePrimaryNativeModal";
import UpdatePrimaryTargetModal from "../EditLanguage/UpdatePrimaryTarget/UpdatePrimaryTargetModal";



const LanguagesPage = () => {
    const [primaryNative, setPrimaryNative] = useState('');
    const [primaryTarget, setPrimaryTarget] = useState('');
    const [showAddNativeLanguageModal, setShowAddNativeLanguageModal] = useState(false);
    const [showEditNativeLanguageModal, setShowEditNativeLanguageModal] = useState(false);
    const [showAddTargetLanguageModal, setShowAddTargetLanguageModal] = useState(false);
    const [showEditTargetLanguageModal, setShowEditTargetLanguageModal] = useState(false);
    const [showDeleteLanguageModal, setShowDeleteLanguageModal] = useState(false);
    const [showUpdatePrimaryNativeModal, setShowUpdatePrimaryNativeModal] = useState(false);
    const [showUpdatePrimaryTargetModal, setShowUpdatePrimaryTargetModal] = useState(false);
    const [deleteLanguageId, setDeleteLanguageId] = useState('');
    const [editNativeLanguage, setEditNativeLanguage] = useState('');
    const [editTargetLanguage, setEditTargetLanguage] = useState('');
    const [loggedOut, setLoggedOut] = useState(false);
    const [newNativePrimaryPayload, setNewNativePrimaryPayload] = useState(null);
    const [oldNativePrimaryPayload, setOldNativePrimaryPayload] = useState(null);
    const [newTargetPrimaryPayload, setNewTargetPrimaryPayload] = useState(null);
    const [oldTargetPrimaryPayload, setOldTargetPrimaryPayload] = useState(null);
    const [nativeLanguages, setNativeLanguages] = useState('');
    const [targetLanguages, setTargetLanguages] = useState('');
    const [primaryNativeLanguage, setPrimaryNativeLanguage] = useState('');
    const [primaryTargetLanguage, setPrimaryTargetLanguage] = useState('');
    const [nativeLanguagesLength, setNativeLanguagesLength] = useState(false);
    const [targetLanguagesLength, setTargetLanguagesLength] = useState(false);
    const user = useSelector(state => state.session.user);
    const languages = useSelector(state => state.languages);

    useEffect(() => {
        if (user) {
            const userLanguages = languages[user.id];
            if (userLanguages) {

                const nativeLanguagesWithPrimary = Object.values(userLanguages?.native);
                const targetLanguagesWithPrimary = Object.values(userLanguages?.target);
                const getNativeLanguages = nativeLanguagesWithPrimary?.filter(language => !language.primary);
                const getTargetLanguages = targetLanguagesWithPrimary?.filter(language => !language.primary);
                const getPrimaryNativeLanguage = nativeLanguagesWithPrimary?.reduce((primary, language) => {
                    if (language.primary) {
                        primary = language;
                    }
                    return primary;
                }, null);
                const getPrimaryTargetLanguage = targetLanguagesWithPrimary?.reduce((primary, language) => {
                    if (language.primary) {
                        primary = language;
                    }
                    return primary;
                }, null);
                setNativeLanguages(getNativeLanguages);
                setTargetLanguages(getTargetLanguages);
                setPrimaryNativeLanguage(getPrimaryNativeLanguage);
                setPrimaryTargetLanguage(getPrimaryTargetLanguage);
            }
        }
    }, [languages, user]);

    useEffect(() => {
        if (nativeLanguages?.length) {
            setNativeLanguagesLength(true);
        }
        if (targetLanguages?.length) {
            setTargetLanguagesLength(true);
        }
    }, [nativeLanguages, targetLanguages]);

    useEffect(()=> {
        if (primaryNativeLanguage) {
            setPrimaryNative(primaryNativeLanguage);
        }
        if (primaryTargetLanguage) {
            setPrimaryTarget(primaryTargetLanguage);
        }
    }, [primaryNativeLanguage, primaryTargetLanguage])



    useEffect(() => {
        if (!user) {
            setLoggedOut(true);
        }
    }, [user])

    if (loggedOut) {
        return <Redirect to='/' />
    }

    const handlePrimaryNative = async(e) => {
        const newPrimaryId = e.currentTarget.id.split('-')[0];
        const newPrimaryLanguage = languages[user.id].native[newPrimaryId];
        const newPrimaryPayload = {
            id: newPrimaryLanguage.id,
            name: newPrimaryLanguage.name,
            user_id: user.id,
            level: 'Native',
            native: true,
            primary: true
        };
        const oldPrimaryPayload = {
            id: primaryNative.id,
            name: primaryNative.name,
            user_id: user.id,
            level: 'Native',
            native: true,
            primary: false
        }
        setNewNativePrimaryPayload(newPrimaryPayload);
        setOldNativePrimaryPayload(oldPrimaryPayload);
        setShowUpdatePrimaryNativeModal(true);
    }

    const handlePrimaryTarget = async(e) => {
        const newPrimaryId = e.currentTarget.id.split('-')[0];
        const newPrimaryLanguage = languages[user.id].target[newPrimaryId];
        const newPrimaryPayload = {
            id: newPrimaryLanguage.id,
            name: newPrimaryLanguage.name,
            user_id: user.id,
            level: newPrimaryLanguage.level,
            native: false,
            primary: true
        };
        const oldPrimaryPayload = {
            id: primaryTarget.id,
            name: primaryTarget.name,
            user_id: user.id,
            level: primaryTarget.level,
            native: false,
            primary: false
        }
        setNewTargetPrimaryPayload(newPrimaryPayload);
        setOldTargetPrimaryPayload(oldPrimaryPayload);
        setShowUpdatePrimaryTargetModal(true);
    }

    const handleDeleteLanguage = e => {
        setDeleteLanguageId(+e.currentTarget.id);
        setShowDeleteLanguageModal(true)
    }


    const handleEditNativeLanguage = e => {
        const id = (e.currentTarget.id).split('-')[0];
        const language = languages[user.id].native[id];
        setEditNativeLanguage(language);
        setShowEditNativeLanguageModal(true);
    }

    const handleEditTargetLanguage = e => {
        const id = (e.currentTarget.id).split('-')[0];
        const language = languages[user.id].target[id];
        setEditTargetLanguage(language);
        setShowEditTargetLanguageModal(true);
    }

    return (
        <div id='languages-page'>
                <div id='languages-page-card'>
                    <div id='languages-page-native-languages'>
                        <h2 className='languages-page-title'>My Native Languages</h2>
                        <p className='languages-page-description'>I grew up speaking these every day.</p>
                        <div id='languages-page-native-message'>
                            User must display at least one native language on profile
                        </div>
                        <div className='languages-page-lower'>
                            <div id='languages-page-native-grid'>
                                <div className='languages-page-native-header-row'>
                                    <div className='languages-page-grid-title'>
                                        Language
                                    </div>
                                    <div className='languages-page-grid-title'>
                                        Primary
                                    </div>
                                    <div></div>
                                    <div className='languages-page-grid-hidden-title'></div>
                                    <div className='languages-page-grid-hidden-title'></div>
                                </div>
                                <div className='languages-page-native-row'>
                                    <div className='languages-page-native-name'>
                                        {primaryNativeLanguage?.name}
                                    </div>
                                    <div className='languages-page-native-primary'>
                                        <input
                                            className='languages-page-radio'
                                            type='radio'
                                            name='primary-native'
                                            checked={primaryNative === primaryNativeLanguage}
                                            onChange={handlePrimaryNative}
                                            value={primaryNative}
                                            id={`${primaryNativeLanguage?.id}-primary`}
                                        />
                                    </div>
                                    <div></div>
                                    <div
                                        id={`${primaryNativeLanguage?.id}-edit`}
                                        className='languages-page-native-edit'
                                        onClick={handleEditNativeLanguage}
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </div>
                                </div>
                                {nativeLanguagesLength && (
                                    <div>
                                        {nativeLanguages?.map((language, index) => (
                                            <div className='languages-page-native-row' key={index}>
                                                <div className='languages-page-native-name'>
                                                    {language.name}
                                                </div>
                                                <div className='languages-page-native-primary'>
                                                    <input
                                                        className='languages-page-radio'
                                                        type='radio'
                                                        name='primary-native'
                                                        checked={primaryNative === language}
                                                        onChange={handlePrimaryNative}
                                                        value={primaryNative}
                                                        id={`${language.id}-primary`}
                                                    />
                                                </div>
                                                <div></div>
                                                <div
                                                    id={`${language.id}-edit`}
                                                    className='languages-page-native-edit'
                                                    onClick={handleEditNativeLanguage}
                                                    >
                                                    <i className="fa-solid fa-pen"></i>
                                                </div>
                                                <div
                                                    id={language.id}
                                                    className='languages-page-native-delete'
                                                    onClick={handleDeleteLanguage}
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <button
                                    className='languages-page-add-button'
                                    onClick={() => setShowAddNativeLanguageModal(true)}
                                >
                                    Add Language
                                </button>
                                <AddNativeLanguageModal setShowAddNativeLanguageModal={setShowAddNativeLanguageModal} showAddNativeLanguageModal={showAddNativeLanguageModal} user={user} />
                            </div>
                            <EditNativeLanguageModal showEditNativeLanguageModal={showEditNativeLanguageModal} setShowEditNativeLanguageModal={setShowEditNativeLanguageModal} editNativeLanguage={editNativeLanguage} user={user}/>
                            <UpdatePrimaryNativeModal showUpdatePrimaryNativeModal={showUpdatePrimaryNativeModal} setShowUpdatePrimaryNativeModal={setShowUpdatePrimaryNativeModal} newNativePrimaryPayload={newNativePrimaryPayload} oldNativePrimaryPayload={oldNativePrimaryPayload} setPrimaryNative={setPrimaryNative} />
                        </div>
                    </div>
                    <div id='languages-page-target-languages'>
                        <h2 className='languages-page-title'>My Target Languages</h2>
                        <p className='languages-page-description'>I'm still learning these.</p>
                        <div id='languages-page-target-message'>
                            User must display at least one target language on profile
                        </div>
                        <div className='languages-page-lower'>
                            <div id='languages-page-target-grid'>
                                <div className='languages-page-target-header-row'>
                                    <div className='languages-page-grid-title'>
                                        Language
                                    </div>
                                    <div className='languages-page-grid-title'>
                                        Level
                                    </div>
                                    <div className='languages-page-grid-title'>
                                        Primary
                                    </div>
                                    <div></div>
                                    <div className='languages-page-grid-hidden-title'></div>
                                    <div className='languages-page-grid-hidden-title'></div>
                                </div>
                                <div className='languages-page-target-row'>
                                    <div className='languages-page-target-name'>
                                        {primaryTargetLanguage?.name}
                                    </div>
                                    <div className='languages-page-target-level'>
                                        {primaryTargetLanguage?.level}
                                    </div>
                                    <div className='languages-page-target-primary'>
                                        <input
                                            className='languages-page-radio'
                                            type='radio'
                                            name='primary-target'
                                            checked={primaryTarget === primaryTargetLanguage}
                                            onChange={handlePrimaryTarget}
                                            value={primaryTarget}
                                            id={`${primaryTargetLanguage?.id}-primary`}
                                        />
                                    </div>
                                    <div></div>
                                    <div
                                        id={primaryTargetLanguage?.id}
                                        className='languages-page-target-edit'
                                        onClick={handleEditTargetLanguage}
                                        >
                                        <i className="fa-solid fa-pen"></i>
                                    </div>
                                </div>
                                {targetLanguagesLength && (
                                    <div>
                                        {targetLanguages?.map((language, index) => (
                                            <div className='languages-page-target-row' key={index}>
                                                <div className='languages-page-target-name'>
                                                    {language.name}
                                                </div>
                                                <div className='languages-page-target-level'>
                                                    {language.level}
                                                </div>
                                                <div className='languages-page-target-primary'>
                                                    <input
                                                        className='languages-page-radio'
                                                        type='radio'
                                                        name='primary-target'
                                                        checked={primaryTarget === language}
                                                        onChange={handlePrimaryTarget}
                                                        value={primaryTarget}
                                                        id={`${language.id}-primary`}
                                                    />
                                                </div>
                                                <div></div>
                                                <div
                                                    id={`${language.id}-edit`}
                                                    className='languages-page-target-edit'
                                                    onClick={handleEditTargetLanguage}
                                                    >
                                                    <i className="fa-solid fa-pen"></i>
                                                </div>
                                                <div
                                                    id={language.id}
                                                    className='languages-page-target-delete'
                                                    onClick={handleDeleteLanguage}
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <button
                                    className='languages-page-add-button'
                                    onClick={() => setShowAddTargetLanguageModal(true)}
                                >
                                    Add Language
                                </button>
                                <AddTargetLanguageModal setShowAddTargetLanguageModal={setShowAddTargetLanguageModal} showAddTargetLanguageModal={showAddTargetLanguageModal} user={user} />
                            </div>
                            <DeleteLanguageModal showDeleteLanguageModal={showDeleteLanguageModal} setShowDeleteLanguageModal={setShowDeleteLanguageModal} id ={deleteLanguageId} />
                            <EditTargetLanguageModal showEditTargetLanguageModal={showEditTargetLanguageModal} setShowEditTargetLanguageModal={setShowEditTargetLanguageModal} editTargetLanguage={editTargetLanguage} user={user} />
                            <UpdatePrimaryTargetModal showUpdatePrimaryTargetModal={showUpdatePrimaryTargetModal} setShowUpdatePrimaryTargetModal={setShowUpdatePrimaryTargetModal} newTargetPrimaryPayload={newTargetPrimaryPayload} oldTargetPrimaryPayload={oldTargetPrimaryPayload} setPrimaryTarget={setPrimaryTarget}/>
                        </div>
                    </div>
                </div>
                <Link to={`/users/${user?.id}`}>
                    <button id='languages-page-profile-button'>
                        Go to Profile
                    </button>
                </Link>
        </div>
    )
}

export default LanguagesPage;
