import { useState, useEffect } from "react";
import Level from "../Level";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './Languages.css'

const Languages = ({userProfile, id, user}) => {
    const [nativeLimitMet, setNativeLimitMet] = useState(false);
    const [targetLimitMet, setTargetLimitMet] = useState(false);
    const [showEditLanguagesModal, setShowEditLanguagesModal] = useState(false);
    const languageState = useSelector(state => state.languages);
    // let userLanguages;
    // let primaryNativeLanguage;
    // let primaryTargetLanguage;
    // let nativeLanguages;
    // let targetLanguages;
    // if (languageState[userProfile.userId]) {
    //     userLanguages = languageState[userProfile.userId];

    // }
    // if (native) {
    //     nativeLanguages = Object.values(native);
    // }
    // if (target) {
    //     targetLanguages = Object.values(target);
    // }
    // const primaryNativeLanguage = Object.values(primaryNative);
    // const primaryTargetLanguage = Object.values(primaryTarget);
    const nativeLanguages = userProfile.languages.filter(language => language.native && !language.primary);
    const targetLanguages = userProfile.languages.filter(language => !language.native && !language.primary);
    const primaryNativeLanguage = userProfile.languages.filter(language => language.native && language.primary)[0];
    const primaryTargetLanguage = userProfile.languages.filter(language => !language.native && language.primary)[0];
    console.log('Native languages are ', nativeLanguages);
    console.log('Target languages are ', targetLanguages);
    console.log('Primary native language is ', primaryNativeLanguage);
    console.log('Primary target language is ', primaryTargetLanguage);
    useEffect(() => {
        if (nativeLanguages.length > 5) {
            setNativeLimitMet(true);
        } else {
            setNativeLimitMet(false);
        }
    }, [nativeLanguages])

    useEffect(() => {
        if (targetLanguages.length > 4) {
            setTargetLimitMet(true);
        } else {
            setTargetLimitMet(false);
        }
    }, [targetLanguages])
    return (
        <div id='profile-languages'>

            <div id='profile-languages-container'>
                {/* <div id='profile-page-native-languages'> */}
                    {/* <div> */}
                <div>
                    <div className='profile-section-heading'>Languages</div>
                            {/* <div id='profile-native-languages'> */}
                                {/* <div id='profile-native-languages-title'>
                                    Native Languages:
                                </div> */}
                                {/* <ul> */}
                    <div id='profile-language-list'>

                        <div className='language-level'>
                            {primaryNativeLanguage.name}
                            <Level  level={primaryNativeLanguage.level} />
                        </div>
                        {!nativeLimitMet && (
                            <>
                                {nativeLanguages.map((language, index) => (
                                    <div key={index}>
                                        {language.name}
                                    </div>
                                ))}
                            </>
                        )}
                        {nativeLimitMet && (
                            <div>
                                {nativeLanguages.slice(0,4).map((language, index) => (
                                    <div key={index}>
                                        {language.name}
                                    </div>
                                ))}
                            </div>
                        )}
                                    {/* </ul> */}
                                {/* </div> */}
                            {/* </div> */}
                            {/* {(user.id === +id) && (
                                <div
                                className='profile-page-edit-button'
                                onClick={() => setShowEditLanguagesModal(true)}
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </div>
                            )} */}
                            {/* <EditLanguagesModal showEditAboutModal={showEditAboutModal} setShowEditAboutModal={setShowEditAboutModal} userProfile={userProfile}/> */}
                        {/* </div> */}
                        {/* <div></div> */}
                        {/* <div id='profile-page-target-languages'> */}
                            {/* <div> */}
                                {/* <div className='profile-section-heading'>Also Speaks</div> */}
                                {/* <div id='profile-target-languages'> */}
                                    {/* <div id ='profile-target-languages-title'>
                                        Also Speaks:
                                    </div> */}
                                    {/* <ul> */}
                        <div className='language-level'>
                            {primaryTargetLanguage.name}
                            <Level  level={primaryTargetLanguage.level}/>
                        </div>
                        {targetLimitMet && (
                            <div>
                                {targetLanguages.map((language, index) => (
                                    <div key={index}>
                                        {language.name} - {language.level}
                                    </div>
                                ))}
                            </div>
                        )}
                        {targetLimitMet && (
                            <div>
                                {targetLanguages.slice(0,5).map((language, index) => (
                                    <div key={index}>
                                        {language.name} - {language.level}
                                    </div>
                                ))}
                            </div>
                        )}
                                    {/* </ul> */}
                                {/* </div> */}
                            {/* </div> */}
                    </div>
                </div>
                {(user.id === +id) && (
                    <Link to={{pathname: '/languages', state:{userProfile: userProfile}}}>
                        <div
                            className='profile-page-edit-button'
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                    </Link>
                )}
                {/* <EditLanguagesModal showEditAboutModal={showEditAboutModal} setShowEditAboutModal={setShowEditAboutModal} userProfile={userProfile}/> */}
                {/* </div> */}
            </div>
        </div>
    )
}

export default Languages;