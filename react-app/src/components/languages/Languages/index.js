import { useState, useEffect } from "react";
import './Languages.css'

const Languages = ({userProfile, id, user}) => {
    const [nativeLimitMet, setNativeLimitMet] = useState(false);
    const [targetLimitMet, setTargetLimitMet] = useState(false);
    const [showEditLanguagesModal, setShowEditLanguagesModal] = useState(false);

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
        <div id='profile-page-languages'>
            <div>

                <h3 className='profile-section-heading'>Languages</h3>
                <div id='profile-native-languages'>
                    <div id='profile-native-languages-title'>
                        Native Languages:
                    </div>
                    {primaryNativeLanguage.name}
                    {!nativeLimitMet && (
                        <div>
                            {nativeLanguages.map((language, index) => (
                                <div key={index}>
                                    {language.name}
                                </div>
                            ))}
                        </div>
                    )}
                    {nativeLimitMet && (
                        <div>
                            {nativeLanguages.slice(0,6).map((language, index) => (
                                <div key={index}>
                                    {language.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div id='profile-target-languages'>
                    <div id ='profile-target-languages-title'>
                        Also Speaks:
                    </div>
                    {primaryTargetLanguage.name} - {primaryTargetLanguage.level}
                    {!targetLimitMet && (
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
                </div>
            </div>
            {(user.id === +id) && (
                <div
                    className='profile-page-edit-button'
                    onClick={() => setShowEditLanguagesModal(true)}
                >
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
            )}
            {/* <EditLanguagesModal showEditAboutModal={showEditAboutModal} setShowEditAboutModal={setShowEditAboutModal} userProfile={userProfile}/> */}
        </div>
    )
}

export default Languages;
