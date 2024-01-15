import { useState, useEffect } from "react";
import Level from "../Level";
import { useSelector } from "react-redux";
import './FeedLanguages.css';

const FeedLanguages = ({userProfile}) => {
    const languages = useSelector(state => state.languages);
    const [nativeLimitMet, setNativeLimitMet] = useState(false);
    const [targetLimitMet, setTargetLimitMet] = useState(false);

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

    useEffect(() => {
        if (nativeLanguages.length > 1) {
            setNativeLimitMet(true);
        } else {
            setNativeLimitMet(false);
        }
    }, [nativeLanguages])

    useEffect(() => {
        if (targetLanguages.length > 1) {
            setTargetLimitMet(true);
        } else {
            setTargetLimitMet(false);
        }
    }, [targetLanguages])

    return (
        <div id='feed-languages'>
            <div id='feed-languages-container'>
                <div className='feed-section-heading'>Languages</div>
                <div id='feed-language-list'>
                    <div className='feed-language-level'>
                        {primaryNativeLanguage?.name}
                        <Level  level={primaryNativeLanguage?.level} />
                    </div>
                    {nativeLanguagesLength && (
                        <>
                            {!nativeLimitMet && (
                                <>
                                    {nativeLanguages?.map((language, index) => (
                                        <div key={index} className='feed-language-level'>
                                            {language.name}
                                            <Level  level={language.level} />
                                        </div>
                                    ))}
                                </>
                            )}
                            {nativeLimitMet && (
                                <>
                                    {nativeLanguages?.slice(0,1).map((language, index) => (
                                        <div key={index} className='feed-language-level'>
                                            {language.name}
                                            <Level  level={language.level} />
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                    <div className='feed-language-level'>
                        {primaryTargetLanguage?.name}
                        <Level  level={primaryTargetLanguage?.level}/>
                    </div>
                    {targetLanguagesLength && (
                        <>
                            {!targetLimitMet && (
                                <>
                                    {targetLanguages?.map((language, index) => (
                                        <div key={index} className='feed-language-level'>
                                            {language.name}
                                            <Level  level={language.level} />
                                        </div>
                                    ))}
                                </>
                            )}
                            {targetLimitMet && (
                                <>
                                    {targetLanguages?.slice(0,1).map((language, index) => (
                                        <div key={index} className='feed-language-level'>
                                            {language.name}
                                            <Level  level={language.level} />
                                        </div>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className='feed-see-more'>
                    Click to learn more
            </div>
        </div>
    )
}

export default FeedLanguages;
