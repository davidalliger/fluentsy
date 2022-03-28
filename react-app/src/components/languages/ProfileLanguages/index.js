import { useState, useEffect } from "react";
import Level from "../Level";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './Languages.css'

const Languages = ({userProfile, id}) => {
    const user = useSelector(state => state.session.user);
    const languages = useSelector(state => state.languages);

    const [nativeLanguages, setNativeLanguages] = useState('');
    const [targetLanguages, setTargetLanguages] = useState('');
    const [primaryNativeLanguage, setPrimaryNativeLanguage] = useState('');
    const [primaryTargetLanguage, setPrimaryTargetLanguage] = useState('');
    const [nativeLanguagesLength, setNativeLanguagesLength] = useState(false);
    const [targetLanguagesLength, setTargetLanguagesLength] = useState(false);

    useEffect(() => {
        if (userProfile) {
            const userLanguages = languages[userProfile.userId];
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
    }, [languages, userProfile]);

    useEffect(() => {
        if (nativeLanguages?.length) {
            setNativeLanguagesLength(true);
        }
        if (targetLanguages?.length) {
            setTargetLanguagesLength(true);
        }
    }, [nativeLanguages, targetLanguages]);

    return (
        <div id='profile-languages'>

            <div id='profile-languages-container'>
                <div>
                    <div className='profile-section-heading'>Languages</div>
                    <div id='profile-language-list'>

                        <div className='language-level'>
                            {primaryNativeLanguage?.name}
                            <Level  level={primaryNativeLanguage?.level} />
                        </div>
                        {nativeLanguagesLength && (
                            <>
                                    <>
                                        {nativeLanguages?.map((language, index) => (
                                            <div key={index} className='language-level'>
                                                {language.name}
                                                <Level  level={language.level} />
                                            </div>
                                        ))}
                                    </>
                            </>
                        )}
                        <div className='language-level'>
                            {primaryTargetLanguage?.name}
                            <Level  level={primaryTargetLanguage?.level}/>
                        </div>
                        {targetLanguagesLength && (
                            <>
                                    <>
                                        {targetLanguages?.map((language, index) => (
                                            <div key={index} className='language-level'>
                                                {language.name}
                                                <Level  level={language.level} />
                                            </div>
                                        ))}
                                    </>
                            </>
                        )}
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
            </div>
        </div>
    )
}

export default Languages;
